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
var constants_1 = require('../../core/constants');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
// used for calculation of token expiration
var EXPIRATION_FLOAT = 1000;
var LoginSession = (function () {
    function LoginSession(router) {
        this.router = router;
    }
    LoginSession.prototype.createSession = function (responseAuthorization) {
        // save parameters in localstorage
        localStorage.setItem(constants_1.Constants.OAUTH.ACCESS_TOKEN, responseAuthorization.getAccessToken());
        localStorage.setItem(constants_1.Constants.OAUTH.SCOPE, responseAuthorization.getScope());
        localStorage.setItem(constants_1.Constants.OAUTH.EXPIRES_IN, String(responseAuthorization.getExpiresIn()));
        var createdTime = String(new Date().getTime());
        localStorage.setItem(constants_1.Constants.OAUTH.CREATED_TIME, createdTime);
        this.startExpiresTimer(responseAuthorization.getExpiresIn());
    };
    LoginSession.prototype.clearSession = function () {
        localStorage.clear();
        this.router.navigate(['/login']);
    };
    LoginSession.prototype.isLogged = function () {
        var accessToken = localStorage.getItem(constants_1.Constants.OAUTH.ACCESS_TOKEN);
        var expiresIn = localStorage.getItem(constants_1.Constants.OAUTH.EXPIRES_IN);
        var createdTime = localStorage.getItem(constants_1.Constants.OAUTH.CREATED_TIME);
        if (accessToken && expiresIn) {
            var currentTime = new Date().getTime();
            var diff = currentTime - Number(createdTime);
            if ((Number(expiresIn) * EXPIRATION_FLOAT) >= diff) {
                return true;
            }
            localStorage.clear();
        }
        return false;
    };
    LoginSession.prototype.startExpiresTimer = function (seconds) {
        var _this = this;
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(function () {
            localStorage.clear();
            _this.router.navigate(['/loginExternal']);
        }, seconds * 1000);
        console.log('Token expiration timer set for', seconds, "seconds");
    };
    LoginSession = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], LoginSession);
    return LoginSession;
}());
exports.LoginSession = LoginSession;
//# sourceMappingURL=login-session.js.map