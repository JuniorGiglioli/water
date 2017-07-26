import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { MessageService } from '../dashboard/core/message/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component( {
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
} )

export class DashboardComponent implements OnInit {
    location: Location;
    public messages: Array<any>;
    public subscription: Subscription;

    constructor( location: Location, private messageService: MessageService ) {
        this.location = location;

        // subscribe to home component messages
        this.subscription = this.messageService.getMessage().subscribe( messages => {
            console.log("Gayzou 0->>>>>>>>>" + messages)
            this.messages = messages;
        } );
    }

    ngOnInit() {
        $.getScript( '../assets/js/material-dashboard.js' );
        $.getScript( '../assets/js/initMenu.js' );
    }

    public isMaps( path ) {
        var titlee = this.location.prepareExternalUrl( this.location.path() );
        titlee = titlee.slice( 1 );
        return path != titlee;
    }

    // unsubscribe to ensure no memory leaks
    ngOnDestroy() {

        this.subscription.unsubscribe();
    }

    public closeAlert() {
        this.messageService.clearMessage();
    }

}
