
/*
Copyright 2023 Norman Breau

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package ca.nbsolutions.fuse.plugins.location;

import android.app.Activity;
import android.content.IntentSender;
//import android.location.LocationRequest;
import android.Manifest.permission;
import android.location.Location;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import ca.nbsolutions.fuse.FuseActivityResult;
import ca.nbsolutions.fuse.PermissionRequest;
import ca.nbsolutions.fuse.PermissionRequestHandler;
import ca.nbsolutions.fuse.RequestCodeManager;
import ca.nbsolutions.fuse.FuseAPIPacket;
import ca.nbsolutions.fuse.FuseAPIResponse;
import ca.nbsolutions.fuse.FuseContext;
import ca.nbsolutions.fuse.FuseError;
import ca.nbsolutions.fuse.FusePlugin;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationAvailability;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.Priority;
import com.google.android.gms.location.SettingsClient;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.Task;

public class FuseLocationPlugin extends FusePlugin {
    private static final String TAG = "FuseLocationPlugin";
//    private LocationRequest.Builder $locationRequestBuilder;
    private boolean $isGPAvailable;
    private int $gpConnectionResult;

    private final HashMap<String, FuseLocationClient> $clients;
//    private FusedLocationProviderClient $locationClient;
//    private LocationRequest $locationSettings;
    private String $callbackID;
//    private ArrayList<String> $callbacks;

//    public FuseLocationPlugin(FuseContext context) {
//        this(context, false);
//    }

    public FuseLocationPlugin(FuseContext context/*, boolean highAccuracy*/) {
        super(context);
        $clients = new HashMap<>();
        $gpConnectionResult = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(context.getActivityContext());
        $isGPAvailable = $gpConnectionResult == ConnectionResult.SUCCESS;

//        $locationClient = LocationServices.getFusedLocationProviderClient(context.getActivityContext());

//        $locationRequestBuilder = new LocationRequest.Builder(1000);
//        $locationRequestBuilder.setPriority(highAccuracy ? Priority.PRIORITY_HIGH_ACCURACY : Priority.PRIORITY_BALANCED_POWER_ACCURACY);
//        $locationSettings = $locationRequestBuilder.build();
    }

//    public LocationRequest.Builder getLocationRequestBuilder() {
//        return $locationRequestBuilder;
//    }

//    public void flushLocationSettings() {
//        $locationSettings = $locationRequestBuilder.build();
//    }

    @Override
    public String getID() {
        return "FuseLocation";
    }

    @Override
    protected void _initHandles() {
        this.attachHandler("/requestPermissions", new APIHandler<FuseLocationPlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                if (!this.plugin.$isGPAvailable) {
                    response.send(new FuseLocationGoogleServicesNotAvailableError(this.plugin.$gpConnectionResult));
                    return;
                }

                JSONObject packetData = packet.readAsJSONObject();

                PermissionRequest request = new PermissionRequest(packetData, new PermissionRequest.Resolver() {
                    @Override
                    public String[] resolve(JSONArray permissionSet) throws JSONException {
                        String[] out = new String[permissionSet.length()];

                        for (int i = 0; i < permissionSet.length(); i++) {
                            int jsPerm = permissionSet.getInt(i);

                            if (FuseLocationAccuracy.COARSE.ordinal() == jsPerm) {
                                out[i] = permission.ACCESS_COARSE_LOCATION;
                            }
                            else if (FuseLocationAccuracy.FINE.ordinal() == jsPerm) {
                                out[i] = permission.ACCESS_FINE_LOCATION;
                            }
                        }

                        return out;
                    }
                });

                CompletableFuture<PermissionRequestHandler.Result> future = getContext().getPermissionRequestHandler().requestPermission(request);
                PermissionRequestHandler.Result result;

                try {
                    result = future.get();
                } catch (ExecutionException | InterruptedException e) {
                    e.printStackTrace();
                    response.send(new FuseError("PermissionPlugin", 0, "Permission Request Failure"));
                    return;
                }

                LocationRequest.Builder builder = new LocationRequest.Builder(1000);
                JSONArray permissionSet = packetData.optJSONArray("permissionSet");
                int priority = Priority.PRIORITY_BALANCED_POWER_ACCURACY;
                if (permissionSet != null && permissionSet.length() == 2) {
                    // if we have 2 permissions, then we want FINE location
                    priority = Priority.PRIORITY_HIGH_ACCURACY;
                }
                builder.setPriority(priority);

                LocationSettingsRequest.Builder settingsBuilder = new LocationSettingsRequest.Builder();
                settingsBuilder.addLocationRequest(builder.build());
                SettingsClient client = LocationServices.getSettingsClient(this.plugin.getContext().getActivityContext());
                Task<LocationSettingsResponse> checkTask = client.checkLocationSettings(settingsBuilder.build());

                checkTask.addOnSuccessListener(locationSettingsResponse -> {
                    response.send(result);
                });

                Activity activity = this.plugin.getContext().getActivityContext();

                checkTask.addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        e.printStackTrace();
                        if (e instanceof ResolvableApiException) {
                            try {
                                int settingsRequestCode = RequestCodeManager.getInstance().getRequestCode();
                                CompletableFuture<FuseActivityResult> checkFuture = _addActivityResultFuture(settingsRequestCode);
                                ResolvableApiException resolvable = (ResolvableApiException)e;
                                resolvable.startResolutionForResult(activity, settingsRequestCode);
                                FuseActivityResult result = checkFuture.get();

                                int resultCode = result.getResultCode();

                                if (resultCode == Activity.RESULT_CANCELED) {
                                    response.send(new FuseError("FuseLocation", 0, "Unable to check location settings"));
                                    return;
                                }

                                // I think at this point we don't actually know if the user corrected the problem, and you in theory would
                                // try the check again. Handling location checks might be better off in application-land.
                            }
                            catch (IntentSender.SendIntentException | ExecutionException | InterruptedException ignored) {
                                response.send(new FuseError("FuseLocation", 0, "Unable to check location settings"));
                            }
                        }
                    }
                });
            }
        });

        this.attachHandler("/callback", new APIHandler<FuseLocationPlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                this.plugin.$callbackID = packet.readAsString();
                response.send();
            }
        });

        this.attachHandler("/subscribe", new APIHandler<FuseLocationPlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                JSONObject params = packet.readAsJSONObject();
                if (params == null) {
                    response.send(new FuseError(TAG, 0, "params object is required."));
                    return;
                }

                if (!this.plugin.$isGPAvailable) {
                    response.send(new FuseLocationGoogleServicesNotAvailableError(this.plugin.$gpConnectionResult));
                    return;
                }

                FuseLocationClient client = new FuseLocationClient(this.plugin.getContext(), this.plugin.$parseSubscriptionParams(params), new LocationCallback() {
                    @Override
                    public void onLocationAvailability(@NonNull LocationAvailability locationAvailability) {
                        super.onLocationAvailability(locationAvailability);
                        $onLocationAvailability(locationAvailability);
                    }

                    @Override
                    public void onLocationResult(@NonNull LocationResult locationResult) {
                        super.onLocationResult(locationResult);
                        $onLocationResult((locationResult));
                    }
                });
                synchronized ($clients) {
                    $clients.put(client.getID(), client);
                }

                response.send(client.getID());
            }
        });

        this.attachHandler("/unsubscribe", new APIHandler<FuseLocationPlugin>(this) {
            @Override
            public void execute(FuseAPIPacket packet, FuseAPIResponse response) throws IOException, JSONException {
                String id = packet.readAsString();

                FuseLocationClient client = $clients.get(id);
                if (client == null) {
                    response.send(new FuseError(TAG, 0, "No Subscription Client for id " + id));
                    return;
                }

                client.stop();
                synchronized ($clients) {
                    $clients.remove(id);
                }

                response.send();
            }
        });
    }

    private void $onLocationAvailability(@NonNull LocationAvailability availability) {
        Log.d(TAG, "Availability update");
    }

    private void $onLocationResult(@NonNull LocationResult result) {
        if (this.$callbackID == null) {
            return;
        }

        String eventData = null;

        try {
            List<Location> locations = result.getLocations();
            JSONObject event = new JSONObject();
            JSONArray locationData = new JSONArray();

            for (Location location : locations) {
                locationData.put($buildGeoPoint(location));
            }

            event.put("type", FuseLocationEvent.LOCATION.ordinal());
            event.put("data", locationData);

            eventData = event.toString();
        }
        catch (JSONException ex) {
            this.getContext().getLogger().error(TAG, ex.getMessage(), ex);
        }

        if (eventData != null) {
            this.getContext().execCallback($callbackID, eventData);
        }
    }

    private JSONObject $buildGeoPoint(Location location) throws JSONException {
        JSONObject feature = new JSONObject();
        feature.put("type", "Feature");

        JSONObject point = new JSONObject();
        point.put("type", "Point");

        JSONArray coordinates = new JSONArray();
        coordinates.put(location.getLongitude());
        coordinates.put(location.getLatitude());
        if (location.hasAltitude()) {
            coordinates.put(location.getAltitude());
        }
        point.put("coordinates", coordinates);
        feature.put("geometry", point);

        JSONObject props = new JSONObject();

        if (location.hasAccuracy()) {
            props.put("horizontalAccuracy", location.getAccuracy());
        }
        else {
            props.put("horizontalAccuracy", JSONObject.NULL);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && location.hasVerticalAccuracy()) {
            props.put("verticalAccuracy", location.getVerticalAccuracyMeters());
        }
        else {
            props.put("verticalAccuracy", JSONObject.NULL);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            props.put("mock", location.isMock());
        }

        if (location.hasBearing()) {
            props.put("bearing", location.getBearing());
        }
        else {
            props.put("bearing", JSONObject.NULL);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && location.hasBearingAccuracy()) {
            props.put("bearingAccuracy", location.getBearingAccuracyDegrees());
        }
        else {
            props.put("bearingAccuracy", JSONObject.NULL);
        }

        long elapsedTime = location.getElapsedRealtimeNanos() / 1000;
        props.put("elapsedTime", elapsedTime);
        props.put("provider", location.getProvider());
        if (location.hasSpeed()) {
            props.put("speed", location.getSpeed());
        }
        else {
            props.put("speed", JSONObject.NULL);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && location.hasSpeedAccuracy()) {
            props.put("speedAccuracy", location.getSpeedAccuracyMetersPerSecond());
        }
        else {
            props.put("speedAccuracy", JSONObject.NULL);
        }

        props.put("providerTimestamp", location.getTime());

        feature.put("properties", props);

        return feature;
    }

    private LocationRequest $parseSubscriptionParams(JSONObject params) throws JSONException {
        int accuracy = params.optInt("accuracy", 0);
        int interval = params.optInt("interval", 1000);

        LocationRequest.Builder builder = new LocationRequest.Builder(interval);
        builder.setPriority(FuseLocationAccuracy.FINE.ordinal() == accuracy ? Priority.PRIORITY_HIGH_ACCURACY : Priority.PRIORITY_BALANCED_POWER_ACCURACY);
        return builder.build();
    }
}
