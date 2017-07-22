import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import initDemo = require('../../../assets/js/charts.js');
import { Location } from '@angular/common';

declare var $:any;

@Component({
    selector: 'home-cmp',
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit{
    
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
