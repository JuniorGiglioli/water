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
var login_session_1 = require('./login/login-session');
var login_component_1 = require('./login/login.component');
var login_service_1 = require('./login/login.service');
var requester_1 = require('./service/requester/requester');
var oauth2_callback_component_1 = require('./oauth2/oauth2-callback.component');
var message_service_1 = require('./message/message.service');
var config_service_1 = require('./service/config/config.service');
var oauth2_guard_1 = require('./service/oauth2-guard/oauth2-guard');
var error_handler_1 = require('./handler/error-handler');
var CoreModule = (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule],
            declarations: [login_component_1.LoginComponent, oauth2_callback_component_1.OAuth2Callback],
            providers: [config_service_1.ConfigService, message_service_1.MessageService, login_service_1.LoginService,
                {
                    useFactory: function (config) { return function () { return config.load(); }; },
                    provide: core_1.APP_INITIALIZER,
                    deps: [config_service_1.ConfigService],
                    multi: true
                },
                oauth2_guard_1.OAuth2Guard,
                login_component_1.LoginComponent,
                login_session_1.LoginSession,
                requester_1.Requester,
                { provide: core_1.LOCALE_ID, useValue: 'pt-BR' },
                { provide: core_1.ErrorHandler, useClass: error_handler_1.MyErrorHandler }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map