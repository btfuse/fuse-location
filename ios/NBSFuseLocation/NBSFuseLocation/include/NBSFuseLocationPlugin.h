
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

#ifndef NBSFuseLocationPlugin_h
#define NBSFuseLocationPlugin_h

#import <NBSFuse/NBSFuse.h>
#import <CoreLocation/CoreLocation.h>

@interface NBSFuseLocationPlugin: NBSFusePlugin <CLLocationManagerDelegate>

- (instancetype) init NS_UNAVAILABLE;
- (instancetype) init:(NBSFuseContext*) context;

- (NSString*) getID;

- (void) locationManager:(CLLocationManager*) manager didUpdateLocations:(NSArray<CLLocation*>*) locations;
- (void) locationManager:(CLLocationManager*) manager didFailWithError:(NSError*) error;
- (void) locationManagerDidChangeAuthorization:(CLLocationManager*) manager;

@end

#endif
