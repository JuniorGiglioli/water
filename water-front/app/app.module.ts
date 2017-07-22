import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { CoreModule } from './dashboard/core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule( {
    imports: [
        HttpModule,
        BrowserModule,
        DashboardModule,
        CoreModule,
        RouterModule
    ],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent]
} )
export class AppModule { }
