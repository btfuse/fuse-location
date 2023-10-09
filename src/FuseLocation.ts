
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

import {
    ContentType,
    FusePlugin,
    TFuseJustificationHandler,
    FusePermissionRequest,
    FusePermissionGrantResult,
    FuseContext,
    FuseError,
    FuseAPIResponse,
    FuseAPI
} from '@nbsfuse/core';
import {
    FuseLocationSubscription,
    FuseLocationSubscriptionOptionsBuilder,
    IFuseLocationSubscriptionOptions
} from './FuseLocationSubscription';
import { FuseLocationAccuracy } from './FuseLocationAccuracy';
import { IFuseLocationUpdateEvent } from './IFuseLocationUpdateEvent';
import { IFuseLocationSettingsState } from './IFuseLocationSettingsState';

export class FuseLocation extends FusePlugin {
    private $callbackID: string;
    private $subscriptions: FuseLocationSubscription[];

    public constructor(context: FuseContext) {
        super(context);
        this.$callbackID = null;
        this.$subscriptions = [];
    }

    protected override _getID(): string {
        return 'FuseLocation';
    }

    public async watch(accuracy: FuseLocationAccuracy, justificationHandler: TFuseJustificationHandler): Promise<FuseLocationSubscription> {
        let builder: FuseLocationSubscriptionOptionsBuilder = new FuseLocationSubscriptionOptionsBuilder();
        builder.setAccuracy(accuracy);
        return await this.subscribe(builder.build(), justificationHandler);
    }

    private async $init(): Promise<void> {
        if (this.$callbackID !== null) {
            return;
        }

        this.$callbackID = this._createCallback((data: string) => {
            let event: IFuseLocationUpdateEvent = null;
            try {
                event = JSON.parse(data);
            }
            catch (ex) {
                this.getContext().getLogger().error('Error parsing Location Update event', FuseError.wrap(ex));
                return;
            }

            for (let i: number = 0; i < this.$subscriptions.length; i++) {
                let sub: FuseLocationSubscription = this.$subscriptions[i];
                try {
                    sub.notify(event);
                }
                catch (ex) {
                    this.getContext().getLogger().error('FuseLocationSubscription Handler Error:', FuseError.wrap(ex));
                }
            }
        });

        await this._exec('/callback', ContentType.TEXT, this.$callbackID);
    }

    public async assertSettings(options: IFuseLocationSubscriptionOptions): Promise<IFuseLocationSettingsState> {
        let res: FuseAPIResponse = await this._exec('/assertSettings', ContentType.JSON, options);
        return res.readAsJSON();
    }

    public async subscribe(options: IFuseLocationSubscriptionOptions, justificationHandler: TFuseJustificationHandler): Promise<FuseLocationSubscription> {
        if (this.$callbackID === null) {
            await this.$init();
        }

        let permRequest: FusePermissionRequest<FuseLocationAccuracy> = new FusePermissionRequest(this._createAPIBridge('/requestPermissions'), [options.accuracy], justificationHandler);
        let grantResult: FusePermissionGrantResult<FuseLocationAccuracy> = null;
        grantResult = await permRequest.request();

        let subscriptionID: string = null;
        let res: FuseAPIResponse = await this._exec('/subscribe', ContentType.JSON, options);
        subscriptionID = await res.readAsText();

        let subscription: FuseLocationSubscription = new FuseLocationSubscription(this, subscriptionID, options, grantResult);

        this.$subscriptions.push(subscription);

        return subscription;
    }

    public async unsubscribe(subscription: FuseLocationSubscription): Promise<void> {
        let index: number = this.$subscriptions.indexOf(subscription);
        if (index > -1) {
            this.$subscriptions.splice(index, 1);
        }

        await this._exec('/unsubscribe', ContentType.TEXT, subscription.getID());
    }
}
