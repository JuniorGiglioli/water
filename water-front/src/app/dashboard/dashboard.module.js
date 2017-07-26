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
var forms_1 = require('@angular/forms');
var dashboard_routes_1 = require('./dashboard.routes');
var common_1 = require('@angular/common');
var sidebar_module_1 = require('./../sidebar/sidebar.module');
var navbar_module_1 = require('./../shared/navbar/navbar.module');
var footer_module_1 = require('./../shared/footer/footer.module');
var message_service_1 = require('./core/message/message.service');
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(dashboard_routes_1.MODULE_ROUTES), common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, sidebar_module_1.SidebarModule, navbar_module_1.NavbarModule, footer_module_1.FooterModule
            ],
            providers: [message_service_1.MessageService],
            declarations: [dashboard_routes_1.MODULE_COMPONENTS]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map