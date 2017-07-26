"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var constants_1 = require('./../constants');
var login_service_1 = require('./../login/login.service');
var response_authorization_1 = require('./response-authorization');
var OAuth2Callback = (function () {
    function OAuth2Callback(router, loginService) {
        this.loginService = loginService;
        this.parameters = this.getParameters(router.url);
        var responseAuthorization = this.getResponse(this.parameters);
        this.loginService.doLogin(responseAuthorization);
        router.navigate(['/']);
    }
    OAuth2Callback.prototype.getParameters = function (url) {
        var hashMap = {};
        if (url && url.includes('#')) {
            var splitQuery = url.split('#');
            if (splitQuery && splitQuery.length > 1) {
                var query = splitQuery[1];
                this.setQueryInHashMap(query, hashMap);
            }
        }
        return hashMap;
    };
    OAuth2Callback.prototype.setQueryInHashMap = function (query, hashMap) {
        if (query && query.includes("&")) {
            var parameters = query.split("&");
            for (var keyParameters in parameters) {
                var parameter = parameters[keyParameters];
                if (parameter && parameter.includes("=")) {
                    var pairParameter = parameter.split("=");
                    hashMap[pairParameter[0]] = pairParameter[1];
                }
            }
        }
    };
    OAuth2Callback.prototype.getResponse = function (parameters) {
        var acessToken = parameters[constants_1.Constants.OAUTH.ACCESS_TOKEN];
        var expiresIn = Number(parameters[constants_1.Constants.OAUTH.EXPIRES_IN]);
        var scope = parameters[constants_1.Constants.OAUTH.SCOPE];
        var tokenType = parameters[constants_1.Constants.OAUTH.TOKEN_TYPE];
        return new response_authorization_1.ResponseAuthorization(acessToken, expiresIn, scope, tokenType);
    };
    OAuth2Callback = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '<oauth2-callback></oauth2-callback>',
            templateUrl: './oauth2-callback.component.html',
            styleUrls: ['./oauth2-callback.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService])
    ], OAuth2Callback);
    return OAuth2Callback;
}());
exports.OAuth2Callback = OAuth2Callback;
//# sourceMappingURL=oauth2-callback.component.js.map