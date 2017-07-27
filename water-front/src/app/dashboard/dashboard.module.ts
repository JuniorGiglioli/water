import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MODULE_ROUTES, MODULE_COMPONENTS } from './dashboard.routes';
import { CommonModule } from '@angular/common';
import { SidebarModule } from './../sidebar/sidebar.module';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { SharedModule } from './../shared/shared.module';
import { FooterModule } from './../shared/footer/footer.module';
import { MessageService } from './core/message/message.service';


@NgModule( {
    imports: [
        RouterModule.forRoot( MODULE_ROUTES ), CommonModule,
        FormsModule, ReactiveFormsModule, SidebarModule, NavbarModule, SharedModule , FooterModule
    ],
    providers: [MessageService],
    declarations: [MODULE_COMPONENTS]
} )

export class DashboardModule { }
