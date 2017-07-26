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
var oauth_exception_1 = require('../exceptions/oauth-exception');
var response_exception_1 = require('../exceptions/response-exception');
//TODO Analisar melhor a dependência com o modulo shared
var message_service_1 = require('../../core/message/message.service');
var MyErrorHandler = (function () {
    function MyErrorHandler(messageService) {
        this.messageService = messageService;
    }
    MyErrorHandler.prototype.handleError = function (error) {
        if (error instanceof response_exception_1.ResponseException) {
            var response = JSON.parse(error.body);
            for (var _i = 0, _a = response.errors; _i < _a.length; _i++) {
                var responseError = _a[_i];
                responseError.status = message_service_1.Status.DANGER;
            }
            this.messageService.sendArray(response.errors);
        }
        else if (error instanceof oauth_exception_1.AuthHttpException) {
            //TODO verificar console.log
            console.log(error.message, JSON.parse(error.body));
        }
        else {
            console.error(error);
        }
    };
    MyErrorHandler = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [message_service_1.MessageService])
    ], MyErrorHandler);
    return MyErrorHandler;
}());
exports.MyErrorHandler = MyErrorHandler;
//# sourceMappingURL=error-handler.js.map