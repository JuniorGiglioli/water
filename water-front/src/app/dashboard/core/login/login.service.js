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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var constants_1 = require('../constants');
var config_service_1 = require('../service/config/config.service');
var requester_1 = require('../service/requester/requester');
var login_session_1 = require('./login-session');
var LoginService = (function () {
    function LoginService(router, http, loginSession, configService, requester) {
        this.router = router;
        this.http = http;
        this.loginSession = loginSession;
        this.configService = configService;
        this.requester = requester;
    }
    LoginService.prototype.doLogin = function (responseAuthorization) {
        this.loginSession.createSession(responseAuthorization);
        this.fetchUserInfo();
    };
    LoginService.prototype.doLogout = function () {
        var accessToken = this.getAccessToken();
        // logout from authorization server?
        // this.logoutAuthorizationServer(accessToken);
        this.loginSession.clearSession();
    };
    LoginService.prototype.getUserInfo = function () {
        var userInfo = localStorage.getItem(constants_1.Constants.STORAGE.USER_INFO);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    };
    LoginService.prototype.fetchUserInfo = function () {
        var _this = this;
        var promisse = this.requester.get(this.configService.getConfig().getUserInfoUrl());
        promisse.then(function (userInfo) {
            localStorage.setItem(constants_1.Constants.STORAGE.USER_INFO, JSON.stringify(userInfo));
        }).catch(function (error) {
            if (error.status == constants_1.Constants.HTTP_STATUS.UNAUTHORIZED || error.status == constants_1.Constants.HTTP_STATUS.FORBIDDEN) {
                _this.loginSession.clearSession();
                _this.router.navigate(['/']);
            }
            console.error("Failed to fetch user info:", error);
        });
    };
    LoginService.prototype.logoutAuthorizationServer = function (accessToken) {
        var userInfo = this.getUserInfo();
        if (userInfo) {
            var logoutUrl = this.configService.getConfig().getLogoutUrl();
            var url = logoutUrl.replace('__userId__', userInfo['id']);
            var promisse = this.requester.get(url, null, { 'Accept': 'text/plain' });
            promisse.then(function (response) {
                var iframe = window.document.getElementById('logoutFrame');
                iframe.setAttribute('src', response.url);
            }).catch(function (err) {
                console.error("Failed to logout info:", err);
            });
        }
    };
    LoginService.prototype.getAccessToken = function () {
        return localStorage.getItem(constants_1.Constants.OAUTH.ACCESS_TOKEN);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, login_session_1.LoginSession, config_service_1.ConfigService, requester_1.Requester])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map