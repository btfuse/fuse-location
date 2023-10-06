/*
   Copyright 2019 Total Pave Inc.

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

import {
    FuseContext,
    FuseContextBuilder
} from '@nbsfuse/core';

import {
    FuseLocation,
    FuseLocationAccuracy,
    FuseLocationSubscription,
    TFuseGeolocationPoint
} from '../../src/api';

let dataContainer: HTMLElement;
let plugin: FuseLocation;

async function createListener(): Promise<FuseLocationSubscription> {
    let subscription: FuseLocationSubscription = await plugin.watch(FuseLocationAccuracy.FINE, async () => {
        return true;
    });

    subscription.register((points: Readonly<TFuseGeolocationPoint>[]) => {
        let lastPoint: TFuseGeolocationPoint | null = null;
        for (let i: number = 0; i < points.length; i++) {
            lastPoint = points[i];
        }

        if (!lastPoint) {
            return;
        }

        dataContainer.innerHTML = '';

        let data: HTMLElement = document.createElement('pre');
        data.innerHTML = JSON.stringify(lastPoint, null, 4);
        dataContainer.appendChild(data);
    });

    return subscription;
}

window.onload = async () => {
    let builder: FuseContextBuilder = new FuseContextBuilder();
    let context: FuseContext = await builder.build();
    plugin = new FuseLocation(context);
    (window as any).plugin = plugin;

    let toggleBtn: HTMLButtonElement = document.createElement('button');
    toggleBtn.innerHTML = 'Toggle Location';
    let subscription: FuseLocationSubscription | null = null;

    toggleBtn.addEventListener('click', async () => {
        if (subscription) {
            await subscription.release();
            subscription = null;
        }
        else {
            subscription = await createListener();
        }
    });

    dataContainer = document.createElement('div');

    document.body.appendChild(toggleBtn);
    document.body.appendChild(dataContainer);
    
    
};
