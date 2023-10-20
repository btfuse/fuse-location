/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@nbsfuse/core/lib/AbstractFuseAPIFactory.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/AbstractFuseAPIFactory.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractFuseAPIFactory = void 0;
/**
 * An factory class that defines the base signature for creating a FuseAPI bridge object.
 */
class AbstractFuseAPIFactory {
}
exports.AbstractFuseAPIFactory = AbstractFuseAPIFactory;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/AbstractFuseLoggerFactory.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/AbstractFuseLoggerFactory.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbstractFuseLoggerFactory = void 0;
class AbstractFuseLoggerFactory {
    constructor() { }
}
exports.AbstractFuseLoggerFactory = AbstractFuseLoggerFactory;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/ContentType.js":
/*!********************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/ContentType.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContentType = void 0;
/**
 * Some common data types
 */
var ContentType;
(function (ContentType) {
    ContentType["TEXT"] = "text/plain";
    ContentType["JSON"] = "application/json";
    ContentType["JAVASCRIPT"] = "text/javascript";
    ContentType["WASM"] = "application/wasm";
    ContentType["BINARY"] = "application/octet-stream";
})(ContentType || (exports.ContentType = ContentType = {}));


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseAPI.js":
/*!****************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseAPI.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseAPI = void 0;
const FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "../node_modules/@nbsfuse/core/lib/FuseSerializer.js");
const FuseCallbackManager_1 = __webpack_require__(/*! ./FuseCallbackManager */ "../node_modules/@nbsfuse/core/lib/FuseCallbackManager.js");
/**
 * Base class for the Fuse API bridge for exchanging data with the native platform
 */
class FuseAPI {
    constructor() {
        this.$serializer = this._createSerializer();
    }
    _createSerializer() {
        return new FuseSerializer_1.FuseSerializer();
    }
    getSerializer() {
        return this.$serializer;
    }
    _createRoute(pluginID, method) {
        return `/api/${pluginID}${method}`;
    }
    async execute(pluginID, method, contentType, args) {
        return this._execute(pluginID, method, contentType, this.$serializer.serialize(args));
    }
    createCallbackContext(cb) {
        return FuseCallbackManager_1.FuseCallbackManager.getInstance().createCallback(cb);
    }
    releaseCallback(id) {
        FuseCallbackManager_1.FuseCallbackManager.getInstance().releaseCallback(id);
    }
}
exports.FuseAPI = FuseAPI;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseAPIFactory.js":
/*!***********************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseAPIFactory.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseAPIFactory = void 0;
const AbstractFuseAPIFactory_1 = __webpack_require__(/*! ./AbstractFuseAPIFactory */ "../node_modules/@nbsfuse/core/lib/AbstractFuseAPIFactory.js");
const Platform_1 = __webpack_require__(/*! ./Platform */ "../node_modules/@nbsfuse/core/lib/Platform.js");
const IOSSchemeFuseAPI_1 = __webpack_require__(/*! ./ios/IOSSchemeFuseAPI */ "../node_modules/@nbsfuse/core/lib/ios/IOSSchemeFuseAPI.js");
const AndroidSchemeFuseAPI_1 = __webpack_require__(/*! ./android/AndroidSchemeFuseAPI */ "../node_modules/@nbsfuse/core/lib/android/AndroidSchemeFuseAPI.js");
/**
 * A FuseAPI factory that uses the HTTP/app scheme as the bridge.
 */
class FuseAPIFactory extends AbstractFuseAPIFactory_1.AbstractFuseAPIFactory {
    constructor() {
        super();
        // Realistically there will only be one or the other set.
        this.$iosScheme = null;
        this.$androidScheme = null;
    }
    create(platform) {
        switch (platform) {
            case Platform_1.Platform.IOS: return this._createiOSAPI();
            case Platform_1.Platform.ANDROID: return this._createAndroidAPI();
            default: throw new Error('Unsupported platform: ' + platform);
        }
    }
    _createiOSAPI() {
        if (!this.$iosScheme) {
            this.$iosScheme = new IOSSchemeFuseAPI_1.IOSSchemeFuseAPI();
        }
        return this.$iosScheme;
    }
    _createAndroidAPI() {
        if (!this.$androidScheme) {
            this.$androidScheme = new AndroidSchemeFuseAPI_1.AndroidSchemeFuseAPI();
        }
        return this.$androidScheme;
    }
}
exports.FuseAPIFactory = FuseAPIFactory;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseAPIResponse.js":
/*!************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseAPIResponse.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseAPIResponse = void 0;
const FuseResponseReader_1 = __webpack_require__(/*! ./FuseResponseReader */ "../node_modules/@nbsfuse/core/lib/FuseResponseReader.js");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "../node_modules/@nbsfuse/core/lib/FuseError.js");
class FuseAPIResponse {
    constructor(content, headers, status) {
        this.$status = status;
        this.$content = content;
        this.$headers = this.$parseHeaders(headers);
    }
    isError() {
        return this.$status >= 400;
    }
    getContentLength() {
        var _a;
        let lenStr = (_a = this.$headers.get('content-type')) === null || _a === void 0 ? void 0 : _a[0];
        let length = parseInt(lenStr);
        if (isNaN(length)) {
            length = 0;
        }
        return length;
    }
    getContentType() {
        var _a;
        return (_a = this.$headers.get('content-type')) === null || _a === void 0 ? void 0 : _a[0];
    }
    async readAsArrayBuffer() {
        return this.$content;
    }
    async readAsBlob() {
        return new Blob([this.$content]);
    }
    async readAsText() {
        return await FuseResponseReader_1.FuseResponseReader.readAsText(this.$content);
    }
    async readAsJSON() {
        return await FuseResponseReader_1.FuseResponseReader.readAsJSON(this.$content);
    }
    async readAsError() {
        let serializedError = await FuseResponseReader_1.FuseResponseReader.readAsJSON(this.$content);
        return FuseError_1.FuseError.fromSerialized(serializedError);
    }
    getHeaders() {
        return this.$headers;
    }
    getHeader(key) {
        return this.$headers.get(key);
    }
    $parseHeaders(headers) {
        let map = new Map();
        if (!headers) {
            return map;
        }
        let lines = headers.split('\r\n');
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].split(':');
            let key = line[0];
            if (!map.has(key)) {
                map.set(key, []);
            }
            let headerValue = map.get(key);
            headerValue.push(line[1]);
        }
        return map;
    }
}
exports.FuseAPIResponse = FuseAPIResponse;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseCallbackManager.js":
/*!****************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseCallbackManager.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseCallbackManager = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.mjs");
const UUID = tslib_1.__importStar(__webpack_require__(/*! uuid */ "../node_modules/uuid/dist/commonjs-browser/index.js"));
window.__nbsfuse_callbacks = new Map();
window.__nbsfuse_doCallback = function (callbackID, data) {
    if (callbackID && window.__nbsfuse_callbacks.has(callbackID)) {
        window.__nbsfuse_callbacks.get(callbackID)(data);
    }
};
/**
 * A singleton manager to manage native callbacks.
 *
 * Create a callback context and pass the return context id to native clients,
 * in which they can use to respond back.
 *
 * Note that plugin APIs are far more efficient and can handle a diverse set of data,
 * including large payloads, so when possible it's best to use a plugin API instead of a
 * callback API.
 *
 * This callback API is however, useful for building listener kind of services where the native
 * needs to continously callback to the webview with small data packets.
 */
class FuseCallbackManager {
    constructor() { }
    static getInstance() {
        if (!FuseCallbackManager.$instance) {
            FuseCallbackManager.$instance = new FuseCallbackManager();
        }
        return FuseCallbackManager.$instance;
    }
    createCallback(cb) {
        let id = UUID.v4();
        window.__nbsfuse_callbacks.set(id, (data) => {
            cb(data);
        });
        return id;
    }
    releaseCallback(id) {
        window.__nbsfuse_callbacks.delete(id);
    }
}
exports.FuseCallbackManager = FuseCallbackManager;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseContext.js":
/*!********************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseContext.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseContext = void 0;
const FuseRuntime_1 = __webpack_require__(/*! ./plugins/FuseRuntime */ "../node_modules/@nbsfuse/core/lib/plugins/FuseRuntime.js");
const Version_1 = __webpack_require__(/*! ./Version */ "../node_modules/@nbsfuse/core/lib/Version.js");
/**
 * A context class that holds Fuse Framework state
 */
class FuseContext {
    constructor(platform, apiFactory, loggerFactory) {
        // let presolver: PlatformResolver = this._createPlatformResolver();
        // this.$platform = presolver.resolve();
        this.$platform = platform;
        // let loggerFactory: FuseLoggerFactory = new FuseLoggerFactory(this.$platform);
        this.$logger = loggerFactory.create();
        // this.$logger = this._createLogger();
        // if (!this.$logger) {
        //     this.$logger = this.$defaultLogger
        // }
        this.$runtimeVersion = null;
        this.$defaultAPIFactory = apiFactory;
        // this.$defaultAPIFactory = this._createFuseAPIFactory();
        this.$runtime = new FuseRuntime_1.FuseRuntime(this);
    }
    // protected _createLogger(): IFuseLogger | null {
    //     return null
    // }
    // public setLogger(logger: IFuseLogger | null): void {
    //     if (!logger) {
    //         logger = this.$defaultLogger;
    //     }
    //     this.$logger = logger;
    // }
    getLogger() {
        return this.$logger;
    }
    getDefaultAPIFactory() {
        return this.$defaultAPIFactory;
    }
    // protected _createFuseAPIFactory(): AbstractFuseAPIFactory {
    //     return new FuseAPIFactory();
    // }
    // protected _createPlatformResolver(): PlatformResolver {
    //     return new PlatformResolver();
    // }
    getPlatform() {
        return this.$platform;
    }
    async $getRuntimeInfo() {
        if (!this.$runtimeInfo) {
            this.$runtimeInfo = await this.$runtime.getInfo();
        }
        return this.$runtimeInfo;
    }
    async getPlatformVersion() {
        if (!this.$runtimeVersion) {
            let info = await this.$getRuntimeInfo();
            this.$runtimeVersion = Version_1.Version.parseVersionString(info.version);
        }
        return this.$runtimeVersion;
    }
    async isDebugMode() {
        let info = await this.$getRuntimeInfo();
        return info.debugMode;
    }
    async registerPauseHandler(callback) {
        return await this.$runtime.registerPauseHandler(callback);
    }
    async unregisterPauseHandler(callbackID) {
        return await this.$runtime.unregisterPauseHandler(callbackID);
    }
    async registerResumeHandler(callback) {
        return await this.$runtime.registerResumeHandler(callback);
    }
    async unregisterResumeHandler(callbackID) {
        return await this.$runtime.unregisterResumeHandler(callbackID);
    }
}
exports.FuseContext = FuseContext;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseContextBuilder.js":
/*!***************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseContextBuilder.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseContextBuilder = void 0;
const FuseAPIFactory_1 = __webpack_require__(/*! ./FuseAPIFactory */ "../node_modules/@nbsfuse/core/lib/FuseAPIFactory.js");
const FuseContext_1 = __webpack_require__(/*! ./FuseContext */ "../node_modules/@nbsfuse/core/lib/FuseContext.js");
const FuseLoggerFactory_1 = __webpack_require__(/*! ./FuseLoggerFactory */ "../node_modules/@nbsfuse/core/lib/FuseLoggerFactory.js");
const FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "../node_modules/@nbsfuse/core/lib/FuseLoggerLevel.js");
const PlatformResolver_1 = __webpack_require__(/*! ./PlatformResolver */ "../node_modules/@nbsfuse/core/lib/PlatformResolver.js");
class FuseContextBuilder {
    constructor() {
        this.$loggerFactory = null;
        this.$apiFactory = null;
        this.$platformResolver = new PlatformResolver_1.PlatformResolver();
    }
    setPlatformResolver(resolver) {
        this.$platformResolver = resolver;
        return this;
    }
    setAPIFactory(factory) {
        this.$apiFactory = factory;
        return this;
    }
    setLoggerFactory(factory) {
        this.$loggerFactory = factory;
        return this;
    }
    async _isDebugMode(context) {
        return await context.isDebugMode();
    }
    async build() {
        let platform = this.$platformResolver.resolve();
        let apiFactory;
        if (this.$apiFactory) {
            apiFactory = this.$apiFactory;
        }
        else {
            apiFactory = new FuseAPIFactory_1.FuseAPIFactory();
        }
        let loggerFactory;
        if (this.$loggerFactory) {
            loggerFactory = this.$loggerFactory;
        }
        else {
            loggerFactory = new FuseLoggerFactory_1.FuseLoggerFactory(platform);
        }
        let context = new FuseContext_1.FuseContext(platform, apiFactory, loggerFactory);
        let isDebugMode = await this._isDebugMode(context);
        let logger = context.getLogger();
        logger.enableNativeBridge(isDebugMode);
        let level = logger.getLevel();
        level |= FuseLoggerLevel_1.FuseLoggerLevel.DEBUG;
        logger.setLevel(level);
        return context;
    }
}
exports.FuseContextBuilder = FuseContextBuilder;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseError.js":
/*!******************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseError.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseError = void 0;
class FuseError extends Error {
    constructor(domain, message, cause, code) {
        super(message);
        this.name = this.constructor.name;
        this.$domain = domain;
        this.$message = message;
        this.$code = code || 0;
        this.$cause = cause || null;
    }
    getMessage() {
        return this.$message;
    }
    getDomain() {
        return this.$domain;
    }
    getCode() {
        return this.$code;
    }
    getCause() {
        return this.$cause;
    }
    serialize() {
        return {
            domain: this.getDomain(),
            message: this.getMessage(),
            code: this.getCode(),
            stack: this.stack
        };
    }
    static wrap(error) {
        let ferr = null;
        if (typeof error === 'string') {
            ferr = new FuseError('Unknown', error, null, 0);
        }
        else if (error instanceof FuseError) {
            ferr = error;
        }
        else if (error instanceof Error) {
            ferr = new FuseError(error.name, error.message, error, 0);
        }
        else if (FuseError.$isSerializedFuseError(error)) {
            ferr = FuseError.fromSerialized(error);
        }
        else {
            console.error('Unwrappable Error', error);
            ferr = new FuseError('FuseError', 'Unwrappable error', null, 0);
        }
        return ferr;
    }
    static fromSerialized(error) {
        return new FuseError(error.domain, error.message, null, error.code);
    }
    toString() {
        return 'FuseError';
    }
    static $isSerializedFuseError(error) {
        return 'message' in error && 'domain' in error && 'code' in error;
    }
}
exports.FuseError = FuseError;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseLogger.js":
/*!*******************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseLogger.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLogger = exports.FuseLoggerSerializer = void 0;
const FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "../node_modules/@nbsfuse/core/lib/FuseLoggerLevel.js");
class FuseLoggerSerializer {
    constructor() { }
    _serializeToString(obj) {
        if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'string') {
            return this._serializePrimitiveToString(obj);
        }
        else if (obj instanceof Date) {
            return this._serializeDateToString(obj);
        }
        else if (this._isISerializable(obj)) {
            return this._serializeToString(obj.serialize());
        }
        else if (obj instanceof Error) {
            return this._serializeErrorToString(obj);
        }
        // When all else fails, attempt to JSON stringify
        return JSON.stringify(obj, null, 4);
    }
    _serializePrimitiveToString(obj) {
        return obj.toString();
    }
    _serializeErrorToString(obj) {
        let serializedError = {
            name: obj.name,
            message: obj.message,
            stack: obj.stack
        };
        return JSON.stringify(serializedError, null, 4);
    }
    _serializeDateToString(obj) {
        return obj.toISOString();
    }
    serialize(obj) {
        if (obj === null || obj === undefined) {
            return null;
        }
        let out = null;
        if (obj instanceof Blob) {
            out = `[Blob ${obj.type || 'Binary'} (${obj.size} bytes)]`;
        }
        else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj instanceof Date) {
            out = this._serializeToString(obj);
        }
        else if (obj instanceof ArrayBuffer) {
            out = `[ArrayBuffer (${obj.byteLength} bytes)]`;
        }
        else if (this._isISerializable(obj)) {
            out = this.serialize(obj.serialize());
        }
        else {
            // should be either JSON objects or json arrays at this point
            out = this._serializeToString(obj);
        }
        return out;
    }
    _isISerializable(x) {
        return !!x.serialize && typeof x.serialize === 'function';
    }
}
exports.FuseLoggerSerializer = FuseLoggerSerializer;
/**
 * A base logger implementation which includes a serializer for common types.
 * It will serialize/accept all values that TSerializable accepts, however Blob/ArrayBuffer
 * or other binary data types will not be serialized. Instead it will print an
 * object identifier, with mime type if present, along with the size of the buffer.
 *
 * The base logger does not provide any native bridging. While usable for purely webview side,
 * use the FuseLoggerFactory to get a logger specific for your runtime environment.
 */
class FuseLogger {
    constructor() {
        this.$enableNativeBridge = true;
        this.$level = FuseLoggerLevel_1.FuseLoggerLevel.INFO | FuseLoggerLevel_1.FuseLoggerLevel.WARN | FuseLoggerLevel_1.FuseLoggerLevel.ERROR;
        this.$serializer = new FuseLoggerSerializer();
        this._registerNativeCalblack();
    }
    _registerNativeCalblack() { }
    setLevel(level) {
        this.$level = level;
    }
    getLevel() {
        return this.$level;
    }
    enableNativeBridge(flag) {
        this.$enableNativeBridge = !!flag;
    }
    _onNativeLogEntry(entry) {
        if (!(this.getLevel() & entry.level)) {
            return;
        }
        if (entry.level === FuseLoggerLevel_1.FuseLoggerLevel.SILENT) {
            return;
        }
        switch (entry.level) {
            case FuseLoggerLevel_1.FuseLoggerLevel.DEBUG:
                console.debug(entry.message);
                break;
            case FuseLoggerLevel_1.FuseLoggerLevel.INFO:
                console.info(entry.message);
                break;
            case FuseLoggerLevel_1.FuseLoggerLevel.WARN:
                console.warn(entry.message);
                break;
            case FuseLoggerLevel_1.FuseLoggerLevel.ERROR:
                console.error(entry.message);
                break;
        }
    }
    /**
     * @param level The log level for this log print
     * @param message Overridable hook to send logs to the native environment
     */
    _logToNative(level, message) { }
    $logToNative(level, args) {
        if (!this.$enableNativeBridge) {
            return;
        }
        let serializedArgs = [];
        for (let i = 0; i < args.length; i++) {
            serializedArgs.push(this.$serializer.serialize(args[i]));
        }
        this._logToNative(level, serializedArgs.join('\t'));
    }
    debug(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.DEBUG)) {
            return;
        }
        console.debug(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.DEBUG, args);
    }
    info(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.INFO)) {
            return;
        }
        console.info(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.INFO, args);
    }
    warn(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.WARN)) {
            return;
        }
        console.warn(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.WARN, args);
    }
    error(...args) {
        if (!(this.$level & FuseLoggerLevel_1.FuseLoggerLevel.ERROR)) {
            return;
        }
        console.error(...args);
        this.$logToNative(FuseLoggerLevel_1.FuseLoggerLevel.ERROR, args);
    }
}
exports.FuseLogger = FuseLogger;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseLoggerFactory.js":
/*!**************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseLoggerFactory.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLoggerFactory = void 0;
const FuseLogger_1 = __webpack_require__(/*! ./FuseLogger */ "../node_modules/@nbsfuse/core/lib/FuseLogger.js");
const Platform_1 = __webpack_require__(/*! ./Platform */ "../node_modules/@nbsfuse/core/lib/Platform.js");
const IOSFuseLogger_1 = __webpack_require__(/*! ./ios/IOSFuseLogger */ "../node_modules/@nbsfuse/core/lib/ios/IOSFuseLogger.js");
const AndroidFuseLogger_1 = __webpack_require__(/*! ./android/AndroidFuseLogger */ "../node_modules/@nbsfuse/core/lib/android/AndroidFuseLogger.js");
class FuseLoggerFactory {
    constructor(platform) {
        this.$platform = platform;
    }
    create() {
        switch (this.$platform) {
            case Platform_1.Platform.IOS:
                return new IOSFuseLogger_1.IOSFuseLogger();
            case Platform_1.Platform.ANDROID:
                return new AndroidFuseLogger_1.AndroidFuseLogger();
            case Platform_1.Platform.TEST:
                return new FuseLogger_1.FuseLogger();
        }
    }
}
exports.FuseLoggerFactory = FuseLoggerFactory;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseLoggerLevel.js":
/*!************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseLoggerLevel.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLoggerLevel = void 0;
var FuseLoggerLevel;
(function (FuseLoggerLevel) {
    FuseLoggerLevel[FuseLoggerLevel["SILENT"] = 0] = "SILENT";
    FuseLoggerLevel[FuseLoggerLevel["DEBUG"] = 1] = "DEBUG";
    FuseLoggerLevel[FuseLoggerLevel["INFO"] = 2] = "INFO";
    FuseLoggerLevel[FuseLoggerLevel["WARN"] = 4] = "WARN";
    FuseLoggerLevel[FuseLoggerLevel["ERROR"] = 8] = "ERROR";
})(FuseLoggerLevel || (exports.FuseLoggerLevel = FuseLoggerLevel = {}));


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FusePermissionGrantResult.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FusePermissionGrantResult.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePermissionGrantResult = void 0;
const FusePermissionState_1 = __webpack_require__(/*! ./FusePermissionState */ "../node_modules/@nbsfuse/core/lib/FusePermissionState.js");
class FusePermissionGrantResult {
    constructor(results) {
        this.$results = results;
    }
    isGranted(permission) {
        return this.$results[permission] === FusePermissionState_1.FusePermissionState.GRANTED;
    }
    isAllGranted() {
        for (let i in this.$results) {
            if (this.$results[i] !== FusePermissionState_1.FusePermissionState.GRANTED) {
                return false;
            }
        }
        return true;
    }
    rejectJustifications() {
        for (let i in this.$results) {
            if (this.$results[i] === FusePermissionState_1.FusePermissionState.REQUIRES_JUSTIFICATION) {
                this.$results[i] = FusePermissionState_1.FusePermissionState.DENIED;
            }
        }
    }
    shouldJustify() {
        for (let i in this.$results) {
            if (this.$results[i] === FusePermissionState_1.FusePermissionState.REQUIRES_JUSTIFICATION) {
                return true;
            }
        }
        return false;
    }
}
exports.FusePermissionGrantResult = FusePermissionGrantResult;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FusePermissionRequest.js":
/*!******************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FusePermissionRequest.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePermissionRequest = void 0;
const ContentType_1 = __webpack_require__(/*! ./ContentType */ "../node_modules/@nbsfuse/core/lib/ContentType.js");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "../node_modules/@nbsfuse/core/lib/FuseError.js");
const FusePermissionGrantResult_1 = __webpack_require__(/*! ./FusePermissionGrantResult */ "../node_modules/@nbsfuse/core/lib/FusePermissionGrantResult.js");
/**
 * Abstract class to handle permission request.
 * Concrete classes should implement the protected _request method to call on their
 * permission request Fuse API.
 */
class FusePermissionRequest {
    constructor(apiBridge, permissionSet, justificationHandler = null) {
        if (!permissionSet || (permissionSet && permissionSet.length === 0)) {
            throw new FuseError_1.FuseError(FusePermissionRequest.TAG, 'At least one permission is required');
        }
        this.$api = apiBridge;
        this.$permissionSet = permissionSet;
        this.$justificationHandler = justificationHandler;
    }
    getPermissionSet() {
        return this.$permissionSet;
    }
    async $request(isJustified) {
        let response = await this.$api(ContentType_1.ContentType.JSON, {
            permissionSet: this.getPermissionSet(),
            isJustified: isJustified
        });
        if (response.isError()) {
            throw await response.readAsError();
        }
        return new FusePermissionGrantResult_1.FusePermissionGrantResult(await response.readAsJSON());
    }
    async $onJustificationRequest() {
        if (!this.$justificationHandler) {
            console.warn('Permission requires justification, but this request has no TJustificationHandler');
            return false;
        }
        return await this.$justificationHandler();
    }
    async request() {
        let results = await this.$request(false);
        if (results.shouldJustify()) {
            if (await this.$onJustificationRequest()) {
                results = await this.$request(true);
            }
            else {
                results.rejectJustifications();
            }
        }
        return results;
    }
}
exports.FusePermissionRequest = FusePermissionRequest;
FusePermissionRequest.TAG = 'PermissionRequest';


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FusePermissionState.js":
/*!****************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FusePermissionState.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePermissionState = void 0;
var FusePermissionState;
(function (FusePermissionState) {
    FusePermissionState[FusePermissionState["GRANTED"] = 0] = "GRANTED";
    FusePermissionState[FusePermissionState["REQUIRES_JUSTIFICATION"] = 1] = "REQUIRES_JUSTIFICATION";
    FusePermissionState[FusePermissionState["DENIED"] = 2] = "DENIED";
})(FusePermissionState || (exports.FusePermissionState = FusePermissionState = {}));


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FusePlugin.js":
/*!*******************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FusePlugin.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FusePlugin = void 0;
const FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "../node_modules/@nbsfuse/core/lib/FuseSerializer.js");
/**
 * Base class for Fuse Plugins
 */
class FusePlugin {
    constructor(context) {
        this.$context = context;
        this.$apiFactory = this._createAPIFactory() || context.getDefaultAPIFactory();
    }
    /**
     * Creates the API bridge
     * @param platform
     * @returns
     */
    _createAPI(platform) {
        return this._getAPIFactory().create(platform);
    }
    _createAPIFactory() {
        return null;
    }
    _getAPIFactory() {
        return this.$apiFactory;
    }
    /**
     * TAPIOpts is a plugin generic type declaring options.
     * User may use this to declare a path on how to get a particular FuseAPI.
     *
     * This API may be overridden by subclasses to utilise the given options.
     * The default implementation is to simply return a standard FuseAPI.
     *
     * @param opts
     * @returns
     */
    _getAPI(opts) {
        return this.$getAPI();
    }
    /**
     * Returns a standard FuseAPI
     * @returns
     */
    $getAPI() {
        return this._getAPIFactory().create(this.getContext().getPlatform());
    }
    /**
     * Creates a callback context that can be passed to native
     * The native code can use the callbackID to callback to the JS code.
     *
     * The callback can be used several times.
     *
     * Release the callback using _releaseCallback with the given callbackID.
     * These API usages should be part of your plugin API. When releasing a callback,
     * a standard API call should be made to your plugin to tell the native side that
     * the callback is no longer usable, and it should clean up the native resources surrounding
     * the callback context.
     *
     * Note that callback data payloads only supports strings.
     *
     * @param cb
     * @returns String - callbackID
     */
    _createCallback(cb, apiOpts) {
        return this._getAPI(apiOpts).createCallbackContext(cb);
    }
    /**
     * Releases a created callback.
     *
     * @param id callbackID
     */
    _releaseCallback(id, apiOpts) {
        this._getAPI(apiOpts).releaseCallback(id);
    }
    /**
     * Returns the FuseContext
     *
     * @returns
     */
    getContext() {
        return this.$context;
    }
    /**
     * Returns the plugin ID
     */
    getID() {
        return this._getID();
    }
    /**
     * The execution API. Concrete classes can call this to perform calls to the native side.
     *
     * The concrete class should expose public methods with type information exposed.
     *
     * @param method The method link, this should match the endpoint defined in the native API.
     * @param contentType the MIME type of the data you are passing in.
     * @param data - The data to pass to the native environment
     * @returns {ArrayBuffer} The response body from native. FuseResponseReader has some utility methods to read the data in common formats (e.g. text or JSON)
     */
    async _exec(method, contentType, data, apiOpts) {
        return await this._getAPI(apiOpts).execute(this.getID(), method, contentType, data);
    }
    _createAPIBridge(route, serializer) {
        if (!serializer) {
            serializer = new FuseSerializer_1.FuseSerializer();
        }
        return async (type, data) => {
            return await this._exec(route, type, serializer.serialize(data));
        };
    }
}
exports.FusePlugin = FusePlugin;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseResponseReader.js":
/*!***************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseResponseReader.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseResponseReader = void 0;
/**
 * A static class with convenience methods for reading common
 * response content body formats.
 */
class FuseResponseReader {
    constructor() { }
    static async readAsText(data) {
        return await new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsText(new Blob([data]));
        });
    }
    static async readAsJSON(data) {
        let str = await this.readAsText(data);
        return JSON.parse(str);
    }
}
exports.FuseResponseReader = FuseResponseReader;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/FuseSerializer.js":
/*!***********************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/FuseSerializer.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseSerializer = void 0;
class FuseSerializer {
    constructor() { }
    _serializeToString(obj) {
        if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'string') {
            return this._serializePrimitiveToString(obj);
        }
        else if (obj instanceof Date) {
            return this._serializeDateToString(obj);
        }
        else if (this._isISerializable(obj)) {
            return this._serializeToString(obj.serialize());
        }
        else if (obj instanceof Error) {
            return this._serializeErrorToString(obj);
        }
        // When all else fails, attempt to JSON stringify
        return JSON.stringify(obj);
    }
    _serializePrimitiveToString(obj) {
        return obj.toString();
    }
    _serializeErrorToString(obj) {
        let serializedError = {
            name: obj.name,
            message: obj.message,
            stack: obj.stack
        };
        return JSON.stringify(serializedError, null, 4);
    }
    _serializeDateToString(obj) {
        return obj.toISOString();
    }
    serialize(obj) {
        if (obj === null || obj === undefined) {
            return null;
        }
        let bin;
        if (obj instanceof Blob) {
            bin = obj;
        }
        else if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj instanceof Date) {
            bin = new Blob([this._serializeToString(obj)]);
        }
        else if (obj instanceof ArrayBuffer) {
            bin = new Blob([obj]);
        }
        else if (this._isISerializable(obj)) {
            bin = new Blob([this.serialize(obj.serialize())]);
        }
        else {
            // should be either JSON objects or json arrays at this point
            bin = new Blob([this._serializeToString(obj)]);
        }
        return bin;
    }
    _isISerializable(x) {
        return !!x.serialize && typeof x.serialize === 'function';
    }
}
exports.FuseSerializer = FuseSerializer;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/HTTPFuseAPI.js":
/*!********************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/HTTPFuseAPI.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HTTPFuseAPI = void 0;
const ContentType_1 = __webpack_require__(/*! ./ContentType */ "../node_modules/@nbsfuse/core/lib/ContentType.js");
const FuseAPI_1 = __webpack_require__(/*! ./FuseAPI */ "../node_modules/@nbsfuse/core/lib/FuseAPI.js");
const FuseAPIResponse_1 = __webpack_require__(/*! ./FuseAPIResponse */ "../node_modules/@nbsfuse/core/lib/FuseAPIResponse.js");
const FuseError_1 = __webpack_require__(/*! ./FuseError */ "../node_modules/@nbsfuse/core/lib/FuseError.js");
/**
 * A Fuse API implementation that uses HTTP protocol to make native calls
 */
class HTTPFuseAPI extends FuseAPI_1.FuseAPI {
    async _getEndpoint() {
        return '';
    }
    async _initHeaders(xhr) { }
    ;
    async buildRoute(pluginID, method) {
        let endpoint = await this._getEndpoint();
        return `${endpoint}${this._createRoute(pluginID, method)}`;
    }
    async _execute(pluginID, method, contentType, data) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.open('POST', await this.buildRoute(pluginID, method));
        if (!contentType) {
            contentType = ContentType_1.ContentType.BINARY;
        }
        if (contentType) {
            xhr.setRequestHeader('Content-Type', contentType);
        }
        await this._initHeaders(xhr);
        return await this._doRequest(xhr, data);
    }
    _doRequest(xhr, data) {
        return new Promise((resolve, reject) => {
            xhr.onload = async () => {
                let response = new FuseAPIResponse_1.FuseAPIResponse(xhr.response, xhr.getAllResponseHeaders(), xhr.status);
                if (response.isError()) {
                    reject(await response.readAsError());
                }
                else {
                    resolve(response);
                }
            };
            xhr.onerror = (e) => {
                reject(new FuseError_1.FuseError('FuseAPI', 'Network Error'));
            };
            xhr.ontimeout = (e) => {
                reject(new FuseError_1.FuseError('FuseAPI', 'API Timeout'));
            };
            this._doSend(xhr, data);
        });
    }
    _doSend(xhr, data) {
        if (data !== undefined && data !== null) {
            xhr.send(data);
        }
        else {
            xhr.send();
        }
    }
}
exports.HTTPFuseAPI = HTTPFuseAPI;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/Platform.js":
/*!*****************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/Platform.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Platform = void 0;
/**
 * Enumeration for supported platforms
 */
var Platform;
(function (Platform) {
    Platform[Platform["IOS"] = 1] = "IOS";
    Platform[Platform["ANDROID"] = 2] = "ANDROID";
    /**
     * Specialized platform used for test environments,
     * will not be used for regular runtimes.
     */
    Platform[Platform["TEST"] = 3] = "TEST";
})(Platform || (exports.Platform = Platform = {}));


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/PlatformResolver.js":
/*!*************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/PlatformResolver.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlatformResolver = void 0;
const Platform_1 = __webpack_require__(/*! ./Platform */ "../node_modules/@nbsfuse/core/lib/Platform.js");
/**
 * A strategy to resolve the runtime's platform
 */
class PlatformResolver {
    resolve() {
        if (this.isIOSEnvironment()) {
            return Platform_1.Platform.IOS;
        }
        else {
            // The only other supported platform is Android, so
            // it's assumed
            return Platform_1.Platform.ANDROID;
        }
    }
    isIOSEnvironment() {
        return location.protocol === 'nbsfuse:';
    }
    isAndroidEnvironment() {
        return !this.isIOSEnvironment();
    }
}
exports.PlatformResolver = PlatformResolver;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/Version.js":
/*!****************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/Version.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Version = void 0;
class Version {
    constructor(major, minor, patch) {
        this.$major = major;
        this.$minor = minor || 0;
        this.$patch = patch || 0;
    }
    static parseVersionString(version) {
        let parts = version.split('.');
        let major = parseInt(parts[0]);
        let minor = parseInt(parts[1]);
        let patch = parseInt(parts[2]);
        if (isNaN(major)) {
            major = 0;
        }
        if (isNaN(minor)) {
            minor = 0;
        }
        if (isNaN(patch)) {
            patch = 0;
        }
        return new Version(major, minor, patch);
    }
    getMajor() {
        return this.$major;
    }
    getMinor() {
        return this.$minor;
    }
    getPatch() {
        return this.$patch;
    }
    toString() {
        return `${this.$major}.${this.$minor}.${this.$patch}`;
    }
    compare(b) {
        return Version.compare(this, b);
    }
    static compare(lhs, rhs) {
        if (lhs.$major === rhs.$major && lhs.$minor === rhs.$minor && lhs.$patch === rhs.$patch) {
            return Version.EQUAL;
        }
        if (lhs.$major === rhs.$major) {
            if (lhs.$minor === rhs.$minor) {
                if (lhs.$patch === rhs.$patch) {
                    // shouldn't have reached here... as it should have been caught by the simple test above first
                    // but for consistency we will keep it here.
                    return Version.EQUAL;
                }
                else {
                    return lhs.$patch > rhs.$patch ? Version.GREATER_THAN : Version.LESS_THAN;
                }
            }
            else {
                return lhs.$minor > rhs.$minor ? Version.GREATER_THAN : Version.LESS_THAN;
            }
        }
        else {
            return lhs.$major > rhs.$major ? Version.GREATER_THAN : Version.LESS_THAN;
        }
    }
}
exports.Version = Version;
Version.LESS_THAN = -1;
Version.EQUAL = 0;
Version.GREATER_THAN = 1;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/android/AndroidFuseLogger.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/android/AndroidFuseLogger.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndroidFuseLogger = void 0;
const FuseLogger_1 = __webpack_require__(/*! ../FuseLogger */ "../node_modules/@nbsfuse/core/lib/FuseLogger.js");
const FuseCallbackManager_1 = __webpack_require__(/*! ../FuseCallbackManager */ "../node_modules/@nbsfuse/core/lib/FuseCallbackManager.js");
class AndroidFuseLogger extends FuseLogger_1.FuseLogger {
    _logToNative(level, message) {
        window.NBSNative.log(level, message);
    }
    _registerNativeCalblack() {
        window.NBSNative.setLogCallback(FuseCallbackManager_1.FuseCallbackManager.getInstance().createCallback((payload) => {
            let entry = null;
            try {
                entry = JSON.parse(payload);
            }
            catch (ex) {
                return;
            }
            this._onNativeLogEntry(entry);
        }));
    }
}
exports.AndroidFuseLogger = AndroidFuseLogger;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/android/AndroidSchemeFuseAPI.js":
/*!*************************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/android/AndroidSchemeFuseAPI.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndroidSchemeFuseAPI = void 0;
const HTTPFuseAPI_1 = __webpack_require__(/*! ../HTTPFuseAPI */ "../node_modules/@nbsfuse/core/lib/HTTPFuseAPI.js");
/**
 * A Fuse API implementation for an embedded HTTP server to bridge the JS and Native API calls.
 */
class AndroidSchemeFuseAPI extends HTTPFuseAPI_1.HTTPFuseAPI {
    async _getEndpoint() {
        return `http://localhost:${window.NBSNative.getAPIPort()}`;
    }
    async _initHeaders(xhr) {
        xhr.setRequestHeader('X-Fuse-Secret', window.NBSNative.getAPISecret());
    }
}
exports.AndroidSchemeFuseAPI = AndroidSchemeFuseAPI;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/api.js":
/*!************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/api.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndroidFuseLogger = exports.AndroidSchemeFuseAPI = exports.IOSFuseLogger = exports.IOSSchemeFuseAPI = exports.FuseLoggerFactory = exports.AbstractFuseLoggerFactory = exports.FuseLoggerSerializer = exports.FuseLogger = exports.FuseLoggerLevel = exports.FusePermissionGrantResult = exports.FusePermissionRequest = exports.FusePermissionState = exports.FuseSerializer = exports.FuseError = exports.HTTPFuseAPI = exports.FusePlugin = exports.FuseRuntime = exports.AbstractFuseAPIFactory = exports.FuseAPIFactory = exports.FuseResponseReader = exports.ContentType = exports.FuseAPIResponse = exports.FuseCallbackManager = exports.FuseAPI = exports.Version = exports.FuseContextBuilder = exports.FuseContext = exports.PlatformResolver = exports.Platform = void 0;
// Common API
var Platform_1 = __webpack_require__(/*! ./Platform */ "../node_modules/@nbsfuse/core/lib/Platform.js");
Object.defineProperty(exports, "Platform", ({ enumerable: true, get: function () { return Platform_1.Platform; } }));
var PlatformResolver_1 = __webpack_require__(/*! ./PlatformResolver */ "../node_modules/@nbsfuse/core/lib/PlatformResolver.js");
Object.defineProperty(exports, "PlatformResolver", ({ enumerable: true, get: function () { return PlatformResolver_1.PlatformResolver; } }));
var FuseContext_1 = __webpack_require__(/*! ./FuseContext */ "../node_modules/@nbsfuse/core/lib/FuseContext.js");
Object.defineProperty(exports, "FuseContext", ({ enumerable: true, get: function () { return FuseContext_1.FuseContext; } }));
var FuseContextBuilder_1 = __webpack_require__(/*! ./FuseContextBuilder */ "../node_modules/@nbsfuse/core/lib/FuseContextBuilder.js");
Object.defineProperty(exports, "FuseContextBuilder", ({ enumerable: true, get: function () { return FuseContextBuilder_1.FuseContextBuilder; } }));
var Version_1 = __webpack_require__(/*! ./Version */ "../node_modules/@nbsfuse/core/lib/Version.js");
Object.defineProperty(exports, "Version", ({ enumerable: true, get: function () { return Version_1.Version; } }));
var FuseAPI_1 = __webpack_require__(/*! ./FuseAPI */ "../node_modules/@nbsfuse/core/lib/FuseAPI.js");
Object.defineProperty(exports, "FuseAPI", ({ enumerable: true, get: function () { return FuseAPI_1.FuseAPI; } }));
var FuseCallbackManager_1 = __webpack_require__(/*! ./FuseCallbackManager */ "../node_modules/@nbsfuse/core/lib/FuseCallbackManager.js");
Object.defineProperty(exports, "FuseCallbackManager", ({ enumerable: true, get: function () { return FuseCallbackManager_1.FuseCallbackManager; } }));
var FuseAPIResponse_1 = __webpack_require__(/*! ./FuseAPIResponse */ "../node_modules/@nbsfuse/core/lib/FuseAPIResponse.js");
Object.defineProperty(exports, "FuseAPIResponse", ({ enumerable: true, get: function () { return FuseAPIResponse_1.FuseAPIResponse; } }));
var ContentType_1 = __webpack_require__(/*! ./ContentType */ "../node_modules/@nbsfuse/core/lib/ContentType.js");
Object.defineProperty(exports, "ContentType", ({ enumerable: true, get: function () { return ContentType_1.ContentType; } }));
var FuseResponseReader_1 = __webpack_require__(/*! ./FuseResponseReader */ "../node_modules/@nbsfuse/core/lib/FuseResponseReader.js");
Object.defineProperty(exports, "FuseResponseReader", ({ enumerable: true, get: function () { return FuseResponseReader_1.FuseResponseReader; } }));
var FuseAPIFactory_1 = __webpack_require__(/*! ./FuseAPIFactory */ "../node_modules/@nbsfuse/core/lib/FuseAPIFactory.js");
Object.defineProperty(exports, "FuseAPIFactory", ({ enumerable: true, get: function () { return FuseAPIFactory_1.FuseAPIFactory; } }));
var AbstractFuseAPIFactory_1 = __webpack_require__(/*! ./AbstractFuseAPIFactory */ "../node_modules/@nbsfuse/core/lib/AbstractFuseAPIFactory.js");
Object.defineProperty(exports, "AbstractFuseAPIFactory", ({ enumerable: true, get: function () { return AbstractFuseAPIFactory_1.AbstractFuseAPIFactory; } }));
var FuseRuntime_1 = __webpack_require__(/*! ./plugins/FuseRuntime */ "../node_modules/@nbsfuse/core/lib/plugins/FuseRuntime.js");
Object.defineProperty(exports, "FuseRuntime", ({ enumerable: true, get: function () { return FuseRuntime_1.FuseRuntime; } }));
var FusePlugin_1 = __webpack_require__(/*! ./FusePlugin */ "../node_modules/@nbsfuse/core/lib/FusePlugin.js");
Object.defineProperty(exports, "FusePlugin", ({ enumerable: true, get: function () { return FusePlugin_1.FusePlugin; } }));
var HTTPFuseAPI_1 = __webpack_require__(/*! ./HTTPFuseAPI */ "../node_modules/@nbsfuse/core/lib/HTTPFuseAPI.js");
Object.defineProperty(exports, "HTTPFuseAPI", ({ enumerable: true, get: function () { return HTTPFuseAPI_1.HTTPFuseAPI; } }));
var FuseError_1 = __webpack_require__(/*! ./FuseError */ "../node_modules/@nbsfuse/core/lib/FuseError.js");
Object.defineProperty(exports, "FuseError", ({ enumerable: true, get: function () { return FuseError_1.FuseError; } }));
var FuseSerializer_1 = __webpack_require__(/*! ./FuseSerializer */ "../node_modules/@nbsfuse/core/lib/FuseSerializer.js");
Object.defineProperty(exports, "FuseSerializer", ({ enumerable: true, get: function () { return FuseSerializer_1.FuseSerializer; } }));
var FusePermissionState_1 = __webpack_require__(/*! ./FusePermissionState */ "../node_modules/@nbsfuse/core/lib/FusePermissionState.js");
Object.defineProperty(exports, "FusePermissionState", ({ enumerable: true, get: function () { return FusePermissionState_1.FusePermissionState; } }));
var FusePermissionRequest_1 = __webpack_require__(/*! ./FusePermissionRequest */ "../node_modules/@nbsfuse/core/lib/FusePermissionRequest.js");
Object.defineProperty(exports, "FusePermissionRequest", ({ enumerable: true, get: function () { return FusePermissionRequest_1.FusePermissionRequest; } }));
var FusePermissionGrantResult_1 = __webpack_require__(/*! ./FusePermissionGrantResult */ "../node_modules/@nbsfuse/core/lib/FusePermissionGrantResult.js");
Object.defineProperty(exports, "FusePermissionGrantResult", ({ enumerable: true, get: function () { return FusePermissionGrantResult_1.FusePermissionGrantResult; } }));
// Logger
var FuseLoggerLevel_1 = __webpack_require__(/*! ./FuseLoggerLevel */ "../node_modules/@nbsfuse/core/lib/FuseLoggerLevel.js");
Object.defineProperty(exports, "FuseLoggerLevel", ({ enumerable: true, get: function () { return FuseLoggerLevel_1.FuseLoggerLevel; } }));
var FuseLogger_1 = __webpack_require__(/*! ./FuseLogger */ "../node_modules/@nbsfuse/core/lib/FuseLogger.js");
Object.defineProperty(exports, "FuseLogger", ({ enumerable: true, get: function () { return FuseLogger_1.FuseLogger; } }));
Object.defineProperty(exports, "FuseLoggerSerializer", ({ enumerable: true, get: function () { return FuseLogger_1.FuseLoggerSerializer; } }));
var AbstractFuseLoggerFactory_1 = __webpack_require__(/*! ./AbstractFuseLoggerFactory */ "../node_modules/@nbsfuse/core/lib/AbstractFuseLoggerFactory.js");
Object.defineProperty(exports, "AbstractFuseLoggerFactory", ({ enumerable: true, get: function () { return AbstractFuseLoggerFactory_1.AbstractFuseLoggerFactory; } }));
var FuseLoggerFactory_1 = __webpack_require__(/*! ./FuseLoggerFactory */ "../node_modules/@nbsfuse/core/lib/FuseLoggerFactory.js");
Object.defineProperty(exports, "FuseLoggerFactory", ({ enumerable: true, get: function () { return FuseLoggerFactory_1.FuseLoggerFactory; } }));
// iOS Specific APIs / Implementations
var IOSSchemeFuseAPI_1 = __webpack_require__(/*! ./ios/IOSSchemeFuseAPI */ "../node_modules/@nbsfuse/core/lib/ios/IOSSchemeFuseAPI.js");
Object.defineProperty(exports, "IOSSchemeFuseAPI", ({ enumerable: true, get: function () { return IOSSchemeFuseAPI_1.IOSSchemeFuseAPI; } }));
var IOSFuseLogger_1 = __webpack_require__(/*! ./ios/IOSFuseLogger */ "../node_modules/@nbsfuse/core/lib/ios/IOSFuseLogger.js");
Object.defineProperty(exports, "IOSFuseLogger", ({ enumerable: true, get: function () { return IOSFuseLogger_1.IOSFuseLogger; } }));
// Android Specific APIs / Implementations
var AndroidSchemeFuseAPI_1 = __webpack_require__(/*! ./android/AndroidSchemeFuseAPI */ "../node_modules/@nbsfuse/core/lib/android/AndroidSchemeFuseAPI.js");
Object.defineProperty(exports, "AndroidSchemeFuseAPI", ({ enumerable: true, get: function () { return AndroidSchemeFuseAPI_1.AndroidSchemeFuseAPI; } }));
var AndroidFuseLogger_1 = __webpack_require__(/*! ./android/AndroidFuseLogger */ "../node_modules/@nbsfuse/core/lib/android/AndroidFuseLogger.js");
Object.defineProperty(exports, "AndroidFuseLogger", ({ enumerable: true, get: function () { return AndroidFuseLogger_1.AndroidFuseLogger; } }));


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/ios/IOSFuseLogger.js":
/*!**************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/ios/IOSFuseLogger.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IOSFuseLogger = void 0;
const FuseLogger_1 = __webpack_require__(/*! ../FuseLogger */ "../node_modules/@nbsfuse/core/lib/FuseLogger.js");
const FuseCallbackManager_1 = __webpack_require__(/*! ../FuseCallbackManager */ "../node_modules/@nbsfuse/core/lib/FuseCallbackManager.js");
class IOSFuseLogger extends FuseLogger_1.FuseLogger {
    _logToNative(level, message) {
        window.webkit.messageHandlers.log.postMessage([level, message]);
    }
    _registerNativeCalblack() {
        window.webkit.messageHandlers.setLogCallback.postMessage(FuseCallbackManager_1.FuseCallbackManager.getInstance().createCallback((payload) => {
            let entry = null;
            try {
                entry = JSON.parse(payload);
            }
            catch (ex) {
                return;
            }
            this._onNativeLogEntry(entry);
        }));
    }
}
exports.IOSFuseLogger = IOSFuseLogger;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/ios/IOSSchemeFuseAPI.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/ios/IOSSchemeFuseAPI.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IOSSchemeFuseAPI = void 0;
const HTTPFuseAPI_1 = __webpack_require__(/*! ../HTTPFuseAPI */ "../node_modules/@nbsfuse/core/lib/HTTPFuseAPI.js");
/**
 * A Fuse API implementation for iOS that uses WKURLSchemeHandler to bridge the JS and Native API calls.
 */
class IOSSchemeFuseAPI extends HTTPFuseAPI_1.HTTPFuseAPI {
    async _getEndpoint() {
        return `http://localhost:${await window.webkit.messageHandlers.getAPIPort.postMessage("")}`;
    }
    async _initHeaders(xhr) {
        xhr.setRequestHeader('X-Fuse-Secret', await window.webkit.messageHandlers.getAPISecret.postMessage(""));
    }
}
exports.IOSSchemeFuseAPI = IOSSchemeFuseAPI;


/***/ }),

/***/ "../node_modules/@nbsfuse/core/lib/plugins/FuseRuntime.js":
/*!****************************************************************!*\
  !*** ../node_modules/@nbsfuse/core/lib/plugins/FuseRuntime.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseRuntime = void 0;
const ContentType_1 = __webpack_require__(/*! ../ContentType */ "../node_modules/@nbsfuse/core/lib/ContentType.js");
const FusePlugin_1 = __webpack_require__(/*! ../FusePlugin */ "../node_modules/@nbsfuse/core/lib/FusePlugin.js");
class FuseRuntime extends FusePlugin_1.FusePlugin {
    constructor(context) {
        super(context);
        this.$callbackIDs = [];
    }
    _getID() {
        return 'FuseRuntime';
    }
    async getInfo() {
        let data = await this._exec('/info');
        return await data.readAsJSON();
    }
    async registerPauseHandler(cb) {
        let cbID = this._createCallback((payload) => {
            cb();
        });
        await this._exec('/registerPauseHandler', ContentType_1.ContentType.TEXT, cbID);
        this.$callbackIDs.push(cbID);
        return cbID;
    }
    async unregisterPauseHandler(callbackID) {
        await this._exec('/unregisterPauseHandler', ContentType_1.ContentType.TEXT, callbackID);
    }
    async registerResumeHandler(cb) {
        let cbID = this._createCallback((payload) => {
            cb();
        });
        await this._exec('/registerResumeHandler', ContentType_1.ContentType.TEXT, cbID);
        this.$callbackIDs.push(cbID);
        return cbID;
    }
    async unregisterResumeHandler(callbackID) {
        await this._exec('/unregisterResumeHandler', ContentType_1.ContentType.TEXT, callbackID);
    }
}
exports.FuseRuntime = FuseRuntime;


/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function get() {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function get() {
    return _parse.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function get() {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function get() {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function get() {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function get() {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function get() {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function get() {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function get() {
    return _version.default;
  }
}));

var _v = _interopRequireDefault(__webpack_require__(/*! ./v1.js */ "../node_modules/uuid/dist/commonjs-browser/v1.js"));

var _v2 = _interopRequireDefault(__webpack_require__(/*! ./v3.js */ "../node_modules/uuid/dist/commonjs-browser/v3.js"));

var _v3 = _interopRequireDefault(__webpack_require__(/*! ./v4.js */ "../node_modules/uuid/dist/commonjs-browser/v4.js"));

var _v4 = _interopRequireDefault(__webpack_require__(/*! ./v5.js */ "../node_modules/uuid/dist/commonjs-browser/v5.js"));

var _nil = _interopRequireDefault(__webpack_require__(/*! ./nil.js */ "../node_modules/uuid/dist/commonjs-browser/nil.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version.js */ "../node_modules/uuid/dist/commonjs-browser/version.js"));

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "../node_modules/uuid/dist/commonjs-browser/validate.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "../node_modules/uuid/dist/commonjs-browser/stringify.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "../node_modules/uuid/dist/commonjs-browser/parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/md5.js":
/*!*********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/md5.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/native.js":
/*!************************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/native.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _default = {
  randomUUID
};
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/nil.js":
/*!*********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/nil.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/parse.js":
/*!***********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/parse.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "../node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/regex.js":
/*!***********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/regex.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/rng.js":
/*!*********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/rng.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);

function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/sha1.js":
/*!**********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/sha1.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/stringify.js":
/*!***************************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/stringify.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.unsafeStringify = unsafeStringify;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "../node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/v1.js":
/*!********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/v1.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "../node_modules/uuid/dist/commonjs-browser/rng.js"));

var _stringify = __webpack_require__(/*! ./stringify.js */ "../node_modules/uuid/dist/commonjs-browser/stringify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.unsafeStringify)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/v3.js":
/*!********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/v3.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "../node_modules/uuid/dist/commonjs-browser/v35.js"));

var _md = _interopRequireDefault(__webpack_require__(/*! ./md5.js */ "../node_modules/uuid/dist/commonjs-browser/md5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/v35.js":
/*!*********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/v35.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.URL = exports.DNS = void 0;
exports["default"] = v35;

var _stringify = __webpack_require__(/*! ./stringify.js */ "../node_modules/uuid/dist/commonjs-browser/stringify.js");

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "../node_modules/uuid/dist/commonjs-browser/parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;

    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.unsafeStringify)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/v4.js":
/*!********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/v4.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _native = _interopRequireDefault(__webpack_require__(/*! ./native.js */ "../node_modules/uuid/dist/commonjs-browser/native.js"));

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "../node_modules/uuid/dist/commonjs-browser/rng.js"));

var _stringify = __webpack_require__(/*! ./stringify.js */ "../node_modules/uuid/dist/commonjs-browser/stringify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  if (_native.default.randomUUID && !buf && !options) {
    return _native.default.randomUUID();
  }

  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.unsafeStringify)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/v5.js":
/*!********************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/v5.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "../node_modules/uuid/dist/commonjs-browser/v35.js"));

var _sha = _interopRequireDefault(__webpack_require__(/*! ./sha1.js */ "../node_modules/uuid/dist/commonjs-browser/sha1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/validate.js":
/*!**************************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/validate.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__webpack_require__(/*! ./regex.js */ "../node_modules/uuid/dist/commonjs-browser/regex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ "../node_modules/uuid/dist/commonjs-browser/version.js":
/*!*************************************************************!*\
  !*** ../node_modules/uuid/dist/commonjs-browser/version.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "../node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ "../src/FuseLocationAccuracy.ts":
/*!**************************************!*\
  !*** ../src/FuseLocationAccuracy.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLocationAccuracy = void 0;
var FuseLocationAccuracy;
(function (FuseLocationAccuracy) {
    FuseLocationAccuracy[FuseLocationAccuracy["COARSE"] = 0] = "COARSE";
    FuseLocationAccuracy[FuseLocationAccuracy["FINE"] = 1] = "FINE";
})(FuseLocationAccuracy || (exports.FuseLocationAccuracy = FuseLocationAccuracy = {}));


/***/ }),

/***/ "../src/FuseLocationEventType.ts":
/*!***************************************!*\
  !*** ../src/FuseLocationEventType.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLocationEventType = void 0;
var FuseLocationEventType;
(function (FuseLocationEventType) {
    FuseLocationEventType[FuseLocationEventType["AVAILABILITY"] = 0] = "AVAILABILITY";
    FuseLocationEventType[FuseLocationEventType["LOCATION"] = 1] = "LOCATION";
})(FuseLocationEventType || (exports.FuseLocationEventType = FuseLocationEventType = {}));


/***/ }),

/***/ "../src/FuseLocationPlugin.ts":
/*!************************************!*\
  !*** ../src/FuseLocationPlugin.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLocationPlugin = void 0;
const core_1 = __webpack_require__(/*! @nbsfuse/core */ "../node_modules/@nbsfuse/core/lib/api.js");
const FuseLocationSubscription_1 = __webpack_require__(/*! ./FuseLocationSubscription */ "../src/FuseLocationSubscription.ts");
class FuseLocationPlugin extends core_1.FusePlugin {
    constructor(context) {
        super(context);
        this.$callbackID = null;
        this.$subscriptions = [];
    }
    _getID() {
        return 'FuseLocation';
    }
    async watch(accuracy, justificationHandler) {
        let builder = new FuseLocationSubscription_1.FuseLocationSubscriptionOptionsBuilder();
        builder.setAccuracy(accuracy);
        return await this.subscribe(builder.build(), justificationHandler);
    }
    async $init() {
        if (this.$callbackID !== null) {
            return;
        }
        this.$callbackID = this._createCallback((data) => {
            let event = null;
            try {
                event = JSON.parse(data);
            }
            catch (ex) {
                this.getContext().getLogger().error('Error parsing Location Update event', core_1.FuseError.wrap(ex));
                return;
            }
            for (let i = 0; i < this.$subscriptions.length; i++) {
                let sub = this.$subscriptions[i];
                try {
                    sub.notify(event);
                }
                catch (ex) {
                    this.getContext().getLogger().error('FuseLocationSubscription Handler Error:', core_1.FuseError.wrap(ex));
                }
            }
        });
        await this._exec('/callback', core_1.ContentType.TEXT, this.$callbackID);
    }
    async subscribe(options, justificationHandler) {
        if (this.$callbackID === null) {
            await this.$init();
        }
        let subscription = await this._subscribe(options, justificationHandler);
        this.$subscriptions.push(subscription);
        return subscription;
    }
    async unsubscribe(subscription) {
        let index = this.$subscriptions.indexOf(subscription);
        if (index > -1) {
            this.$subscriptions.splice(index, 1);
        }
        await this._exec('/unsubscribe', core_1.ContentType.TEXT, subscription.getID());
    }
}
exports.FuseLocationPlugin = FuseLocationPlugin;


/***/ }),

/***/ "../src/FuseLocationPluginFactory.ts":
/*!*******************************************!*\
  !*** ../src/FuseLocationPluginFactory.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLocationPluginFactory = void 0;
const core_1 = __webpack_require__(/*! @nbsfuse/core */ "../node_modules/@nbsfuse/core/lib/api.js");
const AndroidFuseLocationPlugin_1 = __webpack_require__(/*! ./android/AndroidFuseLocationPlugin */ "../src/android/AndroidFuseLocationPlugin.ts");
class FuseLocationPluginFactory {
    constructor() { }
    create(context) {
        switch (context.getPlatform()) {
            case core_1.Platform.ANDROID: return new AndroidFuseLocationPlugin_1.AndroidFuseLocationPlugin(context);
            case core_1.Platform.IOS: return null;
            default: throw new core_1.FuseError('FuseLocationPluginFactory', `Unsupported platform: ${context.getPlatform()}`);
        }
    }
}
exports.FuseLocationPluginFactory = FuseLocationPluginFactory;


/***/ }),

/***/ "../src/FuseLocationSubscription.ts":
/*!******************************************!*\
  !*** ../src/FuseLocationSubscription.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLocationSubscription = exports.FuseLocationSubscriptionOptionsBuilder = void 0;
const core_1 = __webpack_require__(/*! @nbsfuse/core */ "../node_modules/@nbsfuse/core/lib/api.js");
const FuseLocationAccuracy_1 = __webpack_require__(/*! ./FuseLocationAccuracy */ "../src/FuseLocationAccuracy.ts");
const FuseLocationEventType_1 = __webpack_require__(/*! ./FuseLocationEventType */ "../src/FuseLocationEventType.ts");
class FuseLocationSubscriptionOptionsBuilder {
    constructor() {
        this.$accuracy = FuseLocationAccuracy_1.FuseLocationAccuracy.COARSE;
        this.$interval = 1000;
    }
    /**
     * Sets the desired accuracy.
     *
     * Whether this is honoured depends if the user grants the appropriate permission.
     *
     * @default FuseLocationAccuracy.COARSE
     * @param accuracy
     * @returns
     */
    setAccuracy(accuracy) {
        this.$accuracy = accuracy;
        return this;
    }
    /**
     * The interval to receive GPS points. This acts like a hint but events
     * may come quicker or slower than the desired interval. Several deciding factors
     * including but not limited to other services also using GPS and the GPS health.
     *
     * @default 1000
     * @param interval
     * @returns
     */
    setInterval(interval) {
        this.$interval = interval;
        return this;
    }
    build() {
        return {
            accuracy: this.$accuracy,
            interval: this.$interval
        };
    }
}
exports.FuseLocationSubscriptionOptionsBuilder = FuseLocationSubscriptionOptionsBuilder;
class FuseLocationSubscription {
    constructor(plugin, id, options, grantResult) {
        this.$plugin = plugin;
        this.$id = id;
        this.$callbacks = [];
        this.$options = options;
        this.$grants = grantResult;
    }
    getID() {
        return this.$id;
    }
    isAuthorized() {
        return this.$grants.isGranted(this.$desiredAccuracy);
    }
    register(cb) {
        this.$callbacks.push(cb);
    }
    unregister(cb) {
        let idx = this.$callbacks.indexOf(cb);
        if (idx > -1) {
            this.$callbacks.splice(idx, 1);
        }
    }
    notify(event) {
        if (event.type === FuseLocationEventType_1.FuseLocationEventType.LOCATION) {
            for (let i = 0; i < this.$callbacks.length; i++) {
                let cb = this.$callbacks[i];
                try {
                    cb(event.data);
                }
                catch (ex) {
                    this.$plugin.getContext().getLogger().error("TFuseLocationHandler error", core_1.FuseError.wrap(ex));
                }
            }
        }
        else {
            this.$plugin.getContext().getLogger().info("Received unhandled Availability event");
            console.log(event);
        }
    }
    async assertSettings() {
        return await this.$plugin.assertSettings(this.$options);
    }
    async release() {
        await this.$plugin.unsubscribe(this);
    }
}
exports.FuseLocationSubscription = FuseLocationSubscription;
;


/***/ }),

/***/ "../src/android/AndroidFuseLocationPlugin.ts":
/*!***************************************************!*\
  !*** ../src/android/AndroidFuseLocationPlugin.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AndroidFuseLocationPlugin = void 0;
const core_1 = __webpack_require__(/*! @nbsfuse/core */ "../node_modules/@nbsfuse/core/lib/api.js");
const FuseLocationPlugin_1 = __webpack_require__(/*! ../FuseLocationPlugin */ "../src/FuseLocationPlugin.ts");
const FuseLocationSubscription_1 = __webpack_require__(/*! ../FuseLocationSubscription */ "../src/FuseLocationSubscription.ts");
class AndroidFuseLocationPlugin extends FuseLocationPlugin_1.FuseLocationPlugin {
    async assertSettings(options) {
        let res = await this._exec('/assertSettings', core_1.ContentType.JSON, options);
        return res.readAsJSON();
    }
    async _subscribe(options, justificationHandler) {
        let permRequest = new core_1.FusePermissionRequest(this._createAPIBridge('/requestPermissions'), [options.accuracy], justificationHandler);
        let grantResult = null;
        grantResult = await permRequest.request();
        let subscriptionID = null;
        let res = await this._exec('/subscribe', core_1.ContentType.JSON, options);
        subscriptionID = await res.readAsText();
        return new FuseLocationSubscription_1.FuseLocationSubscription(this, subscriptionID, options, grantResult);
    }
}
exports.AndroidFuseLocationPlugin = AndroidFuseLocationPlugin;


/***/ }),

/***/ "../src/api.ts":
/*!*********************!*\
  !*** ../src/api.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FuseLocationAccuracy = exports.FuseLocationEventType = exports.FuseLocationSubscriptionOptionsBuilder = exports.FuseLocationSubscription = exports.FuseLocationPluginFactory = exports.FuseLocationPlugin = void 0;
var FuseLocationPlugin_1 = __webpack_require__(/*! ./FuseLocationPlugin */ "../src/FuseLocationPlugin.ts");
Object.defineProperty(exports, "FuseLocationPlugin", ({ enumerable: true, get: function () { return FuseLocationPlugin_1.FuseLocationPlugin; } }));
var FuseLocationPluginFactory_1 = __webpack_require__(/*! ./FuseLocationPluginFactory */ "../src/FuseLocationPluginFactory.ts");
Object.defineProperty(exports, "FuseLocationPluginFactory", ({ enumerable: true, get: function () { return FuseLocationPluginFactory_1.FuseLocationPluginFactory; } }));
var FuseLocationSubscription_1 = __webpack_require__(/*! ./FuseLocationSubscription */ "../src/FuseLocationSubscription.ts");
Object.defineProperty(exports, "FuseLocationSubscription", ({ enumerable: true, get: function () { return FuseLocationSubscription_1.FuseLocationSubscription; } }));
Object.defineProperty(exports, "FuseLocationSubscriptionOptionsBuilder", ({ enumerable: true, get: function () { return FuseLocationSubscription_1.FuseLocationSubscriptionOptionsBuilder; } }));
var FuseLocationEventType_1 = __webpack_require__(/*! ./FuseLocationEventType */ "../src/FuseLocationEventType.ts");
Object.defineProperty(exports, "FuseLocationEventType", ({ enumerable: true, get: function () { return FuseLocationEventType_1.FuseLocationEventType; } }));
var FuseLocationAccuracy_1 = __webpack_require__(/*! ./FuseLocationAccuracy */ "../src/FuseLocationAccuracy.ts");
Object.defineProperty(exports, "FuseLocationAccuracy", ({ enumerable: true, get: function () { return FuseLocationAccuracy_1.FuseLocationAccuracy; } }));


/***/ }),

/***/ "../node_modules/tslib/tslib.es6.mjs":
/*!*******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nbsfuse/core */ "../node_modules/@nbsfuse/core/lib/api.js");
const api_1 = __webpack_require__(/*! ../../src/api */ "../src/api.ts");
let dataContainer;
let plugin;
async function createListener(mode) {
    let subscription = await plugin.watch(mode, async () => {
        return true;
    });
    subscription.register((points) => {
        let lastPoint = null;
        for (let i = 0; i < points.length; i++) {
            lastPoint = points[i];
        }
        if (!lastPoint) {
            return;
        }
        dataContainer.innerHTML = '';
        let data = document.createElement('pre');
        data.innerHTML = JSON.stringify(lastPoint, null, 4);
        dataContainer.appendChild(data);
    });
    return subscription;
}
window.onload = async () => {
    let builder = new core_1.FuseContextBuilder();
    let context = await builder.build();
    plugin = new api_1.FuseLocationPluginFactory().create(context);
    window.plugin = plugin;
    let currentMode = null;
    let toggleFineBtn = document.createElement('button');
    toggleFineBtn.innerHTML = 'Toggle Fine Location';
    let toggleCoarseBtn = document.createElement('button');
    toggleCoarseBtn.innerHTML = 'Toggle Coarse Location';
    let checkBtn = document.createElement('button');
    checkBtn.innerHTML = 'Check Settings';
    let subscription = null;
    toggleFineBtn.addEventListener('click', async () => {
        if (subscription) {
            await subscription.release();
            subscription = null;
            dataContainer.innerHTML = '';
            if (currentMode !== api_1.FuseLocationAccuracy.FINE) {
                subscription = await createListener(api_1.FuseLocationAccuracy.FINE);
                currentMode = api_1.FuseLocationAccuracy.FINE;
            }
            else {
                currentMode = null;
            }
        }
        else {
            subscription = await createListener(api_1.FuseLocationAccuracy.FINE);
            currentMode = api_1.FuseLocationAccuracy.FINE;
        }
    });
    toggleCoarseBtn.addEventListener('click', async () => {
        if (subscription) {
            await subscription.release();
            subscription = null;
            dataContainer.innerHTML = '';
            if (currentMode !== api_1.FuseLocationAccuracy.COARSE) {
                subscription = await createListener(api_1.FuseLocationAccuracy.COARSE);
                currentMode = api_1.FuseLocationAccuracy.COARSE;
            }
            else {
                currentMode = null;
            }
        }
        else {
            subscription = await createListener(api_1.FuseLocationAccuracy.COARSE);
            currentMode = api_1.FuseLocationAccuracy.COARSE;
        }
    });
    checkBtn.addEventListener('click', async () => {
        if (!subscription) {
            dataContainer.innerHTML = 'subscription required.';
            return;
        }
        console.log(await subscription.assertSettings());
    });
    dataContainer = document.createElement('div');
    document.body.appendChild(toggleFineBtn);
    document.body.appendChild(toggleCoarseBtn);
    document.body.appendChild(checkBtn);
    document.body.appendChild(dataContainer);
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQztJQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vLi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vLi4vQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vLi4vQ29udGVudFR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VBUEkudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VBUElGYWN0b3J5LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi8uLi9GdXNlQVBJUmVzcG9uc2UudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VDYWxsYmFja01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VDb250ZXh0LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi8uLi9GdXNlQ29udGV4dEJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VFcnJvci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vLi4vRnVzZUxvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vLi4vRnVzZUxvZ2dlckZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VMb2dnZXJMZXZlbC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vLi4vRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vLi4vRnVzZVBlcm1pc3Npb25SZXF1ZXN0LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi8uLi9GdXNlUGVybWlzc2lvblN0YXRlLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi8uLi9GdXNlUGx1Z2luLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi8uLi9GdXNlUmVzcG9uc2VSZWFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL0Z1c2VTZXJpYWxpemVyLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi8uLi9IVFRQRnVzZUFQSS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vLi4vUGxhdGZvcm0udHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL1BsYXRmb3JtUmVzb2x2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL1ZlcnNpb24udHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2FuZHJvaWQvQW5kcm9pZEZ1c2VMb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2FuZHJvaWQvQW5kcm9pZFNjaGVtZUZ1c2VBUEkudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2FwaS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vLi4vLi4vaW9zL0lPU0Z1c2VMb2dnZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2lvcy9JT1NTY2hlbWVGdXNlQVBJLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wbHVnaW5zL0Z1c2VSdW50aW1lLnRzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9tZDUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9uaWwuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvc2hhMS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3YxLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92MzUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3Y1LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92ZXJzaW9uLmpzIiwid2VicGFjazovLy8uLi9zcmMvRnVzZUxvY2F0aW9uQWNjdXJhY3kudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9GdXNlTG9jYXRpb25FdmVudFR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9GdXNlTG9jYXRpb25QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9GdXNlTG9jYXRpb25QbHVnaW5GYWN0b3J5LnRzIiwid2VicGFjazovLy8uLi9zcmMvRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uLnRzIiwid2VicGFjazovLy8uLi9zcmMvYW5kcm9pZC9BbmRyb2lkRnVzZUxvY2F0aW9uUGx1Z2luLnRzIiwid2VicGFjazovLy8uLi9zcmMvYXBpLnRzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2Lm1qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuLypcbkNvcHlyaWdodCAyMDIzIE5vcm1hbiBCcmVhdSBcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge0Z1c2VBUEl9IGZyb20gJy4vRnVzZUFQSSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vUGxhdGZvcm0nO1xuXG4vKipcbiAqIEFuIGZhY3RvcnkgY2xhc3MgdGhhdCBkZWZpbmVzIHRoZSBiYXNlIHNpZ25hdHVyZSBmb3IgY3JlYXRpbmcgYSBGdXNlQVBJIGJyaWRnZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICBwdWJsaWMgYWJzdHJhY3QgY3JlYXRlKHBsYXRmb3JtOiBQbGF0Zm9ybSk6IEZ1c2VBUEk7XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSUZ1c2VMb2dnZXIgfSBmcm9tIFwiLi9JRnVzZUxvZ2dlclwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHB1YmxpYyBhYnN0cmFjdCBjcmVhdGUoKTogSUZ1c2VMb2dnZXI7XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLyoqXG4gKiBTb21lIGNvbW1vbiBkYXRhIHR5cGVzXG4gKi9cbmV4cG9ydCBlbnVtIENvbnRlbnRUeXBlIHtcbiAgICBURVhUICAgICAgICAgICAgPSAndGV4dC9wbGFpbicsXG4gICAgSlNPTiAgICAgICAgICAgID0gJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIEpBVkFTQ1JJUFQgICAgICA9ICd0ZXh0L2phdmFzY3JpcHQnLCAvLyBSRkMgOTIzOVxuICAgIFdBU00gICAgICAgICAgICA9ICdhcHBsaWNhdGlvbi93YXNtJyxcbiAgICBCSU5BUlkgICAgICAgICAgPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJ1xufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IEZ1c2VBUElSZXNwb25zZSB9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmltcG9ydCB7IFRTZXJpYWxpemFibGUgfSBmcm9tICcuL1RTZXJpYWxpemFibGUnO1xuaW1wb3J0IHsgRnVzZVNlcmlhbGl6ZXIgfSBmcm9tICcuL0Z1c2VTZXJpYWxpemVyJztcbmltcG9ydCB7IEZ1c2VDYWxsYmFja01hbmFnZXIsIFRGdXNlQVBJQ2FsbGJhY2tIYW5kbGVyIH0gZnJvbSAnLi9GdXNlQ2FsbGJhY2tNYW5hZ2VyJztcblxuLyoqXG4gKiBUaGUgcHJpbWl0aXZlIGRhdGEgdHlwZXMgdGhhdCB0aGUgQVBJIHN1cHBvcnRzXG4gKi9cbi8vIGV4cG9ydCB0eXBlIFRGdXNlQVBJU3VwcG9ydGVkQXJnUHJpbWl0aXZlcyA9IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBCbG9iIHwgQXJyYXlCdWZmZXI7XG5cbi8qKlxuICogU3VwcG9ydGVkIGFyZ3VtZW50IHR5cGVzLCB3aGljaCBjYW4gYmUgYW55IG9mIFRGdXNlQVBJU3VwcG9ydGVkQXJnUHJpbWl0aXZlcywgb3IgYSByZWN1cnNpdmUgb2JqZWN0IG9yIGFycmF5IHN0cnVjdHVyZSBvZiBURnVzZUFQSVN1cHBvcnRlZEFyZ1ByaW1pdGl2ZXNcbiAqL1xuLy8gZXhwb3J0IHR5cGUgVEZ1c2VBUElBcmdzID0gVEZ1c2VBUElTdXBwb3J0ZWRBcmdQcmltaXRpdmVzIHwgUkFycmF5PFRGdXNlQVBJU3VwcG9ydGVkQXJnUHJpbWl0aXZlcyB8IFJPYmo8VEZ1c2VBUElTdXBwb3J0ZWRBcmdQcmltaXRpdmVzPj4gfCBST2JqPFRGdXNlQVBJU3VwcG9ydGVkQXJnUHJpbWl0aXZlcyB8IFJBcnJheTxURnVzZUFQSVN1cHBvcnRlZEFyZ1ByaW1pdGl2ZXM+Pjtcbi8vIGV4cG9ydCB0eXBlIFRGdXNlQVBJQXJncyA9IEJsb2I7XG5cbi8qKlxuICogR2VuZXJpYyBBUEkgcmVzcG9uc2UgZGF0YSB0eXBlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVEZ1c2VBUElSZXNwb25zZURhdGEge1xuICAgIGtlZXA6IGJvb2xlYW47XG4gICAgZGF0YT86IEJsb2I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZ1c2VBUElDYWxsUGFja2V0IHtcbiAgICByb3V0ZTogc3RyaW5nO1xuICAgIGNhbGxiYWNrSUQ6IHN0cmluZztcbiAgICBib2R5OiBCbG9iO1xuICAgIGNvbnRlbnRUeXBlOiBzdHJpbmc7XG59XG5cblxuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIHRoZSBGdXNlIEFQSSBicmlkZ2UgZm9yIGV4Y2hhbmdpbmcgZGF0YSB3aXRoIHRoZSBuYXRpdmUgcGxhdGZvcm1cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZ1c2VBUEkge1xuXG4gICAgcHJpdmF0ZSAkc2VyaWFsaXplcjogRnVzZVNlcmlhbGl6ZXI7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuJHNlcmlhbGl6ZXIgPSB0aGlzLl9jcmVhdGVTZXJpYWxpemVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVTZXJpYWxpemVyKCk6IEZ1c2VTZXJpYWxpemVyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdXNlU2VyaWFsaXplcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZXJpYWxpemVyKCk6IEZ1c2VTZXJpYWxpemVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNlcmlhbGl6ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdG8gaW1wbGVtZW50IGV4ZWN1dGUgbmF0aXZlIGJyaWRnZSBsb2dpY1xuICAgICAqIFxuICAgICAqIEBwYXJhbSBwbHVnaW5JRCBcbiAgICAgKiBAcGFyYW0gbWV0aG9kIFxuICAgICAqIEBwYXJhbSBhcmdzIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfZXhlY3V0ZShwbHVnaW5JRDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgY29udGVudFR5cGU6IHN0cmluZywgYXJnczogQmxvYik6IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPjtcblxuICAgIHByb3RlY3RlZCBfY3JlYXRlUm91dGUocGx1Z2luSUQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYC9hcGkvJHtwbHVnaW5JRH0ke21ldGhvZH1gO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBleGVjdXRlKHBsdWdpbklEOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBjb250ZW50VHlwZTogc3RyaW5nLCBhcmdzOiBUU2VyaWFsaXphYmxlKTogUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4ZWN1dGUocGx1Z2luSUQsIG1ldGhvZCwgY29udGVudFR5cGUsIHRoaXMuJHNlcmlhbGl6ZXIuc2VyaWFsaXplKGFyZ3MpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlQ2FsbGJhY2tDb250ZXh0KGNiOiBURnVzZUFQSUNhbGxiYWNrSGFuZGxlcik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBGdXNlQ2FsbGJhY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQ2FsbGJhY2soY2IpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWxlYXNlQ2FsbGJhY2soaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBGdXNlQ2FsbGJhY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZUNhbGxiYWNrKGlkKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gJy4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5pbXBvcnQgeyBGdXNlQVBJIH0gZnJvbSAnLi9GdXNlQVBJJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLi9QbGF0Zm9ybSc7XG5pbXBvcnQgeyBJT1NTY2hlbWVGdXNlQVBJIH0gZnJvbSBcIi4vaW9zL0lPU1NjaGVtZUZ1c2VBUElcIjtcbmltcG9ydCB7IEFuZHJvaWRTY2hlbWVGdXNlQVBJIH0gZnJvbSAnLi9hbmRyb2lkL0FuZHJvaWRTY2hlbWVGdXNlQVBJJztcblxuLyoqXG4gKiBBIEZ1c2VBUEkgZmFjdG9yeSB0aGF0IHVzZXMgdGhlIEhUVFAvYXBwIHNjaGVtZSBhcyB0aGUgYnJpZGdlLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZUFQSUZhY3RvcnkgZXh0ZW5kcyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICBcbiAgICBwcml2YXRlICRpb3NTY2hlbWU6IEZ1c2VBUEk7XG4gICAgcHJpdmF0ZSAkYW5kcm9pZFNjaGVtZTogRnVzZUFQSTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBSZWFsaXN0aWNhbGx5IHRoZXJlIHdpbGwgb25seSBiZSBvbmUgb3IgdGhlIG90aGVyIHNldC5cbiAgICAgICAgdGhpcy4kaW9zU2NoZW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy4kYW5kcm9pZFNjaGVtZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIG92ZXJyaWRlIGNyZWF0ZShwbGF0Zm9ybTogUGxhdGZvcm0pOiBGdXNlQVBJIHtcbiAgICAgICAgc3dpdGNoIChwbGF0Zm9ybSkge1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5JT1M6IHJldHVybiB0aGlzLl9jcmVhdGVpT1NBUEkoKTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uQU5EUk9JRDogcmV0dXJuIHRoaXMuX2NyZWF0ZUFuZHJvaWRBUEkoKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgcGxhdGZvcm06ICcgKyBwbGF0Zm9ybSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZWlPU0FQSSgpOiBGdXNlQVBJIHtcbiAgICAgICAgaWYgKCF0aGlzLiRpb3NTY2hlbWUpIHtcbiAgICAgICAgICAgIHRoaXMuJGlvc1NjaGVtZSA9IG5ldyBJT1NTY2hlbWVGdXNlQVBJKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJGlvc1NjaGVtZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2NyZWF0ZUFuZHJvaWRBUEkoKTogRnVzZUFQSSB7XG4gICAgICAgIGlmICghdGhpcy4kYW5kcm9pZFNjaGVtZSkge1xuICAgICAgICAgICAgdGhpcy4kYW5kcm9pZFNjaGVtZSA9IG5ldyBBbmRyb2lkU2NoZW1lRnVzZUFQSSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRhbmRyb2lkU2NoZW1lO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIE5vcm1hbiBCcmVhdSBcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBGdXNlUmVzcG9uc2VSZWFkZXIgfSBmcm9tIFwiLi9GdXNlUmVzcG9uc2VSZWFkZXJcIjtcbmltcG9ydCB7IEZ1c2VFcnJvciwgSUZ1c2VFcnJvclNlcmlhbGl6ZWQgfSBmcm9tICcuL0Z1c2VFcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBGdXNlQVBJUmVzcG9uc2Uge1xuICAgIHByaXZhdGUgJGNvbnRlbnQ6IEFycmF5QnVmZmVyO1xuICAgIHByaXZhdGUgJGhlYWRlcnM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgICBwcml2YXRlICRzdGF0dXM6IG51bWJlcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb250ZW50OiBBcnJheUJ1ZmZlciwgaGVhZGVyczogc3RyaW5nIHwgbnVsbCwgc3RhdHVzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy4kc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzLiRjb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy4kaGVhZGVycyA9IHRoaXMuJHBhcnNlSGVhZGVycyhoZWFkZXJzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNFcnJvcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHN0YXR1cyA+PSA0MDA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbnRlbnRMZW5ndGgoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGxlblN0cjogc3RyaW5nID0gdGhpcy4kaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpPy5bMF07XG4gICAgICAgIGxldCBsZW5ndGg6IG51bWJlciA9IHBhcnNlSW50KGxlblN0cik7XG4gICAgICAgIGlmIChpc05hTihsZW5ndGgpKSB7XG4gICAgICAgICAgICBsZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbnRlbnRUeXBlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRoZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk/LlswXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVhZEFzQXJyYXlCdWZmZXIoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29udGVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVhZEFzQmxvYigpOiBQcm9taXNlPEJsb2I+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFt0aGlzLiRjb250ZW50XSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlYWRBc1RleHQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNUZXh0KHRoaXMuJGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNKU09OPFQgPSB1bmtub3duPigpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNKU09OKHRoaXMuJGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZWFkQXNFcnJvcigpOiBQcm9taXNlPEZ1c2VFcnJvcj4ge1xuICAgICAgICBsZXQgc2VyaWFsaXplZEVycm9yOiBJRnVzZUVycm9yU2VyaWFsaXplZCA9IGF3YWl0IEZ1c2VSZXNwb25zZVJlYWRlci5yZWFkQXNKU09OKHRoaXMuJGNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gRnVzZUVycm9yLmZyb21TZXJpYWxpemVkKHNlcmlhbGl6ZWRFcnJvcik7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEhlYWRlcnMoKTogTWFwPHN0cmluZywgc3RyaW5nW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGhlYWRlcnM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEhlYWRlcihrZXk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGhlYWRlcnMuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSAkcGFyc2VIZWFkZXJzKGhlYWRlcnM6IHN0cmluZyB8IG51bGwpOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4ge1xuICAgICAgICBsZXQgbWFwOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4gPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxpbmVzOiBzdHJpbmdbXSA9IGhlYWRlcnMuc3BsaXQoJ1xcclxcbicpO1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsaW5lOiBzdHJpbmdbXSA9IGxpbmVzW2ldLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICBsZXQga2V5OiBzdHJpbmcgPSBsaW5lWzBdO1xuICAgICAgICAgICAgaWYgKCFtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICBtYXAuc2V0KGtleSwgW10pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaGVhZGVyVmFsdWU6IHN0cmluZ1tdID0gbWFwLmdldChrZXkpO1xuICAgICAgICAgICAgaGVhZGVyVmFsdWUucHVzaChsaW5lWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7XG4gICAgVE5hdGl2ZUNhbGxiYWNrRnVuY3Rpb25cbn0gZnJvbSAnLi9pbnRlcm5hbHMnO1xuaW1wb3J0ICogYXMgVVVJRCBmcm9tICd1dWlkJztcblxuZXhwb3J0IHR5cGUgVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIgPSAoZGF0YTogc3RyaW5nKSA9PiB2b2lkO1xuXG53aW5kb3cuX19uYnNmdXNlX2NhbGxiYWNrcyA9IG5ldyBNYXA8c3RyaW5nLCBUTmF0aXZlQ2FsbGJhY2tGdW5jdGlvbj4oKTtcblxud2luZG93Ll9fbmJzZnVzZV9kb0NhbGxiYWNrID0gZnVuY3Rpb24oY2FsbGJhY2tJRDogc3RyaW5nLCBkYXRhOiBzdHJpbmcpIHtcbiAgICBpZiAoY2FsbGJhY2tJRCAmJiB3aW5kb3cuX19uYnNmdXNlX2NhbGxiYWNrcy5oYXMoY2FsbGJhY2tJRCkpIHtcbiAgICAgICAgd2luZG93Ll9fbmJzZnVzZV9jYWxsYmFja3MuZ2V0KGNhbGxiYWNrSUQpKGRhdGEpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQSBzaW5nbGV0b24gbWFuYWdlciB0byBtYW5hZ2UgbmF0aXZlIGNhbGxiYWNrcy5cbiAqIFxuICogQ3JlYXRlIGEgY2FsbGJhY2sgY29udGV4dCBhbmQgcGFzcyB0aGUgcmV0dXJuIGNvbnRleHQgaWQgdG8gbmF0aXZlIGNsaWVudHMsXG4gKiBpbiB3aGljaCB0aGV5IGNhbiB1c2UgdG8gcmVzcG9uZCBiYWNrLlxuICogXG4gKiBOb3RlIHRoYXQgcGx1Z2luIEFQSXMgYXJlIGZhciBtb3JlIGVmZmljaWVudCBhbmQgY2FuIGhhbmRsZSBhIGRpdmVyc2Ugc2V0IG9mIGRhdGEsXG4gKiBpbmNsdWRpbmcgbGFyZ2UgcGF5bG9hZHMsIHNvIHdoZW4gcG9zc2libGUgaXQncyBiZXN0IHRvIHVzZSBhIHBsdWdpbiBBUEkgaW5zdGVhZCBvZiBhXG4gKiBjYWxsYmFjayBBUEkuXG4gKiBcbiAqIFRoaXMgY2FsbGJhY2sgQVBJIGlzIGhvd2V2ZXIsIHVzZWZ1bCBmb3IgYnVpbGRpbmcgbGlzdGVuZXIga2luZCBvZiBzZXJ2aWNlcyB3aGVyZSB0aGUgbmF0aXZlXG4gKiBuZWVkcyB0byBjb250aW5vdXNseSBjYWxsYmFjayB0byB0aGUgd2VidmlldyB3aXRoIHNtYWxsIGRhdGEgcGFja2V0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1c2VDYWxsYmFja01hbmFnZXIge1xuICAgIHByaXZhdGUgc3RhdGljICRpbnN0YW5jZTogRnVzZUNhbGxiYWNrTWFuYWdlcjtcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBGdXNlQ2FsbGJhY2tNYW5hZ2VyIHtcbiAgICAgICAgaWYgKCFGdXNlQ2FsbGJhY2tNYW5hZ2VyLiRpbnN0YW5jZSkge1xuICAgICAgICAgICAgRnVzZUNhbGxiYWNrTWFuYWdlci4kaW5zdGFuY2UgPSBuZXcgRnVzZUNhbGxiYWNrTWFuYWdlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEZ1c2VDYWxsYmFja01hbmFnZXIuJGluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDYWxsYmFjayhjYjogVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIpOiBzdHJpbmcge1xuICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IFVVSUQudjQoKTtcbiAgICAgICAgd2luZG93Ll9fbmJzZnVzZV9jYWxsYmFja3Muc2V0KGlkLCAoZGF0YTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBjYihkYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWxlYXNlQ2FsbGJhY2soaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuX19uYnNmdXNlX2NhbGxiYWNrcy5kZWxldGUoaWQpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIE5vcm1hbiBCcmVhdSBcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSAnLi9BYnN0cmFjdEZ1c2VBUElGYWN0b3J5JztcbmltcG9ydCB7IEZ1c2VBUElGYWN0b3J5IH0gZnJvbSAnLi9GdXNlQVBJRmFjdG9yeSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1BsYXRmb3JtXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybVJlc29sdmVyIH0gZnJvbSBcIi4vUGxhdGZvcm1SZXNvbHZlclwiO1xuaW1wb3J0IHtcbiAgICBGdXNlUnVudGltZSxcbiAgICBJUnVudGltZUluZm8sXG4gICAgVFBhdXNlQ2FsbGJhY2tIYW5kbGVyLFxuICAgIFRSZXN1bWVDYWxsYmFja0hhbmRsZXJcbn0gZnJvbSAnLi9wbHVnaW5zL0Z1c2VSdW50aW1lJztcbmltcG9ydCB7VmVyc2lvbn0gZnJvbSAnLi9WZXJzaW9uJztcbmltcG9ydCB7SUZ1c2VMb2dnZXJ9IGZyb20gJy4vSUZ1c2VMb2dnZXInO1xuaW1wb3J0IHtGdXNlTG9nZ2VyfSBmcm9tICcuL0Z1c2VMb2dnZXInO1xuaW1wb3J0IHsgRnVzZUxvZ2dlckZhY3RvcnkgfSBmcm9tICcuL0Z1c2VMb2dnZXJGYWN0b3J5JztcbmltcG9ydCB7IEFic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnkgfSBmcm9tICcuL0Fic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnknO1xuXG4vKipcbiAqIEEgY29udGV4dCBjbGFzcyB0aGF0IGhvbGRzIEZ1c2UgRnJhbWV3b3JrIHN0YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlQ29udGV4dCB7XG4gICAgcHJpdmF0ZSAkcGxhdGZvcm06IFBsYXRmb3JtO1xuICAgIHByaXZhdGUgJHJ1bnRpbWU6IEZ1c2VSdW50aW1lO1xuICAgIHByaXZhdGUgJHJ1bnRpbWVWZXJzaW9uOiBWZXJzaW9uO1xuICAgIHByaXZhdGUgJHJ1bnRpbWVJbmZvOiBJUnVudGltZUluZm87XG4gICAgcHJpdmF0ZSAkZGVmYXVsdEFQSUZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnk7XG4gICAgLy8gcHJpdmF0ZSAkZGVmYXVsdExvZ2dlcjogSUZ1c2VMb2dnZXI7XG4gICAgcHJpdmF0ZSAkbG9nZ2VyOiBJRnVzZUxvZ2dlcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgICBhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5LFxuICAgICAgICBsb2dnZXJGYWN0b3J5OiBBYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5XG4gICAgKSB7XG4gICAgICAgIC8vIGxldCBwcmVzb2x2ZXI6IFBsYXRmb3JtUmVzb2x2ZXIgPSB0aGlzLl9jcmVhdGVQbGF0Zm9ybVJlc29sdmVyKCk7XG4gICAgICAgIC8vIHRoaXMuJHBsYXRmb3JtID0gcHJlc29sdmVyLnJlc29sdmUoKTtcbiAgICAgICAgdGhpcy4kcGxhdGZvcm0gPSBwbGF0Zm9ybTtcblxuICAgICAgICAvLyBsZXQgbG9nZ2VyRmFjdG9yeTogRnVzZUxvZ2dlckZhY3RvcnkgPSBuZXcgRnVzZUxvZ2dlckZhY3RvcnkodGhpcy4kcGxhdGZvcm0pO1xuXG4gICAgICAgIHRoaXMuJGxvZ2dlciA9IGxvZ2dlckZhY3RvcnkuY3JlYXRlKCk7XG4gICAgICAgIC8vIHRoaXMuJGxvZ2dlciA9IHRoaXMuX2NyZWF0ZUxvZ2dlcigpO1xuICAgICAgICBcbiAgICAgICAgLy8gaWYgKCF0aGlzLiRsb2dnZXIpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuJGxvZ2dlciA9IHRoaXMuJGRlZmF1bHRMb2dnZXJcbiAgICAgICAgLy8gfVxuICAgICAgICBcbiAgICAgICAgdGhpcy4kcnVudGltZVZlcnNpb24gPSBudWxsO1xuICAgICAgICB0aGlzLiRkZWZhdWx0QVBJRmFjdG9yeSA9IGFwaUZhY3Rvcnk7XG4gICAgICAgIC8vIHRoaXMuJGRlZmF1bHRBUElGYWN0b3J5ID0gdGhpcy5fY3JlYXRlRnVzZUFQSUZhY3RvcnkoKTtcbiAgICAgICAgdGhpcy4kcnVudGltZSA9IG5ldyBGdXNlUnVudGltZSh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBwcm90ZWN0ZWQgX2NyZWF0ZUxvZ2dlcigpOiBJRnVzZUxvZ2dlciB8IG51bGwge1xuICAgIC8vICAgICByZXR1cm4gbnVsbFxuICAgIC8vIH1cblxuICAgIC8vIHB1YmxpYyBzZXRMb2dnZXIobG9nZ2VyOiBJRnVzZUxvZ2dlciB8IG51bGwpOiB2b2lkIHtcbiAgICAvLyAgICAgaWYgKCFsb2dnZXIpIHtcbiAgICAvLyAgICAgICAgIGxvZ2dlciA9IHRoaXMuJGRlZmF1bHRMb2dnZXI7XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICB0aGlzLiRsb2dnZXIgPSBsb2dnZXI7XG4gICAgLy8gfVxuXG4gICAgcHVibGljIGdldExvZ2dlcigpOiBJRnVzZUxvZ2dlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRsb2dnZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERlZmF1bHRBUElGYWN0b3J5KCk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZGVmYXVsdEFQSUZhY3Rvcnk7XG4gICAgfVxuXG4gICAgLy8gcHJvdGVjdGVkIF9jcmVhdGVGdXNlQVBJRmFjdG9yeSgpOiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IHtcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBGdXNlQVBJRmFjdG9yeSgpO1xuICAgIC8vIH1cblxuICAgIC8vIHByb3RlY3RlZCBfY3JlYXRlUGxhdGZvcm1SZXNvbHZlcigpOiBQbGF0Zm9ybVJlc29sdmVyIHtcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBQbGF0Zm9ybVJlc29sdmVyKCk7XG4gICAgLy8gfVxuXG4gICAgcHVibGljIGdldFBsYXRmb3JtKCk6IFBsYXRmb3JtIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHBsYXRmb3JtO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgJGdldFJ1bnRpbWVJbmZvKCk6IFByb21pc2U8SVJ1bnRpbWVJbmZvPiB7XG4gICAgICAgIGlmICghdGhpcy4kcnVudGltZUluZm8pIHtcbiAgICAgICAgICAgIHRoaXMuJHJ1bnRpbWVJbmZvID0gYXdhaXQgdGhpcy4kcnVudGltZS5nZXRJbmZvKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy4kcnVudGltZUluZm87XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGdldFBsYXRmb3JtVmVyc2lvbigpOiBQcm9taXNlPFZlcnNpb24+IHtcbiAgICAgICAgaWYgKCF0aGlzLiRydW50aW1lVmVyc2lvbikge1xuICAgICAgICAgICAgbGV0IGluZm86IElSdW50aW1lSW5mbyA9IGF3YWl0IHRoaXMuJGdldFJ1bnRpbWVJbmZvKCk7XG4gICAgICAgICAgICB0aGlzLiRydW50aW1lVmVyc2lvbiA9IFZlcnNpb24ucGFyc2VWZXJzaW9uU3RyaW5nKGluZm8udmVyc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLiRydW50aW1lVmVyc2lvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgaXNEZWJ1Z01vZGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGxldCBpbmZvOiBJUnVudGltZUluZm8gPSBhd2FpdCB0aGlzLiRnZXRSdW50aW1lSW5mbygpO1xuICAgICAgICByZXR1cm4gaW5mby5kZWJ1Z01vZGU7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNhbGxiYWNrOiBUUGF1c2VDYWxsYmFja0hhbmRsZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy4kcnVudGltZS5yZWdpc3RlclBhdXNlSGFuZGxlcihjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHVucmVnaXN0ZXJQYXVzZUhhbmRsZXIoY2FsbGJhY2tJRDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLiRydW50aW1lLnVucmVnaXN0ZXJQYXVzZUhhbmRsZXIoY2FsbGJhY2tJRCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFjazogVFJlc3VtZUNhbGxiYWNrSGFuZGxlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLiRydW50aW1lLnJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHVucmVnaXN0ZXJSZXN1bWVIYW5kbGVyKGNhbGxiYWNrSUQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy4kcnVudGltZS51bnJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYWxsYmFja0lEKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB9IGZyb20gXCIuL0Fic3RyYWN0RnVzZUFQSUZhY3RvcnlcIjtcbmltcG9ydCB7IEFic3RyYWN0RnVzZUxvZ2dlckZhY3RvcnkgfSBmcm9tIFwiLi9BYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5XCI7XG5pbXBvcnQgeyBGdXNlQVBJRmFjdG9yeSB9IGZyb20gXCIuL0Z1c2VBUElGYWN0b3J5XCI7XG5pbXBvcnQgeyBGdXNlQ29udGV4dCB9IGZyb20gXCIuL0Z1c2VDb250ZXh0XCI7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyRmFjdG9yeSB9IGZyb20gXCIuL0Z1c2VMb2dnZXJGYWN0b3J5XCI7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyTGV2ZWwgfSBmcm9tIFwiLi9GdXNlTG9nZ2VyTGV2ZWxcIjtcbmltcG9ydCB7IElGdXNlTG9nZ2VyIH0gZnJvbSBcIi4vSUZ1c2VMb2dnZXJcIjtcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIi4vUGxhdGZvcm1cIjtcbmltcG9ydCB7IFBsYXRmb3JtUmVzb2x2ZXIgfSBmcm9tIFwiLi9QbGF0Zm9ybVJlc29sdmVyXCI7XG5cbmV4cG9ydCBjbGFzcyBGdXNlQ29udGV4dEJ1aWxkZXIge1xuICAgIHByaXZhdGUgJHBsYXRmb3JtUmVzb2x2ZXI6IFBsYXRmb3JtUmVzb2x2ZXI7XG4gICAgcHJpdmF0ZSAkbG9nZ2VyRmFjdG9yeTogQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSB8IG51bGw7XG4gICAgcHJpdmF0ZSAkYXBpRmFjdG9yeTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB8IG51bGw7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuJGxvZ2dlckZhY3RvcnkgPSBudWxsO1xuICAgICAgICB0aGlzLiRhcGlGYWN0b3J5ID0gbnVsbDtcbiAgICAgICAgdGhpcy4kcGxhdGZvcm1SZXNvbHZlciA9IG5ldyBQbGF0Zm9ybVJlc29sdmVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFBsYXRmb3JtUmVzb2x2ZXIocmVzb2x2ZXI6IFBsYXRmb3JtUmVzb2x2ZXIpOiBGdXNlQ29udGV4dEJ1aWxkZXIge1xuICAgICAgICB0aGlzLiRwbGF0Zm9ybVJlc29sdmVyID0gcmVzb2x2ZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBUElGYWN0b3J5KGZhY3Rvcnk6IEFic3RyYWN0RnVzZUFQSUZhY3RvcnkpOiBGdXNlQ29udGV4dEJ1aWxkZXIge1xuICAgICAgICB0aGlzLiRhcGlGYWN0b3J5ID0gZmFjdG9yeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldExvZ2dlckZhY3RvcnkoZmFjdG9yeTogQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeSk6IEZ1c2VDb250ZXh0QnVpbGRlciB7XG4gICAgICAgIHRoaXMuJGxvZ2dlckZhY3RvcnkgPSBmYWN0b3J5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXN5bmMgX2lzRGVidWdNb2RlKGNvbnRleHQ6IEZ1c2VDb250ZXh0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCBjb250ZXh0LmlzRGVidWdNb2RlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGJ1aWxkKCk6IFByb21pc2U8RnVzZUNvbnRleHQ+IHtcbiAgICAgICAgbGV0IHBsYXRmb3JtOiBQbGF0Zm9ybSA9IHRoaXMuJHBsYXRmb3JtUmVzb2x2ZXIucmVzb2x2ZSgpO1xuXG4gICAgICAgIGxldCBhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5O1xuICAgICAgICBpZiAodGhpcy4kYXBpRmFjdG9yeSkge1xuICAgICAgICAgICAgYXBpRmFjdG9yeSA9IHRoaXMuJGFwaUZhY3Rvcnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhcGlGYWN0b3J5ID0gbmV3IEZ1c2VBUElGYWN0b3J5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9nZ2VyRmFjdG9yeTogQWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeTtcbiAgICAgICAgaWYgKHRoaXMuJGxvZ2dlckZhY3RvcnkpIHtcbiAgICAgICAgICAgIGxvZ2dlckZhY3RvcnkgPSB0aGlzLiRsb2dnZXJGYWN0b3J5XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dnZXJGYWN0b3J5ID0gbmV3IEZ1c2VMb2dnZXJGYWN0b3J5KHBsYXRmb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb250ZXh0OiBGdXNlQ29udGV4dCA9IG5ldyBGdXNlQ29udGV4dChwbGF0Zm9ybSwgYXBpRmFjdG9yeSwgbG9nZ2VyRmFjdG9yeSk7XG5cbiAgICAgICAgbGV0IGlzRGVidWdNb2RlOiBib29sZWFuID0gYXdhaXQgdGhpcy5faXNEZWJ1Z01vZGUoY29udGV4dCk7XG4gICAgICAgIGxldCBsb2dnZXI6IElGdXNlTG9nZ2VyID0gY29udGV4dC5nZXRMb2dnZXIoKTtcbiAgICAgICAgbG9nZ2VyLmVuYWJsZU5hdGl2ZUJyaWRnZShpc0RlYnVnTW9kZSk7XG4gICAgICAgIGxldCBsZXZlbDogRnVzZUxvZ2dlckxldmVsID0gbG9nZ2VyLmdldExldmVsKCk7XG4gICAgICAgIGxldmVsIHw9IEZ1c2VMb2dnZXJMZXZlbC5ERUJVRztcbiAgICAgICAgbG9nZ2VyLnNldExldmVsKGxldmVsKTtcblxuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgRnVzZVNlcmlhbGl6ZXIgfSBmcm9tIFwiLi9GdXNlU2VyaWFsaXplclwiO1xuaW1wb3J0IHsgSVNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL0lTZXJpYWxpemFibGVcIjtcbmltcG9ydCB7IFRGdXNlU2VyaWFsaXphYmxlLCBUU2VyaWFsaXphYmxlIH0gZnJvbSBcIi4vVFNlcmlhbGl6YWJsZVwiO1xuXG5leHBvcnQgdHlwZSBURnVzZUVycm9yQ2F1c2UgPSBzdHJpbmcgfCBFcnJvciB8IEZ1c2VFcnJvciB8IG51bGw7XG5cbmludGVyZmFjZSBfSUZ1c2VFcnJvclNlcmlhbGl6ZWQge1xuICAgIGRvbWFpbjogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgc3RhY2s/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElGdXNlRXJyb3JTZXJpYWxpemVkID0gVEZ1c2VTZXJpYWxpemFibGU8X0lGdXNlRXJyb3JTZXJpYWxpemVkPjtcblxuZXhwb3J0IGNsYXNzIEZ1c2VFcnJvciBleHRlbmRzIEVycm9yIGltcGxlbWVudHMgSVNlcmlhbGl6YWJsZSB7XG4gICAgcHJpdmF0ZSAkZG9tYWluOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSAkbWVzc2FnZTogc3RyaW5nO1xuICAgIHByaXZhdGUgJGNhdXNlOiBURnVzZUVycm9yQ2F1c2U7XG4gICAgcHJpdmF0ZSAkY29kZTogbnVtYmVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGRvbWFpbjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGNhdXNlPzogVEZ1c2VFcnJvckNhdXNlLCBjb2RlPzogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIHRoaXMuJGRvbWFpbiA9IGRvbWFpbjtcbiAgICAgICAgdGhpcy4kbWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuJGNvZGUgPSBjb2RlIHx8IDA7XG4gICAgICAgIHRoaXMuJGNhdXNlID0gY2F1c2UgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWVzc2FnZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy4kbWVzc2FnZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RG9tYWluKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRkb21haW47XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvZGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENhdXNlKCk6IFRGdXNlRXJyb3JDYXVzZSB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy4kY2F1c2U7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzZXJpYWxpemUoKTogSUZ1c2VFcnJvclNlcmlhbGl6ZWQge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZG9tYWluOiB0aGlzLmdldERvbWFpbigpLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5nZXRNZXNzYWdlKCksXG4gICAgICAgICAgICBjb2RlOiB0aGlzLmdldENvZGUoKSxcbiAgICAgICAgICAgIHN0YWNrOiB0aGlzLnN0YWNrXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB3cmFwKGVycm9yOiBzdHJpbmcgfCBFcnJvciB8IEZ1c2VFcnJvciB8IElGdXNlRXJyb3JTZXJpYWxpemVkIHwgdW5rbm93bik6IEZ1c2VFcnJvciB7XG4gICAgICAgIGxldCBmZXJyOiBGdXNlRXJyb3IgPSBudWxsO1xuICAgICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZmVyciA9IG5ldyBGdXNlRXJyb3IoJ1Vua25vd24nLCBlcnJvciwgbnVsbCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXJyb3IgaW5zdGFuY2VvZiBGdXNlRXJyb3IpIHtcbiAgICAgICAgICAgIGZlcnIgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBmZXJyID0gbmV3IEZ1c2VFcnJvcihlcnJvci5uYW1lLCBlcnJvci5tZXNzYWdlLCBlcnJvciwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoRnVzZUVycm9yLiRpc1NlcmlhbGl6ZWRGdXNlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICBmZXJyID0gRnVzZUVycm9yLmZyb21TZXJpYWxpemVkKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Vud3JhcHBhYmxlIEVycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgZmVyciA9IG5ldyBGdXNlRXJyb3IoJ0Z1c2VFcnJvcicsICdVbndyYXBwYWJsZSBlcnJvcicsIG51bGwsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZlcnI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmcm9tU2VyaWFsaXplZChlcnJvcjogSUZ1c2VFcnJvclNlcmlhbGl6ZWQpOiBGdXNlRXJyb3Ige1xuICAgICAgICByZXR1cm4gbmV3IEZ1c2VFcnJvcihlcnJvci5kb21haW4sIGVycm9yLm1lc3NhZ2UsIG51bGwsIGVycm9yLmNvZGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuICdGdXNlRXJyb3InO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljICRpc1NlcmlhbGl6ZWRGdXNlRXJyb3IoZXJyb3I6IGFueSk6IGVycm9yIGlzIElGdXNlRXJyb3JTZXJpYWxpemVkIHtcbiAgICAgICAgcmV0dXJuICdtZXNzYWdlJyBpbiBlcnJvciAmJiAnZG9tYWluJyBpbiBlcnJvciAmJiAnY29kZScgaW4gZXJyb3I7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7XG4gICAgSUZ1c2VMb2dnZXIsIElOYXRpdmVMb2dFbnRyeVxufSBmcm9tICcuL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7VFNlcmlhbGl6YWJsZX0gZnJvbSAnLi9UU2VyaWFsaXphYmxlJztcbmltcG9ydCB7SVNlcmlhbGl6YWJsZX0gZnJvbSAnLi9JU2VyaWFsaXphYmxlJztcbmltcG9ydCB7IEZ1c2VMb2dnZXJMZXZlbCB9IGZyb20gJy4vRnVzZUxvZ2dlckxldmVsJztcblxuZXhwb3J0IGNsYXNzIEZ1c2VMb2dnZXJTZXJpYWxpemVyIHtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVUb1N0cmluZyhvYmo6IFRTZXJpYWxpemFibGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplUHJpbWl0aXZlVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplRGF0ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNJU2VyaWFsaXphYmxlKG9iaikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVUb1N0cmluZyhvYmouc2VyaWFsaXplKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplRXJyb3JUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2hlbiBhbGwgZWxzZSBmYWlscywgYXR0ZW1wdCB0byBKU09OIHN0cmluZ2lmeVxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCA0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZVByaW1pdGl2ZVRvU3RyaW5nKG9iajogbnVtYmVyIHwgc3RyaW5nIHwgYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZUVycm9yVG9TdHJpbmcob2JqOiBFcnJvcik6IHN0cmluZyB7XG4gICAgICAgIGxldCBzZXJpYWxpemVkRXJyb3IgPSB7XG4gICAgICAgICAgICBuYW1lOiBvYmoubmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG9iai5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhY2s6IG9iai5zdGFja1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShzZXJpYWxpemVkRXJyb3IsIG51bGwsIDQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplRGF0ZVRvU3RyaW5nKG9iajogRGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBvYmoudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VyaWFsaXplKG9iajogVFNlcmlhbGl6YWJsZSk6IHN0cmluZyB7XG4gICAgICAgIGlmIChvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG91dDogc3RyaW5nID0gbnVsbDtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgIG91dCA9IGBbQmxvYiAke29iai50eXBlIHx8ICdCaW5hcnknfSAoJHtvYmouc2l6ZX0gYnl0ZXMpXWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIG91dCA9IHRoaXMuX3NlcmlhbGl6ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIG91dCA9IGBbQXJyYXlCdWZmZXIgKCR7b2JqLmJ5dGVMZW5ndGh9IGJ5dGVzKV1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzSVNlcmlhbGl6YWJsZShvYmopKSB7XG4gICAgICAgICAgICBvdXQgPSB0aGlzLnNlcmlhbGl6ZShvYmouc2VyaWFsaXplKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGVpdGhlciBKU09OIG9iamVjdHMgb3IganNvbiBhcnJheXMgYXQgdGhpcyBwb2ludFxuICAgICAgICAgICAgb3V0ID0gdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9pc0lTZXJpYWxpemFibGUoeDogYW55KTogeCBpcyBJU2VyaWFsaXphYmxlIHtcbiAgICAgICAgcmV0dXJuICEheC5zZXJpYWxpemUgJiYgdHlwZW9mIHguc2VyaWFsaXplID09PSAnZnVuY3Rpb24nO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBIGJhc2UgbG9nZ2VyIGltcGxlbWVudGF0aW9uIHdoaWNoIGluY2x1ZGVzIGEgc2VyaWFsaXplciBmb3IgY29tbW9uIHR5cGVzLlxuICogSXQgd2lsbCBzZXJpYWxpemUvYWNjZXB0IGFsbCB2YWx1ZXMgdGhhdCBUU2VyaWFsaXphYmxlIGFjY2VwdHMsIGhvd2V2ZXIgQmxvYi9BcnJheUJ1ZmZlclxuICogb3Igb3RoZXIgYmluYXJ5IGRhdGEgdHlwZXMgd2lsbCBub3QgYmUgc2VyaWFsaXplZC4gSW5zdGVhZCBpdCB3aWxsIHByaW50IGFuXG4gKiBvYmplY3QgaWRlbnRpZmllciwgd2l0aCBtaW1lIHR5cGUgaWYgcHJlc2VudCwgYWxvbmcgd2l0aCB0aGUgc2l6ZSBvZiB0aGUgYnVmZmVyLlxuICogXG4gKiBUaGUgYmFzZSBsb2dnZXIgZG9lcyBub3QgcHJvdmlkZSBhbnkgbmF0aXZlIGJyaWRnaW5nLiBXaGlsZSB1c2FibGUgZm9yIHB1cmVseSB3ZWJ2aWV3IHNpZGUsXG4gKiB1c2UgdGhlIEZ1c2VMb2dnZXJGYWN0b3J5IHRvIGdldCBhIGxvZ2dlciBzcGVjaWZpYyBmb3IgeW91ciBydW50aW1lIGVudmlyb25tZW50LlxuICovXG5leHBvcnQgY2xhc3MgRnVzZUxvZ2dlciBpbXBsZW1lbnRzIElGdXNlTG9nZ2VyIHtcbiAgICBwcml2YXRlICRsZXZlbDogRnVzZUxvZ2dlckxldmVsO1xuICAgIHByaXZhdGUgJGVuYWJsZU5hdGl2ZUJyaWRnZTogYm9vbGVhbjtcbiAgICBwcml2YXRlICRzZXJpYWxpemVyOiBGdXNlTG9nZ2VyU2VyaWFsaXplcjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy4kZW5hYmxlTmF0aXZlQnJpZGdlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kbGV2ZWwgPSBGdXNlTG9nZ2VyTGV2ZWwuSU5GTyB8IEZ1c2VMb2dnZXJMZXZlbC5XQVJOIHwgRnVzZUxvZ2dlckxldmVsLkVSUk9SO1xuICAgICAgICB0aGlzLiRzZXJpYWxpemVyID0gbmV3IEZ1c2VMb2dnZXJTZXJpYWxpemVyKCk7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyTmF0aXZlQ2FsYmxhY2soKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3JlZ2lzdGVyTmF0aXZlQ2FsYmxhY2soKTogdm9pZCB7fVxuXG4gICAgcHVibGljIHNldExldmVsKGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kbGV2ZWwgPSBsZXZlbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGV2ZWwoKTogRnVzZUxvZ2dlckxldmVsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGxldmVsO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGVOYXRpdmVCcmlkZ2UoZmxhZzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLiRlbmFibGVOYXRpdmVCcmlkZ2UgPSAhIWZsYWc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vbk5hdGl2ZUxvZ0VudHJ5KGVudHJ5OiBJTmF0aXZlTG9nRW50cnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy5nZXRMZXZlbCgpICYgZW50cnkubGV2ZWwpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkubGV2ZWwgPT09IEZ1c2VMb2dnZXJMZXZlbC5TSUxFTlQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZW50cnkubGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgRnVzZUxvZ2dlckxldmVsLkRFQlVHOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoZW50cnkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZ1c2VMb2dnZXJMZXZlbC5JTkZPOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhlbnRyeS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRnVzZUxvZ2dlckxldmVsLldBUk46XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVudHJ5Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBGdXNlTG9nZ2VyTGV2ZWwuRVJST1I6XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlbnRyeS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBsZXZlbCBUaGUgbG9nIGxldmVsIGZvciB0aGlzIGxvZyBwcmludFxuICAgICAqIEBwYXJhbSBtZXNzYWdlIE92ZXJyaWRhYmxlIGhvb2sgdG8gc2VuZCBsb2dzIHRvIHRoZSBuYXRpdmUgZW52aXJvbm1lbnRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2xvZ1RvTmF0aXZlKGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge31cblxuICAgIHByaXZhdGUgJGxvZ1RvTmF0aXZlKGxldmVsOiBGdXNlTG9nZ2VyTGV2ZWwsIGFyZ3M6IFRTZXJpYWxpemFibGVbXSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuJGVuYWJsZU5hdGl2ZUJyaWRnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlcmlhbGl6ZWRBcmdzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzZXJpYWxpemVkQXJncy5wdXNoKHRoaXMuJHNlcmlhbGl6ZXIuc2VyaWFsaXplKGFyZ3NbaV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xvZ1RvTmF0aXZlKGxldmVsLCBzZXJpYWxpemVkQXJncy5qb2luKCdcXHQnKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlYnVnKC4uLmFyZ3M6IFRTZXJpYWxpemFibGVbXSk6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLiRsZXZlbCAmIEZ1c2VMb2dnZXJMZXZlbC5ERUJVRykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUuZGVidWcoLi4uYXJncyk7XG4gICAgICAgIHRoaXMuJGxvZ1RvTmF0aXZlKEZ1c2VMb2dnZXJMZXZlbC5ERUJVRywgYXJncyk7XG4gICAgfVxuXG4gICAgcHVibGljIGluZm8oLi4uYXJnczogVFNlcmlhbGl6YWJsZVtdKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMuJGxldmVsICYgRnVzZUxvZ2dlckxldmVsLklORk8pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmluZm8oLi4uYXJncyk7XG4gICAgICAgIHRoaXMuJGxvZ1RvTmF0aXZlKEZ1c2VMb2dnZXJMZXZlbC5JTkZPLCBhcmdzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FybiguLi5hcmdzOiBUU2VyaWFsaXphYmxlW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy4kbGV2ZWwgJiBGdXNlTG9nZ2VyTGV2ZWwuV0FSTikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUud2FybiguLi5hcmdzKTtcbiAgICAgICAgdGhpcy4kbG9nVG9OYXRpdmUoRnVzZUxvZ2dlckxldmVsLldBUk4sIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlcnJvciguLi5hcmdzOiBUU2VyaWFsaXphYmxlW10pOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy4kbGV2ZWwgJiBGdXNlTG9nZ2VyTGV2ZWwuRVJST1IpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmVycm9yKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLiRsb2dUb05hdGl2ZShGdXNlTG9nZ2VyTGV2ZWwuRVJST1IsIGFyZ3MpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIE5vcm1hbiBCcmVhdSBcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBGdXNlTG9nZ2VyIH0gZnJvbSBcIi4vRnVzZUxvZ2dlclwiO1xuaW1wb3J0IHsgSUZ1c2VMb2dnZXIgfSBmcm9tIFwiLi9JRnVzZUxvZ2dlclwiO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9QbGF0Zm9ybVwiO1xuaW1wb3J0IHtJT1NGdXNlTG9nZ2VyfSBmcm9tICcuL2lvcy9JT1NGdXNlTG9nZ2VyJztcbmltcG9ydCB7QW5kcm9pZEZ1c2VMb2dnZXJ9IGZyb20gJy4vYW5kcm9pZC9BbmRyb2lkRnVzZUxvZ2dlcic7XG5cbmV4cG9ydCBjbGFzcyBGdXNlTG9nZ2VyRmFjdG9yeSB7XG4gICAgcHJpdmF0ZSAkcGxhdGZvcm06IFBsYXRmb3JtO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICAgICAgICB0aGlzLiRwbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGUoKTogSUZ1c2VMb2dnZXIge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuJHBsYXRmb3JtKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLklPUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IElPU0Z1c2VMb2dnZXIoKTtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uQU5EUk9JRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFuZHJvaWRGdXNlTG9nZ2VyKCk7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtLlRFU1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGdXNlTG9nZ2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuZXhwb3J0IGVudW0gRnVzZUxvZ2dlckxldmVsIHtcbiAgICBTSUxFTlQgID0gMCxcbiAgICBERUJVRyAgID0gMSxcbiAgICBJTkZPICAgID0gMixcbiAgICBXQVJOICAgID0gNCxcbiAgICBFUlJPUiAgID0gOFxufVxuIiwiXG5cbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtJRnVzZUdyYW50UmVzdWx0fSBmcm9tICcuL0lGdXNlR3JhbnRSZXN1bHQnO1xuaW1wb3J0IHtGdXNlUGVybWlzc2lvblN0YXRlfSBmcm9tICcuL0Z1c2VQZXJtaXNzaW9uU3RhdGUnO1xuXG5leHBvcnQgY2xhc3MgRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbiBleHRlbmRzIG51bWJlciA9IG51bWJlcj4ge1xuICAgIHByaXZhdGUgJHJlc3VsdHM6IElGdXNlR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24+O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHJlc3VsdHM6IElGdXNlR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24+KSB7XG4gICAgICAgIHRoaXMuJHJlc3VsdHMgPSByZXN1bHRzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0dyYW50ZWQocGVybWlzc2lvbjogVFN1cHBvcnRlZFBlcm1pc3Npb24pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlc3VsdHNbcGVybWlzc2lvbl0gPT09IEZ1c2VQZXJtaXNzaW9uU3RhdGUuR1JBTlRFRDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNBbGxHcmFudGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuJHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiRyZXN1bHRzW2ldICE9PSBGdXNlUGVybWlzc2lvblN0YXRlLkdSQU5URUQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVqZWN0SnVzdGlmaWNhdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy4kcmVzdWx0cykge1xuICAgICAgICAgICAgaWYgKHRoaXMuJHJlc3VsdHNbaV0gPT09IEZ1c2VQZXJtaXNzaW9uU3RhdGUuUkVRVUlSRVNfSlVTVElGSUNBVElPTikge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlc3VsdHNbaV0gPSBGdXNlUGVybWlzc2lvblN0YXRlLkRFTklFRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG91bGRKdXN0aWZ5KCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuJHJlc3VsdHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiRyZXN1bHRzW2ldID09PSBGdXNlUGVybWlzc2lvblN0YXRlLlJFUVVJUkVTX0pVU1RJRklDQVRJT04pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQ29udGVudFR5cGUgfSBmcm9tICcuL0NvbnRlbnRUeXBlJztcbmltcG9ydCB7IEZ1c2VBUElSZXNwb25zZSB9IGZyb20gJy4vRnVzZUFQSVJlc3BvbnNlJztcbmltcG9ydCB7IEZ1c2VFcnJvciB9IGZyb20gJy4vRnVzZUVycm9yJztcbmltcG9ydCB7VEFQSUJyaWRnZUZ1bmN0aW9ufSBmcm9tICcuL0Z1c2VQbHVnaW4nO1xuaW1wb3J0IHtJRnVzZVBlcm1pc3Npb25SZXF1ZXN0fSBmcm9tICcuL0lGdXNlUGVybWlzc2lvblJlcXVlc3QnO1xuaW1wb3J0IHsgVEZ1c2VTZXJpYWxpemFibGUgfSBmcm9tICcuL1RTZXJpYWxpemFibGUnO1xuaW1wb3J0IHtGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0fSBmcm9tICcuL0Z1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQnO1xuXG4vKipcbiAqIEludm9rZWQgdG8gaGFuZGxlIHdoZW4gcGVybWlzc2lvbiBqdXN0aWZpY2F0aW9uIGlzIG5lY2Vzc2FyeS5cbiAqIFxuICogVGhpcyBpcyBhbiBhbmRyb2lkIGNvbmNlcHQsIHNvIGl0IHdpbGwgb25seSBiZSBpbnZva2VkIG9uIEFuZHJvaWQgZGV2aWNlcyxcbiAqIGFzIGlPUyBoYXMganVzdGlmaWNhdGlvbiB0ZXh0IGVtYmVkZGVkIGludG8gdGhlIGFjdHVhbCBwZXJtaXNzaW9uIHByb21wdC5cbiAqIFxuICogVXNlciBkaWFsb2cgc2hvdWxkIGJlIGRpc3BsYXllZCB0byBleHBsYWluIHdoeSB0aGUgYXBwIHdhbnRzIHRvIHVzZSB0aGUgcGVybWlzc2lvbi5cbiAqIEFuZHJvaWQgcmVjb21tZW5kcyBnaXZpbmcgdGhlIHVzZXIgdGhlIGFiaWxpdHkgdG8gYWNjZXB0IG9yIGRlbnkgYXQgdGhpcyB0aW1lLCBpZiB0aGUgdXNlciBkZW55LFxuICogdGhlbiByZXNvbHZlIHRoZSBwcm9taXNlIHdpbGwgZmFsc2UuXG4gKiBcbiAqIFJldHVybiB0cnVlIGlmIHRoZSBwZXJtaXNzaW9uIHJlcXVlc3Qgc2hvdWxkIHByb2NlZWQuXG4gKi9cbmV4cG9ydCB0eXBlIFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIgPSAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuXG5pbnRlcmZhY2UgX19JUGVybWlzc2lvblJlcXVlc3RBcmd1bWVudHM8VCBleHRlbmRzIG51bWJlcj4ge1xuICAgIHBlcm1pc3Npb25TZXQ6IFRbXTtcbiAgICBpc0p1c3RpZmllZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgVEZ1c2VQZXJtaXNzaW9uUmVxdWVzdEFyZ3VtZW50czxUIGV4dGVuZHMgbnVtYmVyPiA9IFRGdXNlU2VyaWFsaXphYmxlPF9fSVBlcm1pc3Npb25SZXF1ZXN0QXJndW1lbnRzPFQ+PjtcblxuZXhwb3J0IHR5cGUgVEZ1c2VBUElQZXJtaXNzaW9uUmVxdWVzdDxUIGV4dGVuZHMgbnVtYmVyID0gbnVtYmVyPiA9IFRBUElCcmlkZ2VGdW5jdGlvbjxDb250ZW50VHlwZS5KU09OLCBURnVzZVBlcm1pc3Npb25SZXF1ZXN0QXJndW1lbnRzPFQ+PjtcblxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIHRvIGhhbmRsZSBwZXJtaXNzaW9uIHJlcXVlc3QuXG4gKiBDb25jcmV0ZSBjbGFzc2VzIHNob3VsZCBpbXBsZW1lbnQgdGhlIHByb3RlY3RlZCBfcmVxdWVzdCBtZXRob2QgdG8gY2FsbCBvbiB0aGVpclxuICogcGVybWlzc2lvbiByZXF1ZXN0IEZ1c2UgQVBJLlxuICovXG5leHBvcnQgY2xhc3MgRnVzZVBlcm1pc3Npb25SZXF1ZXN0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uIGV4dGVuZHMgbnVtYmVyPiBpbXBsZW1lbnRzIElGdXNlUGVybWlzc2lvblJlcXVlc3Q8VFN1cHBvcnRlZFBlcm1pc3Npb24+IHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBUQUc6IHN0cmluZyA9ICdQZXJtaXNzaW9uUmVxdWVzdCc7XG5cbiAgICBwcml2YXRlICRhcGk6IFRGdXNlQVBJUGVybWlzc2lvblJlcXVlc3Q8VFN1cHBvcnRlZFBlcm1pc3Npb24+O1xuICAgIHByaXZhdGUgJHBlcm1pc3Npb25TZXQ6IFRTdXBwb3J0ZWRQZXJtaXNzaW9uW107XG4gICAgcHJpdmF0ZSAkanVzdGlmaWNhdGlvbkhhbmRsZXI6IFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIgfCBudWxsO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGFwaUJyaWRnZTogVEZ1c2VBUElQZXJtaXNzaW9uUmVxdWVzdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4sIHBlcm1pc3Npb25TZXQ6IFRTdXBwb3J0ZWRQZXJtaXNzaW9uW10sIGp1c3RpZmljYXRpb25IYW5kbGVyOiBURnVzZUp1c3RpZmljYXRpb25IYW5kbGVyID0gbnVsbCkge1xuICAgICAgICBpZiAoIXBlcm1pc3Npb25TZXQgfHwgKHBlcm1pc3Npb25TZXQgJiYgcGVybWlzc2lvblNldC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRnVzZUVycm9yKEZ1c2VQZXJtaXNzaW9uUmVxdWVzdC5UQUcsICdBdCBsZWFzdCBvbmUgcGVybWlzc2lvbiBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kYXBpID0gYXBpQnJpZGdlO1xuICAgICAgICB0aGlzLiRwZXJtaXNzaW9uU2V0ID0gcGVybWlzc2lvblNldDtcbiAgICAgICAgdGhpcy4kanVzdGlmaWNhdGlvbkhhbmRsZXIgPSBqdXN0aWZpY2F0aW9uSGFuZGxlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UGVybWlzc2lvblNldCgpOiBUU3VwcG9ydGVkUGVybWlzc2lvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHBlcm1pc3Npb25TZXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyAkcmVxdWVzdChpc0p1c3RpZmllZDogYm9vbGVhbik6IFByb21pc2U8RnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxUU3VwcG9ydGVkUGVybWlzc2lvbj4+IHtcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBGdXNlQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLiRhcGkoQ29udGVudFR5cGUuSlNPTiwge1xuICAgICAgICAgICAgcGVybWlzc2lvblNldDogdGhpcy5nZXRQZXJtaXNzaW9uU2V0KCksXG4gICAgICAgICAgICBpc0p1c3RpZmllZDogaXNKdXN0aWZpZWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgdGhyb3cgYXdhaXQgcmVzcG9uc2UucmVhZEFzRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdChhd2FpdCByZXNwb25zZS5yZWFkQXNKU09OKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgJG9uSnVzdGlmaWNhdGlvblJlcXVlc3QoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGlmICghdGhpcy4kanVzdGlmaWNhdGlvbkhhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignUGVybWlzc2lvbiByZXF1aXJlcyBqdXN0aWZpY2F0aW9uLCBidXQgdGhpcyByZXF1ZXN0IGhhcyBubyBUSnVzdGlmaWNhdGlvbkhhbmRsZXInKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLiRqdXN0aWZpY2F0aW9uSGFuZGxlcigpO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgYXN5bmMgcmVxdWVzdCgpOiBQcm9taXNlPEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQ8VFN1cHBvcnRlZFBlcm1pc3Npb24+PiB7XG4gICAgICAgIGxldCByZXN1bHRzOiBGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0PFRTdXBwb3J0ZWRQZXJtaXNzaW9uPiA9IGF3YWl0IHRoaXMuJHJlcXVlc3QoZmFsc2UpO1xuXG4gICAgICAgIGlmIChyZXN1bHRzLnNob3VsZEp1c3RpZnkoKSkge1xuICAgICAgICAgICAgaWYgKGF3YWl0IHRoaXMuJG9uSnVzdGlmaWNhdGlvblJlcXVlc3QoKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBhd2FpdCB0aGlzLiRyZXF1ZXN0KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5yZWplY3RKdXN0aWZpY2F0aW9ucygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmV4cG9ydCBlbnVtIEZ1c2VQZXJtaXNzaW9uU3RhdGUge1xuICAgIEdSQU5URUQsXG4gICAgUkVRVUlSRVNfSlVTVElGSUNBVElPTixcbiAgICBERU5JRURcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIE5vcm1hbiBCcmVhdSBcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5IH0gZnJvbSBcIi4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeVwiO1xuaW1wb3J0IHsgRnVzZUFQSSB9IGZyb20gXCIuL0Z1c2VBUElcIjtcbmltcG9ydCB7VEZ1c2VBUElDYWxsYmFja0hhbmRsZXJ9IGZyb20gJy4vRnVzZUNhbGxiYWNrTWFuYWdlcic7XG5pbXBvcnQgeyBGdXNlQ29udGV4dCB9IGZyb20gXCIuL0Z1c2VDb250ZXh0XCI7XG5pbXBvcnQge0Z1c2VBUElSZXNwb25zZX0gZnJvbSAnLi9GdXNlQVBJUmVzcG9uc2UnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9QbGF0Zm9ybVwiO1xuaW1wb3J0IHsgQ29udGVudFR5cGUgfSBmcm9tIFwiLi9Db250ZW50VHlwZVwiO1xuaW1wb3J0IHsgVFNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL1RTZXJpYWxpemFibGVcIjtcbmltcG9ydCB7IEZ1c2VTZXJpYWxpemVyIH0gZnJvbSBcIi4vRnVzZVNlcmlhbGl6ZXJcIjtcblxuZXhwb3J0IHR5cGUgVEFQSUJyaWRnZUZ1bmN0aW9uPFRDb250ZW50VHlwZSBleHRlbmRzIENvbnRlbnRUeXBlID0gQ29udGVudFR5cGUsIFREYXRhIGV4dGVuZHMgVFNlcmlhbGl6YWJsZSA9IFRTZXJpYWxpemFibGU+ID0gKHR5cGU/OiBUQ29udGVudFR5cGUsIGRhdGE/OiBURGF0YSkgPT4gUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+O1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIEZ1c2UgUGx1Z2luc1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRnVzZVBsdWdpbjxUQVBJT3B0cyA9IHVua25vd24+IHtcbiAgICBwcml2YXRlICRjb250ZXh0OiBGdXNlQ29udGV4dDtcbiAgICBwcml2YXRlICRhcGlGYWN0b3J5OiBBYnN0cmFjdEZ1c2VBUElGYWN0b3J5O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEZ1c2VDb250ZXh0KSB7XG4gICAgICAgIHRoaXMuJGNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLiRhcGlGYWN0b3J5ID0gdGhpcy5fY3JlYXRlQVBJRmFjdG9yeSgpIHx8IGNvbnRleHQuZ2V0RGVmYXVsdEFQSUZhY3RvcnkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBBUEkgYnJpZGdlXG4gICAgICogQHBhcmFtIHBsYXRmb3JtIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfY3JlYXRlQVBJKHBsYXRmb3JtOiBQbGF0Zm9ybSk6IEZ1c2VBUEkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJRmFjdG9yeSgpLmNyZWF0ZShwbGF0Zm9ybSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVBUElGYWN0b3J5KCk6IEFic3RyYWN0RnVzZUFQSUZhY3Rvcnkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2dldEFQSUZhY3RvcnkoKTogQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRhcGlGYWN0b3J5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRBUElPcHRzIGlzIGEgcGx1Z2luIGdlbmVyaWMgdHlwZSBkZWNsYXJpbmcgb3B0aW9ucy5cbiAgICAgKiBVc2VyIG1heSB1c2UgdGhpcyB0byBkZWNsYXJlIGEgcGF0aCBvbiBob3cgdG8gZ2V0IGEgcGFydGljdWxhciBGdXNlQVBJLlxuICAgICAqIFxuICAgICAqIFRoaXMgQVBJIG1heSBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXMgdG8gdXRpbGlzZSB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyB0byBzaW1wbHkgcmV0dXJuIGEgc3RhbmRhcmQgRnVzZUFQSS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gb3B0cyBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2dldEFQSShvcHRzPzogVEFQSU9wdHMpOiBGdXNlQVBJIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGdldEFQSSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdGFuZGFyZCBGdXNlQVBJXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHJpdmF0ZSAkZ2V0QVBJKCk6IEZ1c2VBUEkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0QVBJRmFjdG9yeSgpLmNyZWF0ZSh0aGlzLmdldENvbnRleHQoKS5nZXRQbGF0Zm9ybSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY2FsbGJhY2sgY29udGV4dCB0aGF0IGNhbiBiZSBwYXNzZWQgdG8gbmF0aXZlXG4gICAgICogVGhlIG5hdGl2ZSBjb2RlIGNhbiB1c2UgdGhlIGNhbGxiYWNrSUQgdG8gY2FsbGJhY2sgdG8gdGhlIEpTIGNvZGUuXG4gICAgICogXG4gICAgICogVGhlIGNhbGxiYWNrIGNhbiBiZSB1c2VkIHNldmVyYWwgdGltZXMuXG4gICAgICogXG4gICAgICogUmVsZWFzZSB0aGUgY2FsbGJhY2sgdXNpbmcgX3JlbGVhc2VDYWxsYmFjayB3aXRoIHRoZSBnaXZlbiBjYWxsYmFja0lELlxuICAgICAqIFRoZXNlIEFQSSB1c2FnZXMgc2hvdWxkIGJlIHBhcnQgb2YgeW91ciBwbHVnaW4gQVBJLiBXaGVuIHJlbGVhc2luZyBhIGNhbGxiYWNrLFxuICAgICAqIGEgc3RhbmRhcmQgQVBJIGNhbGwgc2hvdWxkIGJlIG1hZGUgdG8geW91ciBwbHVnaW4gdG8gdGVsbCB0aGUgbmF0aXZlIHNpZGUgdGhhdFxuICAgICAqIHRoZSBjYWxsYmFjayBpcyBubyBsb25nZXIgdXNhYmxlLCBhbmQgaXQgc2hvdWxkIGNsZWFuIHVwIHRoZSBuYXRpdmUgcmVzb3VyY2VzIHN1cnJvdW5kaW5nXG4gICAgICogdGhlIGNhbGxiYWNrIGNvbnRleHQuXG4gICAgICogXG4gICAgICogTm90ZSB0aGF0IGNhbGxiYWNrIGRhdGEgcGF5bG9hZHMgb25seSBzdXBwb3J0cyBzdHJpbmdzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBjYiBcbiAgICAgKiBAcmV0dXJucyBTdHJpbmcgLSBjYWxsYmFja0lEXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9jcmVhdGVDYWxsYmFjayhjYjogVEZ1c2VBUElDYWxsYmFja0hhbmRsZXIsIGFwaU9wdHM/OiBUQVBJT3B0cyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRBUEkoYXBpT3B0cykuY3JlYXRlQ2FsbGJhY2tDb250ZXh0KGNiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWxlYXNlcyBhIGNyZWF0ZWQgY2FsbGJhY2suXG4gICAgICogXG4gICAgICogQHBhcmFtIGlkIGNhbGxiYWNrSURcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX3JlbGVhc2VDYWxsYmFjayhpZDogc3RyaW5nLCBhcGlPcHRzPzogVEFQSU9wdHMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZ2V0QVBJKGFwaU9wdHMpLnJlbGVhc2VDYWxsYmFjayhpZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgRnVzZUNvbnRleHRcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q29udGV4dCgpOiBGdXNlQ29udGV4dCB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjb250ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIENvbmNyZXRlIGNsYXNzZXMgc2hvdWxkIGltcGxlbWVudCBhbmQgcmV0dXJuIGEgc3RyaW5nIHRoYXQgdW5pcXVlbHkgcmVwcmVzZW50cyB0aGlzIHBsdWdpbi5cbiAgICAgKiBUaGUgc3RyaW5nIG11c3QgY29uZm9ybSB0byBVUkwgZnJhZ21lbnQgcnVsZXMuIEl0IHNoYWxsIG9ubHkgY29udGFpbiB0aGUgZm9sbG93aW5nIGNoYXJhY3RlcnM6XG4gICAgICogIC0gQWxwaGFiZXRpY2FsIGxldHRlcnNcbiAgICAgKiAgLSBOdW1iZXJzXG4gICAgICogIC0gZG90cyBhbmQgaHlwaGVuc1xuICAgICAqIFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfZ2V0SUQoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcGx1Z2luIElEXG4gICAgICovXG4gICAgcHVibGljIGdldElEKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRJRCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBleGVjdXRpb24gQVBJLiBDb25jcmV0ZSBjbGFzc2VzIGNhbiBjYWxsIHRoaXMgdG8gcGVyZm9ybSBjYWxscyB0byB0aGUgbmF0aXZlIHNpZGUuXG4gICAgICogXG4gICAgICogVGhlIGNvbmNyZXRlIGNsYXNzIHNob3VsZCBleHBvc2UgcHVibGljIG1ldGhvZHMgd2l0aCB0eXBlIGluZm9ybWF0aW9uIGV4cG9zZWQuXG4gICAgICogXG4gICAgICogQHBhcmFtIG1ldGhvZCBUaGUgbWV0aG9kIGxpbmssIHRoaXMgc2hvdWxkIG1hdGNoIHRoZSBlbmRwb2ludCBkZWZpbmVkIGluIHRoZSBuYXRpdmUgQVBJLlxuICAgICAqIEBwYXJhbSBjb250ZW50VHlwZSB0aGUgTUlNRSB0eXBlIG9mIHRoZSBkYXRhIHlvdSBhcmUgcGFzc2luZyBpbi5cbiAgICAgKiBAcGFyYW0gZGF0YSAtIFRoZSBkYXRhIHRvIHBhc3MgdG8gdGhlIG5hdGl2ZSBlbnZpcm9ubWVudFxuICAgICAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gVGhlIHJlc3BvbnNlIGJvZHkgZnJvbSBuYXRpdmUuIEZ1c2VSZXNwb25zZVJlYWRlciBoYXMgc29tZSB1dGlsaXR5IG1ldGhvZHMgdG8gcmVhZCB0aGUgZGF0YSBpbiBjb21tb24gZm9ybWF0cyAoZS5nLiB0ZXh0IG9yIEpTT04pXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFzeW5jIF9leGVjKG1ldGhvZDogc3RyaW5nLCBjb250ZW50VHlwZT86IHN0cmluZywgZGF0YT86IFRTZXJpYWxpemFibGUsIGFwaU9wdHM/OiBUQVBJT3B0cyk6IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9nZXRBUEkoYXBpT3B0cykuZXhlY3V0ZSh0aGlzLmdldElEKCksIG1ldGhvZCwgY29udGVudFR5cGUsIGRhdGEpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY3JlYXRlQVBJQnJpZGdlKHJvdXRlOiBzdHJpbmcsIHNlcmlhbGl6ZXI/OiBGdXNlU2VyaWFsaXplcik6IFRBUElCcmlkZ2VGdW5jdGlvbiB7XG4gICAgICAgIGlmICghc2VyaWFsaXplcikge1xuICAgICAgICAgICAgc2VyaWFsaXplciA9IG5ldyBGdXNlU2VyaWFsaXplcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFzeW5jICh0eXBlPzogQ29udGVudFR5cGUsIGRhdGE/OiBUU2VyaWFsaXphYmxlKTogUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9leGVjKHJvdXRlLCB0eXBlLCBzZXJpYWxpemVyLnNlcmlhbGl6ZShkYXRhKSk7XG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogQSBzdGF0aWMgY2xhc3Mgd2l0aCBjb252ZW5pZW5jZSBtZXRob2RzIGZvciByZWFkaW5nIGNvbW1vblxuICogcmVzcG9uc2UgY29udGVudCBib2R5IGZvcm1hdHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdXNlUmVzcG9uc2VSZWFkZXIge1xuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyByZWFkQXNUZXh0KGRhdGE6IEFycmF5QnVmZmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlYWRlcjogRmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoPHN0cmluZz5yZWFkZXIucmVzdWx0KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZWFkZXIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzVGV4dChuZXcgQmxvYihbZGF0YV0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyByZWFkQXNKU09OPFQ+KGRhdGE6IEFycmF5QnVmZmVyKTogUHJvbWlzZTxUPiB7XG4gICAgICAgIGxldCBzdHI6IHN0cmluZyA9IGF3YWl0IHRoaXMucmVhZEFzVGV4dChkYXRhKTtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSVNlcmlhbGl6YWJsZSB9IGZyb20gXCIuL0lTZXJpYWxpemFibGVcIjtcbmltcG9ydCB7IFRTZXJpYWxpemFibGUgfSBmcm9tIFwiLi9UU2VyaWFsaXphYmxlXCI7XG5cbmV4cG9ydCBjbGFzcyBGdXNlU2VyaWFsaXplciB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge31cblxuICAgIHByb3RlY3RlZCBfc2VyaWFsaXplVG9TdHJpbmcob2JqOiBUU2VyaWFsaXphYmxlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZVByaW1pdGl2ZVRvU3RyaW5nKG9iaik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZURhdGVUb1N0cmluZyhvYmopO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2lzSVNlcmlhbGl6YWJsZShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZUVycm9yVG9TdHJpbmcob2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gYWxsIGVsc2UgZmFpbHMsIGF0dGVtcHQgdG8gSlNPTiBzdHJpbmdpZnlcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVQcmltaXRpdmVUb1N0cmluZyhvYmo6IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zZXJpYWxpemVFcnJvclRvU3RyaW5nKG9iajogRXJyb3IpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc2VyaWFsaXplZEVycm9yID0ge1xuICAgICAgICAgICAgbmFtZTogb2JqLm5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBvYmoubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YWNrOiBvYmouc3RhY2tcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc2VyaWFsaXplZEVycm9yLCBudWxsLCA0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NlcmlhbGl6ZURhdGVUb1N0cmluZyhvYmo6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gb2JqLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlcmlhbGl6ZShvYmo6IFRTZXJpYWxpemFibGUpOiBCbG9iIHtcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmluOiBCbG9iO1xuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgYmluID0gb2JqO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCBvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqKV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbb2JqXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5faXNJU2VyaWFsaXphYmxlKG9iaikpIHtcbiAgICAgICAgICAgIGJpbiA9IG5ldyBCbG9iKFt0aGlzLnNlcmlhbGl6ZShvYmouc2VyaWFsaXplKCkpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBzaG91bGQgYmUgZWl0aGVyIEpTT04gb2JqZWN0cyBvciBqc29uIGFycmF5cyBhdCB0aGlzIHBvaW50XG4gICAgICAgICAgICBiaW4gPSBuZXcgQmxvYihbdGhpcy5fc2VyaWFsaXplVG9TdHJpbmcob2JqKV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJpbjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2lzSVNlcmlhbGl6YWJsZSh4OiBhbnkpOiB4IGlzIElTZXJpYWxpemFibGUge1xuICAgICAgICByZXR1cm4gISF4LnNlcmlhbGl6ZSAmJiB0eXBlb2YgeC5zZXJpYWxpemUgPT09ICdmdW5jdGlvbic7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IENvbnRlbnRUeXBlIH0gZnJvbSAnLi9Db250ZW50VHlwZSc7XG5pbXBvcnQge0Z1c2VBUEl9IGZyb20gJy4vRnVzZUFQSSc7XG5pbXBvcnQgeyBGdXNlQVBJUmVzcG9uc2UgfSBmcm9tICcuL0Z1c2VBUElSZXNwb25zZSc7XG5pbXBvcnQge0Z1c2VFcnJvcn0gZnJvbSAnLi9GdXNlRXJyb3InO1xuXG4vKipcbiAqIEEgRnVzZSBBUEkgaW1wbGVtZW50YXRpb24gdGhhdCB1c2VzIEhUVFAgcHJvdG9jb2wgdG8gbWFrZSBuYXRpdmUgY2FsbHNcbiAqL1xuZXhwb3J0IGNsYXNzIEhUVFBGdXNlQVBJIGV4dGVuZHMgRnVzZUFQSSB7XG4gICAgXG4gICAgcHJvdGVjdGVkIGFzeW5jIF9nZXRFbmRwb2ludCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIF9pbml0SGVhZGVycyh4aHI6IFhNTEh0dHBSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7fTtcblxuICAgIHB1YmxpYyBhc3luYyBidWlsZFJvdXRlKHBsdWdpbklEOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgbGV0IGVuZHBvaW50OiBzdHJpbmcgPSBhd2FpdCB0aGlzLl9nZXRFbmRwb2ludCgpO1xuICAgICAgICByZXR1cm4gYCR7ZW5kcG9pbnR9JHt0aGlzLl9jcmVhdGVSb3V0ZShwbHVnaW5JRCwgbWV0aG9kKX1gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBfZXhlY3V0ZShwbHVnaW5JRDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgY29udGVudFR5cGU6IHN0cmluZywgZGF0YTogQmxvYik6IFByb21pc2U8RnVzZUFQSVJlc3BvbnNlPiB7XG4gICAgICAgIGxldCB4aHI6IFhNTEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICB4aHIub3BlbignUE9TVCcsIGF3YWl0IHRoaXMuYnVpbGRSb3V0ZShwbHVnaW5JRCwgbWV0aG9kKSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWNvbnRlbnRUeXBlKSB7XG4gICAgICAgICAgICBjb250ZW50VHlwZSA9IENvbnRlbnRUeXBlLkJJTkFSWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuX2luaXRIZWFkZXJzKHhocik7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9kb1JlcXVlc3QoeGhyLCBkYXRhKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2RvUmVxdWVzdCh4aHI6IFhNTEh0dHBSZXF1ZXN0LCBkYXRhOiBCbG9iKTogUHJvbWlzZTxGdXNlQVBJUmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEZ1c2VBUElSZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2U6IEZ1c2VBUElSZXNwb25zZSA9IG5ldyBGdXNlQVBJUmVzcG9uc2UoeGhyLnJlc3BvbnNlLCB4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCksIHhoci5zdGF0dXMpO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGF3YWl0IHJlc3BvbnNlLnJlYWRBc0Vycm9yKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRnVzZUVycm9yKCdGdXNlQVBJJywgJ05ldHdvcmsgRXJyb3InKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEZ1c2VFcnJvcignRnVzZUFQSScsICdBUEkgVGltZW91dCcpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX2RvU2VuZCh4aHIsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX2RvU2VuZCh4aHI6IFhNTEh0dHBSZXF1ZXN0LCBkYXRhOiBCbG9iKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQgJiYgZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgeGhyLnNlbmQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogRW51bWVyYXRpb24gZm9yIHN1cHBvcnRlZCBwbGF0Zm9ybXNcbiAqL1xuZXhwb3J0IGVudW0gUGxhdGZvcm0ge1xuICAgIElPUyA9IDEsXG4gICAgQU5EUk9JRCxcbiAgICAvKipcbiAgICAgKiBTcGVjaWFsaXplZCBwbGF0Zm9ybSB1c2VkIGZvciB0ZXN0IGVudmlyb25tZW50cyxcbiAgICAgKiB3aWxsIG5vdCBiZSB1c2VkIGZvciByZWd1bGFyIHJ1bnRpbWVzLlxuICAgICAqL1xuICAgIFRFU1Rcbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIE5vcm1hbiBCcmVhdSBcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1BsYXRmb3JtXCI7XG5cbi8qKlxuICogQSBzdHJhdGVneSB0byByZXNvbHZlIHRoZSBydW50aW1lJ3MgcGxhdGZvcm1cbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXRmb3JtUmVzb2x2ZXIge1xuICAgIHB1YmxpYyByZXNvbHZlKCk6IFBsYXRmb3JtIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJT1NFbnZpcm9ubWVudCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gUGxhdGZvcm0uSU9TO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhlIG9ubHkgb3RoZXIgc3VwcG9ydGVkIHBsYXRmb3JtIGlzIEFuZHJvaWQsIHNvXG4gICAgICAgICAgICAvLyBpdCdzIGFzc3VtZWRcbiAgICAgICAgICAgIHJldHVybiBQbGF0Zm9ybS5BTkRST0lEO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzSU9TRW52aXJvbm1lbnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCA9PT0gJ25ic2Z1c2U6JztcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNBbmRyb2lkRW52aXJvbm1lbnQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5pc0lPU0Vudmlyb25tZW50KCk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmV4cG9ydCBjbGFzcyBWZXJzaW9uIHtcbiAgICBwcml2YXRlICRtYWpvcjogbnVtYmVyO1xuICAgIHByaXZhdGUgJG1pbm9yOiBudW1iZXI7XG4gICAgcHJpdmF0ZSAkcGF0Y2g/OiBudW1iZXI7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExFU1NfVEhBTjogbnVtYmVyID0gLTE7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBFUVVBTDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdSRUFURVJfVEhBTjogbnVtYmVyID0gMTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihtYWpvcjogbnVtYmVyLCBtaW5vcj86IG51bWJlciwgcGF0Y2g/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy4kbWFqb3IgPSBtYWpvcjtcbiAgICAgICAgdGhpcy4kbWlub3IgPSBtaW5vciB8fCAwO1xuICAgICAgICB0aGlzLiRwYXRjaCA9IHBhdGNoIHx8IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZVZlcnNpb25TdHJpbmcodmVyc2lvbjogc3RyaW5nKTogVmVyc2lvbiB7XG4gICAgICAgIGxldCBwYXJ0czogc3RyaW5nW10gPSB2ZXJzaW9uLnNwbGl0KCcuJyk7XG5cbiAgICAgICAgbGV0IG1ham9yOiBudW1iZXIgPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgIGxldCBtaW5vcjogbnVtYmVyID0gcGFyc2VJbnQocGFydHNbMV0pO1xuICAgICAgICBsZXQgcGF0Y2g6IG51bWJlciA9IHBhcnNlSW50KHBhcnRzWzJdKTtcblxuICAgICAgICBpZiAoaXNOYU4obWFqb3IpKSB7XG4gICAgICAgICAgICBtYWpvciA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4obWlub3IpKSB7XG4gICAgICAgICAgICBtaW5vciA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4ocGF0Y2gpKSB7XG4gICAgICAgICAgICBwYXRjaCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFZlcnNpb24obWFqb3IsIG1pbm9yLCBwYXRjaCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1ham9yKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLiRtYWpvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWlub3IoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG1pbm9yO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQYXRjaCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy4kcGF0Y2g7XG4gICAgfVxuXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLiRtYWpvcn0uJHt0aGlzLiRtaW5vcn0uJHt0aGlzLiRwYXRjaH1gO1xuICAgIH1cblxuICAgIFxuICAgIHB1YmxpYyBjb21wYXJlKGI6IFZlcnNpb24pOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIGIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY29tcGFyZShsaHM6IFZlcnNpb24sIHJoczogVmVyc2lvbik6IG51bWJlciB7XG4gICAgICAgIGlmIChsaHMuJG1ham9yID09PSByaHMuJG1ham9yICYmIGxocy4kbWlub3IgPT09IHJocy4kbWlub3IgJiYgbGhzLiRwYXRjaCA9PT0gcmhzLiRwYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIFZlcnNpb24uRVFVQUw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGhzLiRtYWpvciA9PT0gcmhzLiRtYWpvcikge1xuICAgICAgICAgICAgaWYgKGxocy4kbWlub3IgPT09IHJocy4kbWlub3IpIHtcbiAgICAgICAgICAgICAgICBpZiAobGhzLiRwYXRjaCA9PT0gcmhzLiRwYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGRuJ3QgaGF2ZSByZWFjaGVkIGhlcmUuLi4gYXMgaXQgc2hvdWxkIGhhdmUgYmVlbiBjYXVnaHQgYnkgdGhlIHNpbXBsZSB0ZXN0IGFib3ZlIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1dCBmb3IgY29uc2lzdGVuY3kgd2Ugd2lsbCBrZWVwIGl0IGhlcmUuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBWZXJzaW9uLkVRVUFMXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGhzLiRwYXRjaCA+IHJocy4kcGF0Y2ggPyBWZXJzaW9uLkdSRUFURVJfVEhBTiA6IFZlcnNpb24uTEVTU19USEFOO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaHMuJG1pbm9yID4gcmhzLiRtaW5vciA/IFZlcnNpb24uR1JFQVRFUl9USEFOIDogVmVyc2lvbi5MRVNTX1RIQU47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbGhzLiRtYWpvciA+IHJocy4kbWFqb3IgPyBWZXJzaW9uLkdSRUFURVJfVEhBTiA6IFZlcnNpb24uTEVTU19USEFOO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7IElOYXRpdmVMb2dFbnRyeSB9IGZyb20gJy4uL0lGdXNlTG9nZ2VyJztcbmltcG9ydCB7RnVzZUxvZ2dlcn0gZnJvbSAnLi4vRnVzZUxvZ2dlcic7XG5pbXBvcnQge0Z1c2VMb2dnZXJMZXZlbH0gZnJvbSAnLi4vRnVzZUxvZ2dlckxldmVsJztcbmltcG9ydCB7IEZ1c2VDYWxsYmFja01hbmFnZXIgfSBmcm9tICcuLi9GdXNlQ2FsbGJhY2tNYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIEFuZHJvaWRGdXNlTG9nZ2VyIGV4dGVuZHMgRnVzZUxvZ2dlciB7XG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9sb2dUb05hdGl2ZShsZXZlbDogRnVzZUxvZ2dlckxldmVsLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgd2luZG93Lk5CU05hdGl2ZS5sb2cobGV2ZWwsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfcmVnaXN0ZXJOYXRpdmVDYWxibGFjaygpOiB2b2lkIHtcbiAgICAgICAgd2luZG93Lk5CU05hdGl2ZS5zZXRMb2dDYWxsYmFjayhGdXNlQ2FsbGJhY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQ2FsbGJhY2soKHBheWxvYWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IGVudHJ5OiBJTmF0aXZlTG9nRW50cnkgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBlbnRyeSA9IEpTT04ucGFyc2UocGF5bG9hZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX29uTmF0aXZlTG9nRW50cnkoZW50cnkpO1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7SFRUUEZ1c2VBUEl9IGZyb20gJy4uL0hUVFBGdXNlQVBJJztcblxuLyoqXG4gKiBBIEZ1c2UgQVBJIGltcGxlbWVudGF0aW9uIGZvciBhbiBlbWJlZGRlZCBIVFRQIHNlcnZlciB0byBicmlkZ2UgdGhlIEpTIGFuZCBOYXRpdmUgQVBJIGNhbGxzLlxuICovXG5leHBvcnQgY2xhc3MgQW5kcm9pZFNjaGVtZUZ1c2VBUEkgZXh0ZW5kcyBIVFRQRnVzZUFQSSB7XG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9nZXRFbmRwb2ludCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYGh0dHA6Ly9sb2NhbGhvc3Q6JHt3aW5kb3cuTkJTTmF0aXZlLmdldEFQSVBvcnQoKX1gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBfaW5pdEhlYWRlcnMoeGhyOiBYTUxIdHRwUmVxdWVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1GdXNlLVNlY3JldCcsIHdpbmRvdy5OQlNOYXRpdmUuZ2V0QVBJU2VjcmV0KCkpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIE5vcm1hbiBCcmVhdSBcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vLyBDb21tb24gQVBJXG5leHBvcnQge1BsYXRmb3JtfSBmcm9tICcuL1BsYXRmb3JtJztcbmV4cG9ydCB7UGxhdGZvcm1SZXNvbHZlcn0gZnJvbSAnLi9QbGF0Zm9ybVJlc29sdmVyJztcbmV4cG9ydCB7RnVzZUNvbnRleHR9IGZyb20gJy4vRnVzZUNvbnRleHQnO1xuZXhwb3J0IHtGdXNlQ29udGV4dEJ1aWxkZXJ9IGZyb20gJy4vRnVzZUNvbnRleHRCdWlsZGVyJztcbmV4cG9ydCB7VmVyc2lvbn0gZnJvbSAnLi9WZXJzaW9uJztcbmV4cG9ydCB7XG4gICAgRnVzZUFQSSxcbiAgICBURnVzZUFQSVJlc3BvbnNlRGF0YSxcbiAgICBJRnVzZUFQSUNhbGxQYWNrZXRcbn0gZnJvbSAnLi9GdXNlQVBJJztcbmV4cG9ydCB7RnVzZUNhbGxiYWNrTWFuYWdlciwgVEZ1c2VBUElDYWxsYmFja0hhbmRsZXJ9IGZyb20gJy4vRnVzZUNhbGxiYWNrTWFuYWdlcic7XG5leHBvcnQge0Z1c2VBUElSZXNwb25zZX0gZnJvbSAnLi9GdXNlQVBJUmVzcG9uc2UnO1xuZXhwb3J0IHtDb250ZW50VHlwZX0gZnJvbSAnLi9Db250ZW50VHlwZSc7XG5leHBvcnQge0Z1c2VSZXNwb25zZVJlYWRlcn0gZnJvbSAnLi9GdXNlUmVzcG9uc2VSZWFkZXInO1xuZXhwb3J0IHtGdXNlQVBJRmFjdG9yeX0gZnJvbSAnLi9GdXNlQVBJRmFjdG9yeSc7XG5leHBvcnQge0Fic3RyYWN0RnVzZUFQSUZhY3Rvcnl9IGZyb20gJy4vQWJzdHJhY3RGdXNlQVBJRmFjdG9yeSc7XG5leHBvcnQge1xuICAgIEZ1c2VSdW50aW1lLFxuICAgIFRQYXVzZUNhbGxiYWNrSGFuZGxlcixcbiAgICBUUmVzdW1lQ2FsbGJhY2tIYW5kbGVyLFxuICAgIElSdW50aW1lSW5mb1xufSBmcm9tICcuL3BsdWdpbnMvRnVzZVJ1bnRpbWUnO1xuZXhwb3J0IHtGdXNlUGx1Z2luLCBUQVBJQnJpZGdlRnVuY3Rpb259IGZyb20gJy4vRnVzZVBsdWdpbic7XG5leHBvcnQge0hUVFBGdXNlQVBJfSBmcm9tICcuL0hUVFBGdXNlQVBJJztcbmV4cG9ydCB7RnVzZUVycm9yfSBmcm9tICcuL0Z1c2VFcnJvcic7XG5cbi8vIFV0aWxpdGllc1xuZXhwb3J0IHtJU2VyaWFsaXphYmxlfSBmcm9tICcuL0lTZXJpYWxpemFibGUnO1xuZXhwb3J0IHtUU2VyaWFsaXphYmxlLCBURnVzZVNlcmlhbGl6YWJsZX0gZnJvbSAnLi9UU2VyaWFsaXphYmxlJztcbmV4cG9ydCB7RnVzZVNlcmlhbGl6ZXJ9IGZyb20gJy4vRnVzZVNlcmlhbGl6ZXInO1xuZXhwb3J0IHtJRnVzZVBlcm1pc3Npb25SZXF1ZXN0fSBmcm9tICcuL0lGdXNlUGVybWlzc2lvblJlcXVlc3QnO1xuZXhwb3J0IHtGdXNlUGVybWlzc2lvblN0YXRlfSBmcm9tICcuL0Z1c2VQZXJtaXNzaW9uU3RhdGUnO1xuZXhwb3J0IHtcbiAgICBGdXNlUGVybWlzc2lvblJlcXVlc3QsXG4gICAgVEZ1c2VBUElQZXJtaXNzaW9uUmVxdWVzdCxcbiAgICBURnVzZUp1c3RpZmljYXRpb25IYW5kbGVyLFxuICAgIFRGdXNlUGVybWlzc2lvblJlcXVlc3RBcmd1bWVudHNcbn0gZnJvbSAnLi9GdXNlUGVybWlzc2lvblJlcXVlc3QnO1xuZXhwb3J0IHtJRnVzZUdyYW50UmVzdWx0fSBmcm9tICcuL0lGdXNlR3JhbnRSZXN1bHQnO1xuZXhwb3J0IHtGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0fSBmcm9tICcuL0Z1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQnO1xuXG4vLyBMb2dnZXJcbmV4cG9ydCB7RnVzZUxvZ2dlckxldmVsfSBmcm9tICcuL0Z1c2VMb2dnZXJMZXZlbCc7XG5leHBvcnQge0lGdXNlTG9nZ2VyLCBJTmF0aXZlTG9nRW50cnl9IGZyb20gJy4vSUZ1c2VMb2dnZXInO1xuZXhwb3J0IHtGdXNlTG9nZ2VyLCBGdXNlTG9nZ2VyU2VyaWFsaXplcn0gZnJvbSAnLi9GdXNlTG9nZ2VyJztcbmV4cG9ydCB7QWJzdHJhY3RGdXNlTG9nZ2VyRmFjdG9yeX0gZnJvbSAnLi9BYnN0cmFjdEZ1c2VMb2dnZXJGYWN0b3J5JztcbmV4cG9ydCB7RnVzZUxvZ2dlckZhY3Rvcnl9IGZyb20gJy4vRnVzZUxvZ2dlckZhY3RvcnknO1xuXG4vLyBpT1MgU3BlY2lmaWMgQVBJcyAvIEltcGxlbWVudGF0aW9uc1xuZXhwb3J0IHtJT1NTY2hlbWVGdXNlQVBJfSBmcm9tICcuL2lvcy9JT1NTY2hlbWVGdXNlQVBJJztcbmV4cG9ydCB7SU9TRnVzZUxvZ2dlcn0gZnJvbSAnLi9pb3MvSU9TRnVzZUxvZ2dlcic7XG5cbi8vIEFuZHJvaWQgU3BlY2lmaWMgQVBJcyAvIEltcGxlbWVudGF0aW9uc1xuZXhwb3J0IHtBbmRyb2lkU2NoZW1lRnVzZUFQSX0gZnJvbSAnLi9hbmRyb2lkL0FuZHJvaWRTY2hlbWVGdXNlQVBJJztcbmV4cG9ydCB7QW5kcm9pZEZ1c2VMb2dnZXJ9IGZyb20gJy4vYW5kcm9pZC9BbmRyb2lkRnVzZUxvZ2dlcic7XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgSU5hdGl2ZUxvZ0VudHJ5IH0gZnJvbSAnLi4vSUZ1c2VMb2dnZXInO1xuaW1wb3J0IHsgRnVzZUxvZ2dlciB9IGZyb20gXCIuLi9GdXNlTG9nZ2VyXCI7XG5pbXBvcnQgeyBGdXNlTG9nZ2VyTGV2ZWwgfSBmcm9tIFwiLi4vRnVzZUxvZ2dlckxldmVsXCI7XG5pbXBvcnQgeyBGdXNlQ2FsbGJhY2tNYW5hZ2VyIH0gZnJvbSAnLi4vRnVzZUNhbGxiYWNrTWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBJT1NGdXNlTG9nZ2VyIGV4dGVuZHMgRnVzZUxvZ2dlciB7XG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9sb2dUb05hdGl2ZShsZXZlbDogRnVzZUxvZ2dlckxldmVsLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMubG9nLnBvc3RNZXNzYWdlKFtsZXZlbCwgbWVzc2FnZV0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfcmVnaXN0ZXJOYXRpdmVDYWxibGFjaygpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuc2V0TG9nQ2FsbGJhY2sucG9zdE1lc3NhZ2UoRnVzZUNhbGxiYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUNhbGxiYWNrKChwYXlsb2FkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBlbnRyeTogSU5hdGl2ZUxvZ0VudHJ5ID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZW50cnkgPSBKU09OLnBhcnNlKHBheWxvYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9vbk5hdGl2ZUxvZ0VudHJ5KGVudHJ5KTtcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIE5vcm1hbiBCcmVhdSBcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQge0hUVFBGdXNlQVBJfSBmcm9tICcuLi9IVFRQRnVzZUFQSSc7XG5cbi8qKlxuICogQSBGdXNlIEFQSSBpbXBsZW1lbnRhdGlvbiBmb3IgaU9TIHRoYXQgdXNlcyBXS1VSTFNjaGVtZUhhbmRsZXIgdG8gYnJpZGdlIHRoZSBKUyBhbmQgTmF0aXZlIEFQSSBjYWxscy5cbiAqL1xuZXhwb3J0IGNsYXNzIElPU1NjaGVtZUZ1c2VBUEkgZXh0ZW5kcyBIVFRQRnVzZUFQSSB7XG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9nZXRFbmRwb2ludCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYGh0dHA6Ly9sb2NhbGhvc3Q6JHthd2FpdCB3aW5kb3cud2Via2l0Lm1lc3NhZ2VIYW5kbGVycy5nZXRBUElQb3J0LnBvc3RNZXNzYWdlKFwiXCIpfWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIF9pbml0SGVhZGVycyh4aHI6IFhNTEh0dHBSZXF1ZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUZ1c2UtU2VjcmV0JywgYXdhaXQgd2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMuZ2V0QVBJU2VjcmV0LnBvc3RNZXNzYWdlKFwiXCIpKTtcbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHsgQ29udGVudFR5cGUgfSBmcm9tICcuLi9Db250ZW50VHlwZSc7XG5pbXBvcnQgeyBGdXNlQ29udGV4dCB9IGZyb20gJy4uL0Z1c2VDb250ZXh0JztcbmltcG9ydCB7RnVzZVBsdWdpbn0gZnJvbSAnLi4vRnVzZVBsdWdpbic7XG5pbXBvcnQge0Z1c2VBUElSZXNwb25zZX0gZnJvbSAnLi4vRnVzZUFQSVJlc3BvbnNlJztcblxuZXhwb3J0IHR5cGUgVFBhdXNlQ2FsbGJhY2tIYW5kbGVyID0gKCkgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIFRSZXN1bWVDYWxsYmFja0hhbmRsZXIgPSAoKSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSdW50aW1lSW5mbyB7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuICAgIGRlYnVnTW9kZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIEZ1c2VSdW50aW1lIGV4dGVuZHMgRnVzZVBsdWdpbiB7XG4gICAgcHJpdmF0ZSAkY2FsbGJhY2tJRHM6IHN0cmluZ1tdO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEZ1c2VDb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLiRjYWxsYmFja0lEcyA9IFtdO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfZ2V0SUQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdGdXNlUnVudGltZSc7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBhc3luYyBnZXRJbmZvKCk6IFByb21pc2U8SVJ1bnRpbWVJbmZvPiB7XG4gICAgICAgIGxldCBkYXRhOiBGdXNlQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9leGVjKCcvaW5mbycpO1xuICAgICAgICByZXR1cm4gYXdhaXQgZGF0YS5yZWFkQXNKU09OKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVyUGF1c2VIYW5kbGVyKGNiOiBUUGF1c2VDYWxsYmFja0hhbmRsZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBsZXQgY2JJRDogc3RyaW5nID0gdGhpcy5fY3JlYXRlQ2FsbGJhY2soKHBheWxvYWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3JlZ2lzdGVyUGF1c2VIYW5kbGVyJywgQ29udGVudFR5cGUuVEVYVCwgY2JJRCk7XG4gICAgICAgIHRoaXMuJGNhbGxiYWNrSURzLnB1c2goY2JJRCk7XG5cbiAgICAgICAgcmV0dXJuIGNiSUQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHVucmVnaXN0ZXJQYXVzZUhhbmRsZXIoY2FsbGJhY2tJRDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuX2V4ZWMoJy91bnJlZ2lzdGVyUGF1c2VIYW5kbGVyJywgQ29udGVudFR5cGUuVEVYVCwgY2FsbGJhY2tJRCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlZ2lzdGVyUmVzdW1lSGFuZGxlcihjYjogVFJlc3VtZUNhbGxiYWNrSGFuZGxlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGxldCBjYklEOiBzdHJpbmcgPSB0aGlzLl9jcmVhdGVDYWxsYmFjaygocGF5bG9hZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB0aGlzLl9leGVjKCcvcmVnaXN0ZXJSZXN1bWVIYW5kbGVyJywgQ29udGVudFR5cGUuVEVYVCwgY2JJRCk7XG4gICAgICAgIHRoaXMuJGNhbGxiYWNrSURzLnB1c2goY2JJRCk7XG5cbiAgICAgICAgcmV0dXJuIGNiSUQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHVucmVnaXN0ZXJSZXN1bWVIYW5kbGVyKGNhbGxiYWNrSUQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLl9leGVjKCcvdW5yZWdpc3RlclJlc3VtZUhhbmRsZXInLCBDb250ZW50VHlwZS5URVhULCBjYWxsYmFja0lEKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5JTFwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfbmlsLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicGFyc2VcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3BhcnNlLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyaW5naWZ5XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ2MVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfdi5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInYzXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92Mi5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInY0XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92My5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInY1XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92NC5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZhbGlkYXRlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92YWxpZGF0ZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInZlcnNpb25cIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3ZlcnNpb24uZGVmYXVsdDtcbiAgfVxufSk7XG5cbnZhciBfdiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjEuanNcIikpO1xuXG52YXIgX3YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92My5qc1wiKSk7XG5cbnZhciBfdjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3Y0LmpzXCIpKTtcblxudmFyIF92NCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjUuanNcIikpO1xuXG52YXIgX25pbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbmlsLmpzXCIpKTtcblxudmFyIF92ZXJzaW9uID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92ZXJzaW9uLmpzXCIpKTtcblxudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuXG52YXIgX3N0cmluZ2lmeSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpKTtcblxudmFyIF9wYXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcGFyc2UuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG4vKlxuICogQnJvd3Nlci1jb21wYXRpYmxlIEphdmFTY3JpcHQgTUQ1XG4gKlxuICogTW9kaWZpY2F0aW9uIG9mIEphdmFTY3JpcHQgTUQ1XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5mdW5jdGlvbiBtZDUoYnl0ZXMpIHtcbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobXNnLmxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXNbaV0gPSBtc2cuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWQ1VG9IZXhFbmNvZGVkQXJyYXkod29yZHNUb01kNShieXRlc1RvV29yZHMoYnl0ZXMpLCBieXRlcy5sZW5ndGggKiA4KSk7XG59XG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGFuIGFycmF5IG9mIGJ5dGVzXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVUb0hleEVuY29kZWRBcnJheShpbnB1dCkge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgY29uc3QgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMjtcbiAgY29uc3QgaGV4VGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoMzI7IGkgKz0gOCkge1xuICAgIGNvbnN0IHggPSBpbnB1dFtpID4+IDVdID4+PiBpICUgMzIgJiAweGZmO1xuICAgIGNvbnN0IGhleCA9IHBhcnNlSW50KGhleFRhYi5jaGFyQXQoeCA+Pj4gNCAmIDB4MGYpICsgaGV4VGFiLmNoYXJBdCh4ICYgMHgwZiksIDE2KTtcbiAgICBvdXRwdXQucHVzaChoZXgpO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlIG91dHB1dCBsZW5ndGggd2l0aCBwYWRkaW5nIGFuZCBiaXQgbGVuZ3RoXG4gKi9cblxuXG5mdW5jdGlvbiBnZXRPdXRwdXRMZW5ndGgoaW5wdXRMZW5ndGg4KSB7XG4gIHJldHVybiAoaW5wdXRMZW5ndGg4ICsgNjQgPj4+IDkgPDwgNCkgKyAxNCArIDE7XG59XG4vKlxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAqL1xuXG5cbmZ1bmN0aW9uIHdvcmRzVG9NZDUoeCwgbGVuKSB7XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgbGVuICUgMzI7XG4gIHhbZ2V0T3V0cHV0TGVuZ3RoKGxlbikgLSAxXSA9IGxlbjtcbiAgbGV0IGEgPSAxNzMyNTg0MTkzO1xuICBsZXQgYiA9IC0yNzE3MzM4Nzk7XG4gIGxldCBjID0gLTE3MzI1ODQxOTQ7XG4gIGxldCBkID0gMjcxNzMzODc4O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICBjb25zdCBvbGRhID0gYTtcbiAgICBjb25zdCBvbGRiID0gYjtcbiAgICBjb25zdCBvbGRjID0gYztcbiAgICBjb25zdCBvbGRkID0gZDtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpXSwgNywgLTY4MDg3NjkzNik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDFdLCAxMiwgLTM4OTU2NDU4Nik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA3LCAtMTc2NDE4ODk3KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDddLCAyMiwgLTQ1NzA1OTgzKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgOF0sIDcsIDE3NzAwMzU0MTYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDcsIDE4MDQ2MDM2ODIpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsIDEyMzY1MzUzMjkpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNSwgLTE2NTc5NjUxMCk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDZdLCA5LCAtMTA2OTUwMTYzMik7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMyk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaV0sIDIwLCAtMzczODk3MzAyKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgNV0sIDUsIC03MDE1NTg2OTEpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sIDksIC0xMDE5ODAzNjkwKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMTNdLCA1LCAtMTQ0NDY4MTQ2Nyk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDJdLCA5LCAtNTE0MDM3ODQpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA0LCAtMzc4NTU4KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsIDE4MzkwMzA1NjIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNCwgLTE1MzA5OTIwNjApO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA0XSwgMTEsIDEyNzI4OTMzNTMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNCwgNjgxMjc5MTc0KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpXSwgMTEsIC0zNTg1MzcyMjIpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyA2XSwgMjMsIDc2MDI5MTg5KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgOV0sIDQsIC02NDAzNjQ0ODcpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgNTMwNzQyNTIwKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpXSwgNiwgLTE5ODYzMDg0NCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDddLCAxMCwgMTEyNjg5MTQxNSk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDYsIDE3MDA0ODU1NzEpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgOF0sIDYsIDE4NzMzMTMzNTkpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgMTMwOTE1MTY0OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA2LCAtMTQ1NTIzMDcwKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTUsIDcxODc4NzI1OSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG4gICAgYSA9IHNhZmVBZGQoYSwgb2xkYSk7XG4gICAgYiA9IHNhZmVBZGQoYiwgb2xkYik7XG4gICAgYyA9IHNhZmVBZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVBZGQoZCwgb2xkZCk7XG4gIH1cblxuICByZXR1cm4gW2EsIGIsIGMsIGRdO1xufVxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgYnl0ZXMgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gKi9cblxuXG5mdW5jdGlvbiBieXRlc1RvV29yZHMoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGxlbmd0aDggPSBpbnB1dC5sZW5ndGggKiA4O1xuICBjb25zdCBvdXRwdXQgPSBuZXcgVWludDMyQXJyYXkoZ2V0T3V0cHV0TGVuZ3RoKGxlbmd0aDgpKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDg7IGkgKz0gOCkge1xuICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dFtpIC8gOF0gJiAweGZmKSA8PCBpICUgMzI7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLypcbiAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gKi9cblxuXG5mdW5jdGlvbiBzYWZlQWRkKHgsIHkpIHtcbiAgY29uc3QgbHN3ID0gKHggJiAweGZmZmYpICsgKHkgJiAweGZmZmYpO1xuICBjb25zdCBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgcmV0dXJuIG1zdyA8PCAxNiB8IGxzdyAmIDB4ZmZmZjtcbn1cbi8qXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gKi9cblxuXG5mdW5jdGlvbiBiaXRSb3RhdGVMZWZ0KG51bSwgY250KSB7XG4gIHJldHVybiBudW0gPDwgY250IHwgbnVtID4+PiAzMiAtIGNudDtcbn1cbi8qXG4gKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxuICovXG5cblxuZnVuY3Rpb24gbWQ1Y21uKHEsIGEsIGIsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIHNhZmVBZGQoYml0Um90YXRlTGVmdChzYWZlQWRkKHNhZmVBZGQoYSwgcSksIHNhZmVBZGQoeCwgdCkpLCBzKSwgYik7XG59XG5cbmZ1bmN0aW9uIG1kNWZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgYyB8IH5iICYgZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWdnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgZCB8IGMgJiB+ZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWhoKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5mdW5jdGlvbiBtZDVpaShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYyBeIChiIHwgfmQpLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxudmFyIF9kZWZhdWx0ID0gbWQ1O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5jb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xudmFyIF9kZWZhdWx0ID0ge1xuICByYW5kb21VVUlEXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX2RlZmF1bHQgPSAnMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwJztcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3ZhbGlkYXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92YWxpZGF0ZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHBhcnNlKHV1aWQpIHtcbiAgaWYgKCEoMCwgX3ZhbGlkYXRlLmRlZmF1bHQpKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIGxldCB2O1xuICBjb25zdCBhcnIgPSBuZXcgVWludDhBcnJheSgxNik7IC8vIFBhcnNlICMjIyMjIyMjLS4uLi4tLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFyclswXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgwLCA4KSwgMTYpKSA+Pj4gMjQ7XG4gIGFyclsxXSA9IHYgPj4+IDE2ICYgMHhmZjtcbiAgYXJyWzJdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclszXSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0jIyMjLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoOSwgMTMpLCAxNikpID4+PiA4O1xuICBhcnJbNV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0jIyMjLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzZdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDE0LCAxOCksIDE2KSkgPj4+IDg7XG4gIGFycls3XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tIyMjIy0uLi4uLi4uLi4uLi5cblxuICBhcnJbOF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTksIDIzKSwgMTYpKSA+Pj4gODtcbiAgYXJyWzldID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0uLi4uLSMjIyMjIyMjIyMjI1xuICAvLyAoVXNlIFwiL1wiIHRvIGF2b2lkIDMyLWJpdCB0cnVuY2F0aW9uIHdoZW4gYml0LXNoaWZ0aW5nIGhpZ2gtb3JkZXIgYnl0ZXMpXG5cbiAgYXJyWzEwXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgyNCwgMzYpLCAxNikpIC8gMHgxMDAwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMV0gPSB2IC8gMHgxMDAwMDAwMDAgJiAweGZmO1xuICBhcnJbMTJdID0gdiA+Pj4gMjQgJiAweGZmO1xuICBhcnJbMTNdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMTRdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclsxNV0gPSB2ICYgMHhmZjtcbiAgcmV0dXJuIGFycjtcbn1cblxudmFyIF9kZWZhdWx0ID0gcGFyc2U7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gcm5nO1xuLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5cbmZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG4vLyBBZGFwdGVkIGZyb20gQ2hyaXMgVmVuZXNzJyBTSEExIGNvZGUgYXRcbi8vIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvc2hhMS5odG1sXG5mdW5jdGlvbiBmKHMsIHgsIHksIHopIHtcbiAgc3dpdGNoIChzKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIHggJiB5IF4gfnggJiB6O1xuXG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHggXiB5IF4gejtcblxuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ICYgeSBeIHggJiB6IF4geSAmIHo7XG5cbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuICB9XG59XG5cbmZ1bmN0aW9uIFJPVEwoeCwgbikge1xuICByZXR1cm4geCA8PCBuIHwgeCA+Pj4gMzIgLSBuO1xufVxuXG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIGNvbnN0IEsgPSBbMHg1YTgyNzk5OSwgMHg2ZWQ5ZWJhMSwgMHg4ZjFiYmNkYywgMHhjYTYyYzFkNl07XG4gIGNvbnN0IEggPSBbMHg2NzQ1MjMwMSwgMHhlZmNkYWI4OSwgMHg5OGJhZGNmZSwgMHgxMDMyNTQ3NiwgMHhjM2QyZTFmMF07XG5cbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXMucHVzaChtc2cuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGJ5dGVzKSkge1xuICAgIC8vIENvbnZlcnQgQXJyYXktbGlrZSB0byBBcnJheVxuICAgIGJ5dGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnl0ZXMpO1xuICB9XG5cbiAgYnl0ZXMucHVzaCgweDgwKTtcbiAgY29uc3QgbCA9IGJ5dGVzLmxlbmd0aCAvIDQgKyAyO1xuICBjb25zdCBOID0gTWF0aC5jZWlsKGwgLyAxNik7XG4gIGNvbnN0IE0gPSBuZXcgQXJyYXkoTik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyArK2kpIHtcbiAgICBjb25zdCBhcnIgPSBuZXcgVWludDMyQXJyYXkoMTYpO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICBhcnJbal0gPSBieXRlc1tpICogNjQgKyBqICogNF0gPDwgMjQgfCBieXRlc1tpICogNjQgKyBqICogNCArIDFdIDw8IDE2IHwgYnl0ZXNbaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4IHwgYnl0ZXNbaSAqIDY0ICsgaiAqIDQgKyAzXTtcbiAgICB9XG5cbiAgICBNW2ldID0gYXJyO1xuICB9XG5cbiAgTVtOIC0gMV1bMTRdID0gKGJ5dGVzLmxlbmd0aCAtIDEpICogOCAvIE1hdGgucG93KDIsIDMyKTtcbiAgTVtOIC0gMV1bMTRdID0gTWF0aC5mbG9vcihNW04gLSAxXVsxNF0pO1xuICBNW04gLSAxXVsxNV0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4ICYgMHhmZmZmZmZmZjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IE47ICsraSkge1xuICAgIGNvbnN0IFcgPSBuZXcgVWludDMyQXJyYXkoODApO1xuXG4gICAgZm9yIChsZXQgdCA9IDA7IHQgPCAxNjsgKyt0KSB7XG4gICAgICBXW3RdID0gTVtpXVt0XTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCB0ID0gMTY7IHQgPCA4MDsgKyt0KSB7XG4gICAgICBXW3RdID0gUk9UTChXW3QgLSAzXSBeIFdbdCAtIDhdIF4gV1t0IC0gMTRdIF4gV1t0IC0gMTZdLCAxKTtcbiAgICB9XG5cbiAgICBsZXQgYSA9IEhbMF07XG4gICAgbGV0IGIgPSBIWzFdO1xuICAgIGxldCBjID0gSFsyXTtcbiAgICBsZXQgZCA9IEhbM107XG4gICAgbGV0IGUgPSBIWzRdO1xuXG4gICAgZm9yIChsZXQgdCA9IDA7IHQgPCA4MDsgKyt0KSB7XG4gICAgICBjb25zdCBzID0gTWF0aC5mbG9vcih0IC8gMjApO1xuICAgICAgY29uc3QgVCA9IFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW3RdID4+PiAwO1xuICAgICAgZSA9IGQ7XG4gICAgICBkID0gYztcbiAgICAgIGMgPSBST1RMKGIsIDMwKSA+Pj4gMDtcbiAgICAgIGIgPSBhO1xuICAgICAgYSA9IFQ7XG4gICAgfVxuXG4gICAgSFswXSA9IEhbMF0gKyBhID4+PiAwO1xuICAgIEhbMV0gPSBIWzFdICsgYiA+Pj4gMDtcbiAgICBIWzJdID0gSFsyXSArIGMgPj4+IDA7XG4gICAgSFszXSA9IEhbM10gKyBkID4+PiAwO1xuICAgIEhbNF0gPSBIWzRdICsgZSA+Pj4gMDtcbiAgfVxuXG4gIHJldHVybiBbSFswXSA+PiAyNCAmIDB4ZmYsIEhbMF0gPj4gMTYgJiAweGZmLCBIWzBdID4+IDggJiAweGZmLCBIWzBdICYgMHhmZiwgSFsxXSA+PiAyNCAmIDB4ZmYsIEhbMV0gPj4gMTYgJiAweGZmLCBIWzFdID4+IDggJiAweGZmLCBIWzFdICYgMHhmZiwgSFsyXSA+PiAyNCAmIDB4ZmYsIEhbMl0gPj4gMTYgJiAweGZmLCBIWzJdID4+IDggJiAweGZmLCBIWzJdICYgMHhmZiwgSFszXSA+PiAyNCAmIDB4ZmYsIEhbM10gPj4gMTYgJiAweGZmLCBIWzNdID4+IDggJiAweGZmLCBIWzNdICYgMHhmZiwgSFs0XSA+PiAyNCAmIDB4ZmYsIEhbNF0gPj4gMTYgJiAweGZmLCBIWzRdID4+IDggJiAweGZmLCBIWzRdICYgMHhmZl07XG59XG5cbnZhciBfZGVmYXVsdCA9IHNoYTE7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbmV4cG9ydHMudW5zYWZlU3RyaW5naWZ5ID0gdW5zYWZlU3RyaW5naWZ5O1xuXG52YXIgX3ZhbGlkYXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92YWxpZGF0ZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghKDAsIF92YWxpZGF0ZS5kZWZhdWx0KSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxudmFyIF9kZWZhdWx0ID0gc3RyaW5naWZ5O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfcm5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9ybmcuanNcIikpO1xuXG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxubGV0IF9ub2RlSWQ7XG5cbmxldCBfY2xvY2tzZXE7IC8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxuXG5cbmxldCBfbGFzdE1TZWNzID0gMDtcbmxldCBfbGFzdE5TZWNzID0gMDsgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcblxuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgbGV0IGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIGNvbnN0IGIgPSBidWYgfHwgbmV3IEFycmF5KDE2KTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxldCBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIGxldCBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7IC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuXG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlZWRCeXRlcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nLmRlZmF1bHQpKCk7XG5cbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW3NlZWRCeXRlc1swXSB8IDB4MDEsIHNlZWRCeXRlc1sxXSwgc2VlZEJ5dGVzWzJdLCBzZWVkQnl0ZXNbM10sIHNlZWRCeXRlc1s0XSwgc2VlZEJ5dGVzWzVdXTtcbiAgICB9XG5cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgICAgIGNsb2Nrc2VxID0gX2Nsb2Nrc2VxID0gKHNlZWRCeXRlc1s2XSA8PCA4IHwgc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcbiAgICB9XG4gIH0gLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG5cblxuICBsZXQgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogRGF0ZS5ub3coKTsgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuXG4gIGxldCBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTsgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuXG4gIGNvbnN0IGR0ID0gbXNlY3MgLSBfbGFzdE1TZWNzICsgKG5zZWNzIC0gX2xhc3ROU2VjcykgLyAxMDAwMDsgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH0gLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuXG5cbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH0gLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuXG5cbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXVpZC52MSgpOiBDYW4ndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWNcIik7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7IC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwOyAvLyBgdGltZV9sb3dgXG5cbiAgY29uc3QgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmOyAvLyBgdGltZV9taWRgXG5cbiAgY29uc3QgdG1oID0gbXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmOyAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjsgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG5cbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwOyAvLyBgY2xvY2tfc2VxX2xvd2BcblxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7IC8vIGBub2RlYFxuXG4gIGZvciAobGV0IG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKGIpO1xufVxuXG52YXIgX2RlZmF1bHQgPSB2MTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3YgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YzNS5qc1wiKSk7XG5cbnZhciBfbWQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL21kNS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmNvbnN0IHYzID0gKDAsIF92LmRlZmF1bHQpKCd2MycsIDB4MzAsIF9tZC5kZWZhdWx0KTtcbnZhciBfZGVmYXVsdCA9IHYzO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlVSTCA9IGV4cG9ydHMuRE5TID0gdm9pZCAwO1xuZXhwb3J0cy5kZWZhdWx0ID0gdjM1O1xuXG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcblxudmFyIF9wYXJzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcGFyc2UuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBzdHJpbmdUb0J5dGVzKHN0cikge1xuICBzdHIgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSk7IC8vIFVURjggZXNjYXBlXG5cbiAgY29uc3QgYnl0ZXMgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGJ5dGVzLnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpO1xuICB9XG5cbiAgcmV0dXJuIGJ5dGVzO1xufVxuXG5jb25zdCBETlMgPSAnNmJhN2I4MTAtOWRhZC0xMWQxLTgwYjQtMDBjMDRmZDQzMGM4JztcbmV4cG9ydHMuRE5TID0gRE5TO1xuY29uc3QgVVJMID0gJzZiYTdiODExLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnRzLlVSTCA9IFVSTDtcblxuZnVuY3Rpb24gdjM1KG5hbWUsIHZlcnNpb24sIGhhc2hmdW5jKSB7XG4gIGZ1bmN0aW9uIGdlbmVyYXRlVVVJRCh2YWx1ZSwgbmFtZXNwYWNlLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBfbmFtZXNwYWNlO1xuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gc3RyaW5nVG9CeXRlcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuYW1lc3BhY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lc3BhY2UgPSAoMCwgX3BhcnNlLmRlZmF1bHQpKG5hbWVzcGFjZSk7XG4gICAgfVxuXG4gICAgaWYgKCgoX25hbWVzcGFjZSA9IG5hbWVzcGFjZSkgPT09IG51bGwgfHwgX25hbWVzcGFjZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX25hbWVzcGFjZS5sZW5ndGgpICE9PSAxNikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdOYW1lc3BhY2UgbXVzdCBiZSBhcnJheS1saWtlICgxNiBpdGVyYWJsZSBpbnRlZ2VyIHZhbHVlcywgMC0yNTUpJyk7XG4gICAgfSAvLyBDb21wdXRlIGhhc2ggb2YgbmFtZXNwYWNlIGFuZCB2YWx1ZSwgUGVyIDQuM1xuICAgIC8vIEZ1dHVyZTogVXNlIHNwcmVhZCBzeW50YXggd2hlbiBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3JtcywgZS5nLiBgYnl0ZXMgPVxuICAgIC8vIGhhc2hmdW5jKFsuLi5uYW1lc3BhY2UsIC4uLiB2YWx1ZV0pYFxuXG5cbiAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNiArIHZhbHVlLmxlbmd0aCk7XG4gICAgYnl0ZXMuc2V0KG5hbWVzcGFjZSk7XG4gICAgYnl0ZXMuc2V0KHZhbHVlLCBuYW1lc3BhY2UubGVuZ3RoKTtcbiAgICBieXRlcyA9IGhhc2hmdW5jKGJ5dGVzKTtcbiAgICBieXRlc1s2XSA9IGJ5dGVzWzZdICYgMHgwZiB8IHZlcnNpb247XG4gICAgYnl0ZXNbOF0gPSBieXRlc1s4XSAmIDB4M2YgfCAweDgwO1xuXG4gICAgaWYgKGJ1Zikge1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlc1tpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICByZXR1cm4gKDAsIF9zdHJpbmdpZnkudW5zYWZlU3RyaW5naWZ5KShieXRlcyk7XG4gIH0gLy8gRnVuY3Rpb24jbmFtZSBpcyBub3Qgc2V0dGFibGUgb24gc29tZSBwbGF0Zm9ybXMgKCMyNzApXG5cblxuICB0cnkge1xuICAgIGdlbmVyYXRlVVVJRC5uYW1lID0gbmFtZTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gIH0gY2F0Y2ggKGVycikge30gLy8gRm9yIENvbW1vbkpTIGRlZmF1bHQgZXhwb3J0IHN1cHBvcnRcblxuXG4gIGdlbmVyYXRlVVVJRC5ETlMgPSBETlM7XG4gIGdlbmVyYXRlVVVJRC5VUkwgPSBVUkw7XG4gIHJldHVybiBnZW5lcmF0ZVVVSUQ7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfbmF0aXZlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9uYXRpdmUuanNcIikpO1xuXG52YXIgX3JuZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcm5nLmpzXCIpKTtcblxudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChfbmF0aXZlLmRlZmF1bHQucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIF9uYXRpdmUuZGVmYXVsdC5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IF9ybmcuZGVmYXVsdCkoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gKDAsIF9zdHJpbmdpZnkudW5zYWZlU3RyaW5naWZ5KShybmRzKTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdjQ7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MzUuanNcIikpO1xuXG52YXIgX3NoYSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vc2hhMS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmNvbnN0IHY1ID0gKDAsIF92LmRlZmF1bHQpKCd2NScsIDB4NTAsIF9zaGEuZGVmYXVsdCk7XG52YXIgX2RlZmF1bHQgPSB2NTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3JlZ2V4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9yZWdleC5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBfcmVnZXguZGVmYXVsdC50ZXN0KHV1aWQpO1xufVxuXG52YXIgX2RlZmF1bHQgPSB2YWxpZGF0ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3ZhbGlkYXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92YWxpZGF0ZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHZlcnNpb24odXVpZCkge1xuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE1KSwgMTYpO1xufVxuXG52YXIgX2RlZmF1bHQgPSB2ZXJzaW9uO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmV4cG9ydCBlbnVtIEZ1c2VMb2NhdGlvbkFjY3VyYWN5IHtcbiAgICBDT0FSU0UsXG4gICAgRklORVxufVxuIiwiXG4vKlxuQ29weXJpZ2h0IDIwMjMgTm9ybWFuIEJyZWF1IFxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmV4cG9ydCBlbnVtIEZ1c2VMb2NhdGlvbkV2ZW50VHlwZSB7XG4gICAgQVZBSUxBQklMSVRZLFxuICAgIExPQ0FUSU9OXG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtcbiAgICBDb250ZW50VHlwZSxcbiAgICBGdXNlUGx1Z2luLFxuICAgIFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIsXG4gICAgRnVzZUNvbnRleHQsXG4gICAgRnVzZUVycm9yXG59IGZyb20gJ0BuYnNmdXNlL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24sXG4gICAgRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9uc0J1aWxkZXIsXG4gICAgSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnNcbn0gZnJvbSAnLi9GdXNlTG9jYXRpb25TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgRnVzZUxvY2F0aW9uQWNjdXJhY3kgfSBmcm9tICcuL0Z1c2VMb2NhdGlvbkFjY3VyYWN5JztcbmltcG9ydCB7IElGdXNlTG9jYXRpb25VcGRhdGVFdmVudCB9IGZyb20gJy4vSUZ1c2VMb2NhdGlvblVwZGF0ZUV2ZW50JztcbmltcG9ydCB7IElGdXNlTG9jYXRpb25TZXR0aW5nc1N0YXRlIH0gZnJvbSAnLi9JRnVzZUxvY2F0aW9uU2V0dGluZ3NTdGF0ZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGdXNlTG9jYXRpb25QbHVnaW4gZXh0ZW5kcyBGdXNlUGx1Z2luIHtcbiAgICBwcml2YXRlICRjYWxsYmFja0lEOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSAkc3Vic2NyaXB0aW9uczogRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uW107XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29udGV4dDogRnVzZUNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMuJGNhbGxiYWNrSUQgPSBudWxsO1xuICAgICAgICB0aGlzLiRzdWJzY3JpcHRpb25zID0gW107XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9nZXRJRCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ0Z1c2VMb2NhdGlvbic7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHdhdGNoKGFjY3VyYWN5OiBGdXNlTG9jYXRpb25BY2N1cmFjeSwganVzdGlmaWNhdGlvbkhhbmRsZXI6IFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIpOiBQcm9taXNlPEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbj4ge1xuICAgICAgICBsZXQgYnVpbGRlcjogRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9uc0J1aWxkZXIgPSBuZXcgRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9uc0J1aWxkZXIoKTtcbiAgICAgICAgYnVpbGRlci5zZXRBY2N1cmFjeShhY2N1cmFjeSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnN1YnNjcmliZShidWlsZGVyLmJ1aWxkKCksIGp1c3RpZmljYXRpb25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jICRpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy4kY2FsbGJhY2tJRCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kY2FsbGJhY2tJRCA9IHRoaXMuX2NyZWF0ZUNhbGxiYWNrKChkYXRhOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBldmVudDogSUZ1c2VMb2NhdGlvblVwZGF0ZUV2ZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb250ZXh0KCkuZ2V0TG9nZ2VyKCkuZXJyb3IoJ0Vycm9yIHBhcnNpbmcgTG9jYXRpb24gVXBkYXRlIGV2ZW50JywgRnVzZUVycm9yLndyYXAoZXgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLiRzdWJzY3JpcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN1YjogRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy4kc3Vic2NyaXB0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzdWIubm90aWZ5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29udGV4dCgpLmdldExvZ2dlcigpLmVycm9yKCdGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24gSGFuZGxlciBFcnJvcjonLCBGdXNlRXJyb3Iud3JhcChleCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL2NhbGxiYWNrJywgQ29udGVudFR5cGUuVEVYVCwgdGhpcy4kY2FsbGJhY2tJRCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBhYnN0cmFjdCBhc3NlcnRTZXR0aW5ncyhvcHRpb25zOiBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucyk6IFByb21pc2U8SUZ1c2VMb2NhdGlvblNldHRpbmdzU3RhdGU+O1xuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9zdWJzY3JpYmUob3B0aW9uczogSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnMsIGp1c3RpZmljYXRpb25IYW5kbGVyOiBURnVzZUp1c3RpZmljYXRpb25IYW5kbGVyKTogUHJvbWlzZTxGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24+O1xuXG4gICAgcHVibGljIGFzeW5jIHN1YnNjcmliZShvcHRpb25zOiBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucywganVzdGlmaWNhdGlvbkhhbmRsZXI6IFRGdXNlSnVzdGlmaWNhdGlvbkhhbmRsZXIpOiBQcm9taXNlPEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbj4ge1xuICAgICAgICBpZiAodGhpcy4kY2FsbGJhY2tJRCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy4kaW5pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbjogRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uID0gYXdhaXQgdGhpcy5fc3Vic2NyaWJlKG9wdGlvbnMsIGp1c3RpZmljYXRpb25IYW5kbGVyKTtcblxuICAgICAgICB0aGlzLiRzdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcblxuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1bnN1YnNjcmliZShzdWJzY3JpcHRpb246IEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuJHN1YnNjcmlwdGlvbnMuaW5kZXhPZihzdWJzY3JpcHRpb24pO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy4kc3Vic2NyaXB0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5fZXhlYygnL3Vuc3Vic2NyaWJlJywgQ29udGVudFR5cGUuVEVYVCwgc3Vic2NyaXB0aW9uLmdldElEKCkpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIE5vcm1hbiBCcmVhdSBcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5pbXBvcnQgeyBGdXNlQ29udGV4dCwgRnVzZUVycm9yLCBQbGF0Zm9ybSB9IGZyb20gXCJAbmJzZnVzZS9jb3JlXCI7XG5pbXBvcnQgeyBGdXNlTG9jYXRpb25QbHVnaW4gfSBmcm9tIFwiLi9GdXNlTG9jYXRpb25QbHVnaW5cIjtcbmltcG9ydCB7IEFuZHJvaWRGdXNlTG9jYXRpb25QbHVnaW4gfSBmcm9tIFwiLi9hbmRyb2lkL0FuZHJvaWRGdXNlTG9jYXRpb25QbHVnaW5cIjtcblxuZXhwb3J0IGNsYXNzIEZ1c2VMb2NhdGlvblBsdWdpbkZhY3Rvcnkge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgY3JlYXRlKGNvbnRleHQ6IEZ1c2VDb250ZXh0KTogRnVzZUxvY2F0aW9uUGx1Z2luIHtcbiAgICAgICAgc3dpdGNoIChjb250ZXh0LmdldFBsYXRmb3JtKCkpIHtcbiAgICAgICAgICAgIGNhc2UgUGxhdGZvcm0uQU5EUk9JRDogcmV0dXJuIG5ldyBBbmRyb2lkRnVzZUxvY2F0aW9uUGx1Z2luKGNvbnRleHQpO1xuICAgICAgICAgICAgY2FzZSBQbGF0Zm9ybS5JT1M6IHJldHVybiBudWxsO1xuICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEZ1c2VFcnJvcignRnVzZUxvY2F0aW9uUGx1Z2luRmFjdG9yeScsIGBVbnN1cHBvcnRlZCBwbGF0Zm9ybTogJHtjb250ZXh0LmdldFBsYXRmb3JtKCl9YCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtcbiAgICBGdXNlRXJyb3IsXG4gICAgRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdFxufSBmcm9tICdAbmJzZnVzZS9jb3JlJztcbmltcG9ydCB7IEZ1c2VMb2NhdGlvbkFjY3VyYWN5IH0gZnJvbSAnLi9GdXNlTG9jYXRpb25BY2N1cmFjeSc7XG5pbXBvcnQgeyBURnVzZVNlcmlhbGl6YWJsZSB9IGZyb20gJ0BuYnNmdXNlL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBURnVzZUdlb2xvY2F0aW9uUG9pbnRcbn0gZnJvbSAnLi9URnVzZUdlb2xvY2F0aW9uUG9pbnQnO1xuaW1wb3J0IHsgSUZ1c2VMb2NhdGlvbkF2YWlsYWJpbGl0eUV2ZW50IH0gZnJvbSAnLi9JRnVzZUxvY2F0aW9uQXZhaWxhYmlsaXR5RXZlbnQnO1xuaW1wb3J0IHsgSUZ1c2VMb2NhdGlvblVwZGF0ZUV2ZW50IH0gZnJvbSAnLi9JRnVzZUxvY2F0aW9uVXBkYXRlRXZlbnQnO1xuaW1wb3J0IHsgRnVzZUxvY2F0aW9uRXZlbnRUeXBlIH0gZnJvbSAnLi9GdXNlTG9jYXRpb25FdmVudFR5cGUnO1xuaW1wb3J0IHsgSUZ1c2VMb2NhdGlvblNldHRpbmdzU3RhdGUgfSBmcm9tICcuL0lGdXNlTG9jYXRpb25TZXR0aW5nc1N0YXRlJztcbmltcG9ydCB7IEZ1c2VMb2NhdGlvblBsdWdpbiB9IGZyb20gJy4vRnVzZUxvY2F0aW9uUGx1Z2luJztcblxuaW50ZXJmYWNlIF9fSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnMge1xuICAgIGFjY3VyYWN5OiBGdXNlTG9jYXRpb25BY2N1cmFjeTtcbiAgICBpbnRlcnZhbDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucyA9IFRGdXNlU2VyaWFsaXphYmxlPF9fSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnM+O1xuXG5leHBvcnQgY2xhc3MgRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9uc0J1aWxkZXIge1xuICAgIHByaXZhdGUgJGFjY3VyYWN5OiBGdXNlTG9jYXRpb25BY2N1cmFjeTtcbiAgICBwcml2YXRlICRpbnRlcnZhbDogbnVtYmVyO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiRhY2N1cmFjeSA9IEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkNPQVJTRTtcbiAgICAgICAgdGhpcy4kaW50ZXJ2YWwgPSAxMDAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGRlc2lyZWQgYWNjdXJhY3kuXG4gICAgICogXG4gICAgICogV2hldGhlciB0aGlzIGlzIGhvbm91cmVkIGRlcGVuZHMgaWYgdGhlIHVzZXIgZ3JhbnRzIHRoZSBhcHByb3ByaWF0ZSBwZXJtaXNzaW9uLlxuICAgICAqIFxuICAgICAqIEBkZWZhdWx0IEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkNPQVJTRVxuICAgICAqIEBwYXJhbSBhY2N1cmFjeSBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0QWNjdXJhY3koYWNjdXJhY3k6IEZ1c2VMb2NhdGlvbkFjY3VyYWN5KTogRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9uc0J1aWxkZXIge1xuICAgICAgICB0aGlzLiRhY2N1cmFjeSA9IGFjY3VyYWN5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW50ZXJ2YWwgdG8gcmVjZWl2ZSBHUFMgcG9pbnRzLiBUaGlzIGFjdHMgbGlrZSBhIGhpbnQgYnV0IGV2ZW50c1xuICAgICAqIG1heSBjb21lIHF1aWNrZXIgb3Igc2xvd2VyIHRoYW4gdGhlIGRlc2lyZWQgaW50ZXJ2YWwuIFNldmVyYWwgZGVjaWRpbmcgZmFjdG9yc1xuICAgICAqIGluY2x1ZGluZyBidXQgbm90IGxpbWl0ZWQgdG8gb3RoZXIgc2VydmljZXMgYWxzbyB1c2luZyBHUFMgYW5kIHRoZSBHUFMgaGVhbHRoLlxuICAgICAqIFxuICAgICAqIEBkZWZhdWx0IDEwMDBcbiAgICAgKiBAcGFyYW0gaW50ZXJ2YWwgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIHNldEludGVydmFsKGludGVydmFsOiBudW1iZXIpOiBGdXNlTG9jYXRpb25TdWJzY3JpcHRpb25PcHRpb25zQnVpbGRlciB7XG4gICAgICAgIHRoaXMuJGludGVydmFsID0gaW50ZXJ2YWw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyBidWlsZCgpOiBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY2N1cmFjeTogdGhpcy4kYWNjdXJhY3ksXG4gICAgICAgICAgICBpbnRlcnZhbDogdGhpcy4kaW50ZXJ2YWxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFRGdXNlTG9jYXRpb25IYW5kbGVyID0gKHBvaW50OiBSZWFkb25seTxURnVzZUdlb2xvY2F0aW9uUG9pbnQ+W10pID0+IHZvaWQ7XG5cbmV4cG9ydCBjbGFzcyBGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24ge1xuICAgIHByaXZhdGUgJHBsdWdpbjogRnVzZUxvY2F0aW9uUGx1Z2luO1xuICAgIHByaXZhdGUgJGNhbGxiYWNrczogVEZ1c2VMb2NhdGlvbkhhbmRsZXJbXTtcbiAgICBwcml2YXRlICRkZXNpcmVkQWNjdXJhY3k6IEZ1c2VMb2NhdGlvbkFjY3VyYWN5O1xuICAgIHByaXZhdGUgJGdyYW50czogRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdDxGdXNlTG9jYXRpb25BY2N1cmFjeT47XG4gICAgcHJpdmF0ZSAkaWQ6IHN0cmluZztcbiAgICBwcml2YXRlICRvcHRpb25zOiBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucztcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwbHVnaW46IEZ1c2VMb2NhdGlvblBsdWdpbiwgaWQ6IHN0cmluZywgb3B0aW9uczogSUZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbk9wdGlvbnMsIGdyYW50UmVzdWx0OiBGdXNlUGVybWlzc2lvbkdyYW50UmVzdWx0PEZ1c2VMb2NhdGlvbkFjY3VyYWN5Pikge1xuICAgICAgICB0aGlzLiRwbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMuJGlkID0gaWQ7XG4gICAgICAgIHRoaXMuJGNhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLiRvcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy4kZ3JhbnRzID0gZ3JhbnRSZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldElEKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLiRpZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNBdXRob3JpemVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy4kZ3JhbnRzLmlzR3JhbnRlZCh0aGlzLiRkZXNpcmVkQWNjdXJhY3kpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlcihjYjogVEZ1c2VMb2NhdGlvbkhhbmRsZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy4kY2FsbGJhY2tzLnB1c2goY2IpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1bnJlZ2lzdGVyKGNiOiBURnVzZUxvY2F0aW9uSGFuZGxlcik6IHZvaWQge1xuICAgICAgICBsZXQgaWR4OiBudW1iZXIgPSB0aGlzLiRjYWxsYmFja3MuaW5kZXhPZihjYik7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy4kY2FsbGJhY2tzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5vdGlmeShldmVudDogSUZ1c2VMb2NhdGlvbkF2YWlsYWJpbGl0eUV2ZW50IHwgSUZ1c2VMb2NhdGlvblVwZGF0ZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudC50eXBlID09PSBGdXNlTG9jYXRpb25FdmVudFR5cGUuTE9DQVRJT04pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLiRjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY2I6IFRGdXNlTG9jYXRpb25IYW5kbGVyID0gdGhpcy4kY2FsbGJhY2tzW2ldO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaChleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwbHVnaW4uZ2V0Q29udGV4dCgpLmdldExvZ2dlcigpLmVycm9yKFwiVEZ1c2VMb2NhdGlvbkhhbmRsZXIgZXJyb3JcIiwgRnVzZUVycm9yLndyYXAoZXgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRwbHVnaW4uZ2V0Q29udGV4dCgpLmdldExvZ2dlcigpLmluZm8oXCJSZWNlaXZlZCB1bmhhbmRsZWQgQXZhaWxhYmlsaXR5IGV2ZW50XCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGFzc2VydFNldHRpbmdzKCk6IFByb21pc2U8SUZ1c2VMb2NhdGlvblNldHRpbmdzU3RhdGU+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuJHBsdWdpbi5hc3NlcnRTZXR0aW5ncyh0aGlzLiRvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy4kcGx1Z2luLnVuc3Vic2NyaWJlKHRoaXMpO1xuICAgIH1cbn07XG4iLCJcbi8qXG5Db3B5cmlnaHQgMjAyMyBOb3JtYW4gQnJlYXUgXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcblxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuaW1wb3J0IHtcbiAgICBDb250ZW50VHlwZSxcbiAgICBGdXNlQVBJUmVzcG9uc2UsXG4gICAgRnVzZVBlcm1pc3Npb25HcmFudFJlc3VsdCxcbiAgICBGdXNlUGVybWlzc2lvblJlcXVlc3QsXG4gICAgVEZ1c2VKdXN0aWZpY2F0aW9uSGFuZGxlclxufSBmcm9tIFwiQG5ic2Z1c2UvY29yZVwiO1xuaW1wb3J0IHsgRnVzZUxvY2F0aW9uUGx1Z2luIH0gZnJvbSBcIi4uL0Z1c2VMb2NhdGlvblBsdWdpblwiO1xuaW1wb3J0IHsgRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uLCBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucyB9IGZyb20gXCIuLi9GdXNlTG9jYXRpb25TdWJzY3JpcHRpb25cIjtcbmltcG9ydCB7IElGdXNlTG9jYXRpb25TZXR0aW5nc1N0YXRlIH0gZnJvbSBcIi4uL0lGdXNlTG9jYXRpb25TZXR0aW5nc1N0YXRlXCI7XG5pbXBvcnQgeyBGdXNlTG9jYXRpb25BY2N1cmFjeSB9IGZyb20gXCIuLi9GdXNlTG9jYXRpb25BY2N1cmFjeVwiO1xuXG5leHBvcnQgY2xhc3MgQW5kcm9pZEZ1c2VMb2NhdGlvblBsdWdpbiBleHRlbmRzIEZ1c2VMb2NhdGlvblBsdWdpbiB7XG4gICAgcHVibGljIG92ZXJyaWRlIGFzeW5jIGFzc2VydFNldHRpbmdzKG9wdGlvbnM6IElGdXNlTG9jYXRpb25TdWJzY3JpcHRpb25PcHRpb25zKTogUHJvbWlzZTxJRnVzZUxvY2F0aW9uU2V0dGluZ3NTdGF0ZT4ge1xuICAgICAgICBsZXQgcmVzOiBGdXNlQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9leGVjKCcvYXNzZXJ0U2V0dGluZ3MnLCBDb250ZW50VHlwZS5KU09OLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHJlcy5yZWFkQXNKU09OKCk7XG4gICAgfVxuICAgIFxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBfc3Vic2NyaWJlKG9wdGlvbnM6IElGdXNlTG9jYXRpb25TdWJzY3JpcHRpb25PcHRpb25zLCBqdXN0aWZpY2F0aW9uSGFuZGxlcjogVEZ1c2VKdXN0aWZpY2F0aW9uSGFuZGxlcik6IFByb21pc2U8RnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uPiB7XG4gICAgICAgIGxldCBwZXJtUmVxdWVzdDogRnVzZVBlcm1pc3Npb25SZXF1ZXN0PEZ1c2VMb2NhdGlvbkFjY3VyYWN5PiA9IG5ldyBGdXNlUGVybWlzc2lvblJlcXVlc3QodGhpcy5fY3JlYXRlQVBJQnJpZGdlKCcvcmVxdWVzdFBlcm1pc3Npb25zJyksIFtvcHRpb25zLmFjY3VyYWN5XSwganVzdGlmaWNhdGlvbkhhbmRsZXIpO1xuICAgICAgICBsZXQgZ3JhbnRSZXN1bHQ6IEZ1c2VQZXJtaXNzaW9uR3JhbnRSZXN1bHQ8RnVzZUxvY2F0aW9uQWNjdXJhY3k+ID0gbnVsbDtcbiAgICAgICAgZ3JhbnRSZXN1bHQgPSBhd2FpdCBwZXJtUmVxdWVzdC5yZXF1ZXN0KCk7XG5cbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbklEOiBzdHJpbmcgPSBudWxsO1xuICAgICAgICBsZXQgcmVzOiBGdXNlQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9leGVjKCcvc3Vic2NyaWJlJywgQ29udGVudFR5cGUuSlNPTiwgb3B0aW9ucyk7XG4gICAgICAgIHN1YnNjcmlwdGlvbklEID0gYXdhaXQgcmVzLnJlYWRBc1RleHQoKTtcblxuICAgICAgICByZXR1cm4gbmV3IEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbih0aGlzLCBzdWJzY3JpcHRpb25JRCwgb3B0aW9ucywgZ3JhbnRSZXN1bHQpO1xuICAgIH1cbn1cbiIsIlxuLypcbkNvcHlyaWdodCAyMDIzIE5vcm1hbiBCcmVhdSBcblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuXG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5leHBvcnQge1xuICAgIEZ1c2VMb2NhdGlvblBsdWdpblxufSBmcm9tICcuL0Z1c2VMb2NhdGlvblBsdWdpbic7XG5leHBvcnQge0Z1c2VMb2NhdGlvblBsdWdpbkZhY3Rvcnl9IGZyb20gJy4vRnVzZUxvY2F0aW9uUGx1Z2luRmFjdG9yeSc7XG5leHBvcnQge1xuICAgIEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbixcbiAgICBGdXNlTG9jYXRpb25TdWJzY3JpcHRpb25PcHRpb25zQnVpbGRlcixcbiAgICBJRnVzZUxvY2F0aW9uU3Vic2NyaXB0aW9uT3B0aW9ucyxcbiAgICBURnVzZUxvY2F0aW9uSGFuZGxlclxufSBmcm9tICcuL0Z1c2VMb2NhdGlvblN1YnNjcmlwdGlvbic7XG5leHBvcnQge0Z1c2VMb2NhdGlvbkV2ZW50VHlwZX0gZnJvbSAnLi9GdXNlTG9jYXRpb25FdmVudFR5cGUnO1xuZXhwb3J0IHtJRnVzZUxvY2F0aW9uVXBkYXRlRXZlbnR9IGZyb20gJy4vSUZ1c2VMb2NhdGlvblVwZGF0ZUV2ZW50JztcbmV4cG9ydCB7SUZ1c2VMb2NhdGlvbkF2YWlsYWJpbGl0eUV2ZW50fSBmcm9tICcuL0lGdXNlTG9jYXRpb25BdmFpbGFiaWxpdHlFdmVudCc7XG5leHBvcnQge0Z1c2VMb2NhdGlvbkFjY3VyYWN5fSBmcm9tICcuL0Z1c2VMb2NhdGlvbkFjY3VyYWN5JztcbmV4cG9ydCB7XG4gICAgVEZ1c2VHZW9sb2NhdGlvblBvaW50LFxuICAgIElGdXNlR2VvbG9jYXRpb25Qcm9wZXJ0aWVzXG59IGZyb20gJy4vVEZ1c2VHZW9sb2NhdGlvblBvaW50JztcbmV4cG9ydCB7SUZ1c2VMb2NhdGlvblNldHRpbmdzU3RhdGV9IGZyb20gJy4vSUZ1c2VMb2NhdGlvblNldHRpbmdzU3RhdGUnO1xuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG5cblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1Jcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufVxuXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgdFtwXSA9IHNbcF07XG4gIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgfVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XG4gIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxuICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xuICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XG4gIHZhciBfLCBkb25lID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XG4gICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcbiAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xuICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcbiAgICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XG4gIGRvbmUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcbiAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XG4gIH1cbiAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gIH1cbn1cblxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIG9bazJdID0gbVtrXTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcbiAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xuICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgfVxuICB9O1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xuICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gIGlmICghbSkgcmV0dXJuIG87XG4gIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICB0cnkge1xuICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gIGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgIH1cbiAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICB9XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XG4gIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xuICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgcltrXSA9IGFbal07XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xuICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgfVxuICB9XG4gIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XG4gIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcbiAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cbiAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxuICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cbiAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xuICB2YXIgaSwgcDtcbiAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xuICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcbiAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgcmV0dXJuIGNvb2tlZDtcbn07XG5cbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gIG9bXCJkZWZhdWx0XCJdID0gdjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XG4gIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xuICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XG4gIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xuICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcbiAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcbiAgICB2YXIgZGlzcG9zZTtcbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xuICAgICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XG4gICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcbiAgfVxuICBlbHNlIGlmIChhc3luYykge1xuICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XG4gIGZ1bmN0aW9uIGZhaWwoZSkge1xuICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcbiAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xuICB9XG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgd2hpbGUgKGVudi5zdGFjay5sZW5ndGgpIHtcbiAgICAgIHZhciByZWMgPSBlbnYuc3RhY2sucG9wKCk7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjLmRpc3Bvc2UgJiYgcmVjLmRpc3Bvc2UuY2FsbChyZWMudmFsdWUpO1xuICAgICAgICBpZiAocmVjLmFzeW5jKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XG4gIH1cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBfX2V4dGVuZHMsXG4gIF9fYXNzaWduLFxuICBfX3Jlc3QsXG4gIF9fZGVjb3JhdGUsXG4gIF9fcGFyYW0sXG4gIF9fbWV0YWRhdGEsXG4gIF9fYXdhaXRlcixcbiAgX19nZW5lcmF0b3IsXG4gIF9fY3JlYXRlQmluZGluZyxcbiAgX19leHBvcnRTdGFyLFxuICBfX3ZhbHVlcyxcbiAgX19yZWFkLFxuICBfX3NwcmVhZCxcbiAgX19zcHJlYWRBcnJheXMsXG4gIF9fc3ByZWFkQXJyYXksXG4gIF9fYXdhaXQsXG4gIF9fYXN5bmNHZW5lcmF0b3IsXG4gIF9fYXN5bmNEZWxlZ2F0b3IsXG4gIF9fYXN5bmNWYWx1ZXMsXG4gIF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxuICBfX2ltcG9ydFN0YXIsXG4gIF9faW1wb3J0RGVmYXVsdCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEluLFxuICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcbiAgX19kaXNwb3NlUmVzb3VyY2VzLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLypcbiAgIENvcHlyaWdodCAyMDE5IFRvdGFsIFBhdmUgSW5jLlxuXG4gICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG5cbiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuICAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmltcG9ydCB7XG4gICAgRnVzZUNvbnRleHQsXG4gICAgRnVzZUNvbnRleHRCdWlsZGVyXG59IGZyb20gJ0BuYnNmdXNlL2NvcmUnO1xuXG5pbXBvcnQge1xuICAgIEZ1c2VMb2NhdGlvblBsdWdpbixcbiAgICBGdXNlTG9jYXRpb25BY2N1cmFjeSxcbiAgICBGdXNlTG9jYXRpb25TdWJzY3JpcHRpb24sXG4gICAgVEZ1c2VHZW9sb2NhdGlvblBvaW50LFxuICAgIEZ1c2VMb2NhdGlvblBsdWdpbkZhY3Rvcnlcbn0gZnJvbSAnLi4vLi4vc3JjL2FwaSc7XG5cbmxldCBkYXRhQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcbmxldCBwbHVnaW46IEZ1c2VMb2NhdGlvblBsdWdpbjtcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTGlzdGVuZXIobW9kZTogRnVzZUxvY2F0aW9uQWNjdXJhY3kpOiBQcm9taXNlPEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbj4ge1xuICAgIGxldCBzdWJzY3JpcHRpb246IEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbiA9IGF3YWl0IHBsdWdpbi53YXRjaChtb2RlLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgc3Vic2NyaXB0aW9uLnJlZ2lzdGVyKChwb2ludHM6IFJlYWRvbmx5PFRGdXNlR2VvbG9jYXRpb25Qb2ludD5bXSkgPT4ge1xuICAgICAgICBsZXQgbGFzdFBvaW50OiBURnVzZUdlb2xvY2F0aW9uUG9pbnQgfCBudWxsID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGFzdFBvaW50ID0gcG9pbnRzW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFsYXN0UG9pbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgbGV0IGRhdGE6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICAgICAgIGRhdGEuaW5uZXJIVE1MID0gSlNPTi5zdHJpbmdpZnkobGFzdFBvaW50LCBudWxsLCA0KTtcbiAgICAgICAgZGF0YUNvbnRhaW5lci5hcHBlbmRDaGlsZChkYXRhKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG59XG5cbndpbmRvdy5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGJ1aWxkZXI6IEZ1c2VDb250ZXh0QnVpbGRlciA9IG5ldyBGdXNlQ29udGV4dEJ1aWxkZXIoKTtcbiAgICBsZXQgY29udGV4dDogRnVzZUNvbnRleHQgPSBhd2FpdCBidWlsZGVyLmJ1aWxkKCk7XG4gICAgcGx1Z2luID0gbmV3IEZ1c2VMb2NhdGlvblBsdWdpbkZhY3RvcnkoKS5jcmVhdGUoY29udGV4dCk7XG4gICAgKHdpbmRvdyBhcyBhbnkpLnBsdWdpbiA9IHBsdWdpbjtcblxuICAgIGxldCBjdXJyZW50TW9kZTogRnVzZUxvY2F0aW9uQWNjdXJhY3kgfCBudWxsID0gbnVsbDtcblxuICAgIGxldCB0b2dnbGVGaW5lQnRuOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRvZ2dsZUZpbmVCdG4uaW5uZXJIVE1MID0gJ1RvZ2dsZSBGaW5lIExvY2F0aW9uJztcblxuICAgIGxldCB0b2dnbGVDb2Fyc2VCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdG9nZ2xlQ29hcnNlQnRuLmlubmVySFRNTCA9ICdUb2dnbGUgQ29hcnNlIExvY2F0aW9uJztcbiAgICBcbiAgICBsZXQgY2hlY2tCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY2hlY2tCdG4uaW5uZXJIVE1MID0gJ0NoZWNrIFNldHRpbmdzJztcbiAgICBcblxuICAgIGxldCBzdWJzY3JpcHRpb246IEZ1c2VMb2NhdGlvblN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuXG4gICAgdG9nZ2xlRmluZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgYXdhaXQgc3Vic2NyaXB0aW9uLnJlbGVhc2UoKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgICAgICBkYXRhQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudE1vZGUgIT09IEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkZJTkUpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBhd2FpdCBjcmVhdGVMaXN0ZW5lcihGdXNlTG9jYXRpb25BY2N1cmFjeS5GSU5FKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50TW9kZSA9IEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkZJTkU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50TW9kZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSBhd2FpdCBjcmVhdGVMaXN0ZW5lcihGdXNlTG9jYXRpb25BY2N1cmFjeS5GSU5FKTtcbiAgICAgICAgICAgIGN1cnJlbnRNb2RlID0gRnVzZUxvY2F0aW9uQWNjdXJhY3kuRklORTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdG9nZ2xlQ29hcnNlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBhd2FpdCBzdWJzY3JpcHRpb24ucmVsZWFzZSgpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIGRhdGFDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjdXJyZW50TW9kZSAhPT0gRnVzZUxvY2F0aW9uQWNjdXJhY3kuQ09BUlNFKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gYXdhaXQgY3JlYXRlTGlzdGVuZXIoRnVzZUxvY2F0aW9uQWNjdXJhY3kuQ09BUlNFKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50TW9kZSA9IEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkNPQVJTRTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRNb2RlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IGF3YWl0IGNyZWF0ZUxpc3RlbmVyKEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkNPQVJTRSk7XG4gICAgICAgICAgICBjdXJyZW50TW9kZSA9IEZ1c2VMb2NhdGlvbkFjY3VyYWN5LkNPQVJTRTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY2hlY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBkYXRhQ29udGFpbmVyLmlubmVySFRNTCA9ICdzdWJzY3JpcHRpb24gcmVxdWlyZWQuJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKGF3YWl0IHN1YnNjcmlwdGlvbi5hc3NlcnRTZXR0aW5ncygpKTtcbiAgICB9KTtcblxuICAgIGRhdGFDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodG9nZ2xlRmluZUJ0bik7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b2dnbGVDb2Fyc2VCdG4pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2hlY2tCdG4pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGF0YUNvbnRhaW5lcik7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9