"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var requester_1 = require('../requester/requester');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var MyCookieXSRFStrategy = (function (_super) {
    __extends(MyCookieXSRFStrategy, _super);
    function MyCookieXSRFStrategy() {
        _super.call(this);
    }
    return MyCookieXSRFStrategy;
}(http_1.CookieXSRFStrategy));
var ApiRest = (function () {
    function ApiRest() {
        var injector = core_1.ReflectiveInjector.resolveAndCreate([
            http_1.Http, http_1.BrowserXhr, requester_1.Requester,
            { provide: http_1.ConnectionBackend, useClass: http_1.XHRBackend },
            { provide: http_1.ResponseOptions, useClass: http_1.BaseResponseOptions },
            { provide: http_1.XSRFStrategy, useClass: MyCookieXSRFStrategy },
            { provide: http_1.RequestOptions, useClass: http_1.BaseRequestOptions }
        ]);
        this.requester = injector.get(requester_1.Requester);
    }
    /**
     * Use the get when you need getter a list of a type.
     * Use the id parameter for return a specific object by Id
     */
    ApiRest.prototype.get = function (id) {
        var pathComplete = this.getBaseUrl() + this.getResourcePath();
        if (id) {
            pathComplete += '/' + id;
        }
        return this.requester.get(pathComplete);
    };
    /**
     * Use the post when you need create a new object
     */
    ApiRest.prototype.post = function (body) {
        return this.requester.post(this.getBaseUrl() + this.getResourcePath(), body);
    };
    /**
     * Use the put when you need update a object
     */
    ApiRest.prototype.put = function (id, body) {
        if (id === void 0) { id = 0; }
        return this.requester.put(this.getBaseUrl() + this.getResourcePath(), body);
    };
    /**
     * Use the delete when you need delete a object
     */
    ApiRest.prototype.delete = function (id) {
        if (id === void 0) { id = 0; }
        return this.requester.delete(this.getBaseUrl() + this.getResourcePath() + '/' + id);
    };
    /**
     * Return a Requester for helper in specifics methods of class which implements ApiRest
     */
    ApiRest.prototype.getRequester = function () {
        return this.requester;
    };
    /**
     * Return the base url
     */
    ApiRest.prototype.getBaseUrl = function () {
        //TODO buscar de configService
        return 'https://localhost:8443/water-back';
    };
    ApiRest = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ApiRest);
    return ApiRest;
}());
exports.ApiRest = ApiRest;
//# sourceMappingURL=api-rest.js.map