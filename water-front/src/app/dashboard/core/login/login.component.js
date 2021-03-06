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
var config_service_1 = require('./../service/config/config.service');
var login_session_1 = require('./login-session');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var LoginComponent = (function () {
    function LoginComponent(configService, router, loginSession) {
        this.configService = configService;
        this.router = router;
        this.loginSession = loginSession;
        if (this.loginSession.isLogged()) {
            this.router.navigate(['/']);
        }
    }
    LoginComponent.prototype.getUrlImplicit = function () {
        var config = this.configService.getConfig();
        return config.getAuthorizationEndpoint() + "?redirect_uri=" + config.getCallbackUrl() + "&response_type=token&client_id=" + config.getClientId() + "&scope=" + config.getScopes();
    };
    LoginComponent.prototype.resolve = function () {
        window.location.href = this.getUrlImplicit();
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '<login></login>',
            templateUrl: './login.component.html'
        }), 
        __metadata('design:paramtypes', [config_service_1.ConfigService, router_1.Router, login_session_1.LoginSession])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map