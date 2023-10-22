
/*
Copyright 2023 Breautek

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
#import <BTFuseLocation/BTFuseLocationClient.h>

@implementation BTFuseLocationClient {
    CLLocationManager* $lm;
    NSString* $ident;
}

- (instancetype) init:(BTFuseContext*) context withDelegate:(id<CLLocationManagerDelegate>) delegate {
    self = [super init];
    
    $ident = [[NSUUID UUID] UUIDString];
    
    // Location Manager must be created on the main thread,
    // otherwise it won't properly call delegates
    if ([NSThread isMainThread]) {
        $lm = [[CLLocationManager alloc] init];
    }
    else {
        dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
        dispatch_async(dispatch_get_main_queue(), ^{
            self->$lm = [[CLLocationManager alloc] init];
            dispatch_semaphore_signal(semaphore);
        });
        dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    }
    
    $lm.delegate = delegate;
    
    return self;
}

- (NSString*) getID {
    return $ident;
}

- (CLLocationManager*) getAPI {
    return $lm;
}

- (void) start {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self->$lm startUpdatingLocation];
    });
}

- (void) stop {
    dispatch_async(dispatch_get_main_queue(), ^{
        [self->$lm stopUpdatingLocation];
    });
}

- (bool) isAPIEnabled {
    return [CLLocationManager locationServicesEnabled];
}

- (void) dealloc {
    $lm.delegate = nil;
}

@end
