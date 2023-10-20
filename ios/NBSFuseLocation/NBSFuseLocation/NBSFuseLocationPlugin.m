
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

#import <Foundation/Foundation.h>
#import <NBSFuse/NBSFuseJSONSerializer.h>
#import <NBSFuseLocation/NBSFuseLocationPlugin.h>
#import <NBSFuseLocation/NBSFuseLocationClient.h>
#import <NBSFuseLocation/NBSFuseLocationAccuracy.h>
#import <NBSFuseLocation/NBSFuseLocationEvent.h>

@implementation NBSFuseLocationPlugin {
    NSMutableDictionary<NSString*, NBSFuseLocationClient*>* $clients;
    NSString* $callbackID;
}

- (instancetype) init:(NBSFuseContext*) context {
    self = [super init:context];
    
    $callbackID = nil;
    $clients = [[NSMutableDictionary alloc] init];
    
//    $locationManager  = [[CLLocationManager alloc] init];
//    $locationManager.delegate = self;
    
    return self;
}

- (NSString*) getID {
    return @"FuseLocation";
}

- (void) initHandles {
    __weak NBSFuseLocationPlugin* weakSelf = self;
    
//    [self attachHandler:@"/assertSettings" callback:^(NBSFuseAPIPacket* packet, NBSFuseAPIResponse* response) {
//       // iOS doesn't have a way to assert settings, so we will hard-code some meaningful values.
//        NSDictionary* settings = @{
//            @"bluetoohPresent": @(false),
//            @"bluetoohUsable": @(false),
//            @"locationPresent": @(true),
//            @"gpsPresent": @(true),
//            @"networkPresent": @(true)
//            @"locationUsable": [CLLocationManager is
//        };
//    }];

    [self attachHandler:@"/callback" callback:^(NBSFuseAPIPacket* packet, NBSFuseAPIResponse* response) {
        NBSFuseLocationPlugin* strongSelf = weakSelf;
        strongSelf->$callbackID = [packet readAsString];
        [response sendNoContent];
    }];

    [self attachHandler:@"/subscribe" callback:^(NBSFuseAPIPacket* packet, NBSFuseAPIResponse* response) {
        NBSFuseLocationPlugin* strongSelf = weakSelf;
        
        NSError* error = nil;
        NSDictionary* data = [packet readAsJSONObject: error];
        
//        NSNumber* interval = [data objectForKey:@"interval"];
        NSNumber* desiredAccuracy = [data objectForKey:@"accuracy"];
        
        NBSFuseLocationClient* client = [[NBSFuseLocationClient alloc] init:[strongSelf getContext] withDelegate:strongSelf];
        NSString* subID = [client getID];
        [strongSelf->$clients setObject:client forKey:subID];
        
        
        CLLocationManager* lm = [client getAPI];
        
        CLLocationAccuracy locAccuracy = ([desiredAccuracy intValue] == NBSFuseLocationAccuracyFine) ? kCLLocationAccuracyBest : kCLLocationAccuracyThreeKilometers;
        lm.desiredAccuracy = locAccuracy;
        
        if (locAccuracy == kCLLocationAccuracyBest) {
            lm.distanceFilter = kCLDistanceFilterNone;
        }
        
        bool apiEnabled = [CLLocationManager locationServicesEnabled];
        NSLog(@"Location API Enabled: %d", apiEnabled);
        
        CLAuthorizationStatus status = [lm authorizationStatus];
        if (status == kCLAuthorizationStatusAuthorizedWhenInUse || status == kCLAuthorizationStatusAuthorizedAlways) {
            [client start];
        }
        else {
            // Handle denied or restricted authorization
            [lm requestWhenInUseAuthorization];
        }
        
        [response sendJSON:@{
            @"subscriptionID": subID,
            @"grants": @{
                @"desiredAccuracy": @(0) //TODO implement/get grant constants
            }
        }];
    }];
}

- (void) locationManager:(CLLocationManager*) lm didUpdateLocations:(NSArray<CLLocation*>*) locations {
    if (self->$callbackID == nil) {
        // Plugin hasn't been initialized yet..?
        return;
    }
    
    // Handle location updates here
    CLLocation *lastLocation = [locations lastObject];
    NSLog(@"New Location: %@", lastLocation);
    
    NSMutableDictionary* event = [[NSMutableDictionary alloc] init];
    [event setObject:@(NBSFuseLocationEventLocation) forKey:@"type"];
    
    NSMutableArray<NSDictionary*>* data = [[NSMutableArray alloc] init];
    
    for (CLLocation* location in locations) {
        [data addObject:[self $buildGeopoint: location]];
    }
    
    [event setObject:data forKey:@"data"];
    
    NSError* serializationError = nil;
    NSString* payload = [NBSFuseJSONSerializer serialize:event withError:&serializationError];
    if (serializationError != nil) {
        NBSFuseLogger* logger = [[self getContext] getLogger];
        [logger error:@"Serialization Error: %@", [serializationError localizedDescription]];
        return;
    }
    
    [[self getContext] execCallback:self->$callbackID withData:payload];
}

- (void) locationManager:(CLLocationManager*) lm didFailWithError:(NSError*) error {
    // Handle location error
    NSLog(@"Location error: %@", error);
    // see https://developer.apple.com/documentation/corelocation/cllocationmanagerdelegate/1423786-locationmanager?language=objc
}

- (void) locationManagerDidChangeAuthorization:(CLLocationManager*) lm {
    CLAuthorizationStatus status = [lm authorizationStatus];
    if (status == kCLAuthorizationStatusAuthorizedAlways || status == kCLAuthorizationStatusAuthorizedWhenInUse) {
        [lm startUpdatingLocation];
    }
    else {
        [lm stopUpdatingLocation];
    }
}

- (NSDictionary*) $buildGeopoint:(CLLocation*) location {
    NSMutableDictionary* feature = [[NSMutableDictionary alloc] init];
    [feature setObject:@"Feature" forKey:@"type"];
    
    NSMutableDictionary* props = [[NSMutableDictionary alloc] init];
    [feature setObject:props forKey:@"properties"];
    
    NSMutableDictionary* geometry = [[NSMutableDictionary alloc] init];
    [feature setObject:geometry forKey:@"geometry"];
    
    NSMutableArray<NSNumber*>* coords = [[NSMutableArray alloc] init];
    [coords addObject:@(location.coordinate.longitude)];
    [coords addObject:@(location.coordinate.latitude)];
    
    if (location.verticalAccuracy > 0.0) {
        [coords addObject:@(location.altitude)];
        [props setObject:@(location.verticalAccuracy) forKey:@"verticalAccuracy"];
    }
    else {
        [props setObject: [NSNull null] forKey:@"verticalAccuracy"];
    }
    
    [geometry setObject:@"Point" forKey:@"type"];
    [geometry setObject:coords forKey:@"coordiantes"];
    
    [props setObject: @(location.horizontalAccuracy) forKey:@"horizontalAccuracy"];
    
    bool isMock = false;
    #if TARGET_OS_SIMULATOR
        isMock = true;
    #endif
    [props setObject:@(isMock) forKey:@"isMock"];
    
    [props setObject:@(location.courseAccuracy) forKey:@"bearingAccuracy"];
    if (location.courseAccuracy < 0.0) {
        [props setObject:[NSNull null] forKey:@"bearing"];
    }
    else {
        [props setObject:@(location.course) forKey:@"bearing"];
    }
    
    [props setObject:@(location.speedAccuracy) forKey:@"speedAccuracy"];
    if (location.speed < 0.0) {
        [props setObject:[NSNull null] forKey:@"speed"];
    }
    else {
        [props setObject:@(location.speed) forKey:@"speed"];
    }
    
    //Unlike android, we don't know what provided this GPS point
    [props setObject:@"unknown" forKey:@"provider"];
    
    NSDate* date = location.timestamp;
    NSTimeInterval seconds = [date timeIntervalSince1970];
    [props setObject:@((long)(seconds * 1000.0)) forKey:@"providerTimestamp"];
    
    //iOS doesn't have a way to get the elapsed timestamp
    [props setObject:[NSNull null] forKey:@"elapsedTime"];
    
    return feature;
}

@end
