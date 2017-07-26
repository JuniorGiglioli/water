"use strict";
var dashboard_component_1 = require('./dashboard.component');
var home_component_1 = require('./home/home.component');
var person_form_component_1 = require('./person/person-form.component');
var icons_component_1 = require('./icons/icons.component');
var table_component_1 = require('./table/table.component');
var notifications_component_1 = require('./notifications/notifications.component');
var typography_component_1 = require('./typography/typography.component');
var login_component_1 = require('./core/login/login.component');
var oauth2_callback_component_1 = require('./core/oauth2/oauth2-callback.component');
var oauth2_guard_1 = require('./core/service/oauth2-guard/oauth2-guard');
exports.MODULE_ROUTES = [
    { path: 'login', component: login_component_1.LoginComponent },
    {
        path: 'loginExternal',
        component: login_component_1.LoginComponent,
        resolve: {
            loginPage: login_component_1.LoginComponent
        }
    },
    { path: 'oauth2/callback', component: oauth2_callback_component_1.OAuth2Callback },
    {
        //path: '', component: DashboardComponent, canActivate: [OAuth2Guard],
        path: '', component: dashboard_component_1.DashboardComponent, canActivate: [oauth2_guard_1.OAuth2Guard],
        children: [
            { path: 'dashboard', component: home_component_1.HomeComponent },
            { path: 'person', component: person_form_component_1.PersonFormComponent },
            { path: 'table', component: table_component_1.TableComponent },
            { path: 'icons', component: icons_component_1.IconsComponent },
            { path: 'notifications', component: notifications_component_1.NotificationsComponent },
            { path: 'typography', component: typography_component_1.TypographyComponent },
        ]
    },
];
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    person_form_component_1.PersonFormComponent,
    table_component_1.TableComponent,
    icons_component_1.IconsComponent,
    notifications_component_1.NotificationsComponent,
    typography_component_1.TypographyComponent,
    dashboard_component_1.DashboardComponent
];
//# sourceMappingURL=dashboard.routes.js.map