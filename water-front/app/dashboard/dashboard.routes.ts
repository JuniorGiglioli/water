import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TypographyComponent } from './typography/typography.component';
import { MapsComponent } from './maps/maps.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { LoginComponent } from './core/login/login.component';
import { OAuth2Callback } from './core/oauth2/oauth2-callback.component';
import { OAuth2Guard } from './core/service/oauth2-guard/oauth2-guard';

export const MODULE_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'loginExternal',
        component: LoginComponent,
        resolve: {
            loginPage: LoginComponent
        }
    },
    { path: 'oauth2/callback', component: OAuth2Callback },
    {
        path: '', component: HomeComponent, canActivate: [OAuth2Guard],
        children: [
            { path: 'dashboard', component: HomeComponent },
            { path: 'user', component: UserComponent },
            { path: 'table', component: TableComponent },
            { path: 'icons', component: IconsComponent },
            { path: 'notifications', component: NotificationsComponent },
            { path: 'typography', component: TypographyComponent },
            { path: 'maps', component: MapsComponent },
            { path: 'upgrade', component: UpgradeComponent }
        ]
    },
    //    { path: '**', component: PageNotFoundComponent }
]

export const MODULE_COMPONENTS = [
    HomeComponent,
    UserComponent,
    TableComponent,
    IconsComponent,
    NotificationsComponent,
    TypographyComponent,
    MapsComponent,
    UpgradeComponent,
    DashboardComponent
]
