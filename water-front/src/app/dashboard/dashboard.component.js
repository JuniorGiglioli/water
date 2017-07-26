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
var common_1 = require('@angular/common');
var message_service_1 = require('../dashboard/core/message/message.service');
var DashboardComponent = (function () {
    function DashboardComponent(location, messageService) {
        var _this = this;
        this.messageService = messageService;
        this.location = location;
        // subscribe to home component messages
        this.subscription = this.messageService.getMessage().subscribe(function (messages) {
            console.log("Gayzou 0->>>>>>>>>" + messages);
            _this.messages = messages;
        });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        $.getScript('../assets/js/material-dashboard.js');
        $.getScript('../assets/js/initMenu.js');
    };
    DashboardComponent.prototype.isMaps = function (path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        return path != titlee;
    };
    // unsubscribe to ensure no memory leaks
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    DashboardComponent.prototype.closeAlert = function () {
        this.messageService.clearMessage();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard-cmp',
            moduleId: module.id,
            templateUrl: 'dashboard.component.html'
        }), 
        __metadata('design:paramtypes', [common_1.Location, message_service_1.MessageService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map