import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { LoginSession } from '../../../core/login/login-session';

@Injectable()
export class OAuth2Guard implements CanActivate {

    constructor( private router: Router, private loginSession: LoginSession ) { }

    canActivate() {
        if ( this.loginSession.isLogged() ) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate( ['/login'] );
        return false;
    }
}