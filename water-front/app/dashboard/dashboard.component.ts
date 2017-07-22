import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component( {
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
} )

export class DashboardComponent implements OnInit {
    location: Location;
    constructor( location: Location ) {
        this.location = location;
    }
    ngOnInit() {
        $.getScript( '../assets/js/material-dashboard.js' );
        $.getScript( '../assets/js/initMenu.js' );
    }
    public isMaps( path ) {
        var titlee = this.location.prepareExternalUrl( this.location.path() );
        titlee = titlee.slice( 1 );
        if ( path == titlee ) {
            return false;
        }
        else {
            return true;
        }
    }


}
