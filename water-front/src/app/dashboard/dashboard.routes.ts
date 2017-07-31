import { Routes } from '@angular/router';

import { LoginComponent } from './core/login/login.component';
import { OAuth2Callback } from './core/oauth2/oauth2-callback.component';
import { OAuth2Guard } from './core/service/oauth2-guard/oauth2-guard';
import { DashboardComponent } from './dashboard.component';

import { HomeComponent } from './home/home.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TypographyComponent } from './typography/typography.component';

import { PersonFormComponent } from './person/form/person-form.component';
import { PersonListComponent } from './person/list/person-list.component';

import { CreditFormComponent } from './credit/form/credit-form.component';
import { CreditListComponent } from './credit/list/credit-list.component';

import { DebitFormComponent } from './debit/form/debit-form.component';
import { DebitListComponent } from './debit/list/debit-list.component';

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
        // path: '', component: DashboardComponent, canActivate: [OAuth2Guard],
        path: '', component: DashboardComponent, canActivate: [OAuth2Guard],
        children: [
            { path: 'dashboard', component: HomeComponent },
            { path: 'person', component: PersonListComponent },
            { path: 'person/form', component: PersonFormComponent },
            { path: 'person/form/:id', component: PersonFormComponent },
            { path: 'credit', component: CreditListComponent },
            { path: 'credit/form', component: CreditFormComponent },
            { path: 'credit/form/:id', component: CreditFormComponent },
            { path: 'debit', component: DebitListComponent },
            { path: 'debit/form', component: DebitFormComponent },
            { path: 'debit/form/:id', component: DebitFormComponent },
            { path: 'table', component: TableComponent },
            { path: 'icons', component: IconsComponent },
            { path: 'notifications', component: NotificationsComponent },
            { path: 'typography', component: TypographyComponent },
        ]
    },
    //    { path: '**', component: PageNotFoundComponent }
];

export const MODULE_COMPONENTS = [
    HomeComponent,
    PersonFormComponent,
    PersonListComponent,
    CreditFormComponent,
    CreditListComponent,
    DebitFormComponent,
    DebitListComponent,
    TableComponent,
    IconsComponent,
    NotificationsComponent,
    TypographyComponent,
    DashboardComponent
];
