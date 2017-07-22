import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_ROUTES, MODULE_COMPONENTS } from './dashboard.routes';
import { CommonModule } from '@angular/common';
import { SidebarModule } from './../sidebar/sidebar.module';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { FooterModule } from './../shared/footer/footer.module';


@NgModule( {
    imports: [
        RouterModule.forRoot( MODULE_ROUTES ), CommonModule, SidebarModule, NavbarModule, FooterModule
    ],
    declarations: [ MODULE_COMPONENTS ]
} )

export class DashboardModule { }
