import { Constants } from '../../core/constants';
import { ResponseAuthorization } from './../oauth2/response-authorization';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// used for calculation of token expiration
const EXPIRATION_FLOAT = 1000;

@Injectable()
export class LoginSession {

    private expiresTimerId;

    constructor( private router: Router ) {
    }

    public createSession( responseAuthorization: ResponseAuthorization ) {

        // save parameters in localstorage
        localStorage.setItem(Constants.OAUTH.ACCESS_TOKEN, responseAuthorization.getAccessToken() );
        localStorage.setItem(Constants.OAUTH.SCOPE, responseAuthorization.getScope() );
        localStorage.setItem(Constants.OAUTH.EXPIRES_IN, String( responseAuthorization.getExpiresIn() ) );

        const createdTime = String( new Date().getTime() );

        localStorage.setItem( Constants.OAUTH.CREATED_TIME, createdTime );

        this.startExpiresTimer( responseAuthorization.getExpiresIn() );
    }


    public clearSession() {
        localStorage.clear();
        this.router.navigate( ['/login'] );
    }

    public isLogged(): boolean {

        const accessToken: string = localStorage.getItem( Constants.OAUTH.ACCESS_TOKEN );
        const expiresIn = localStorage.getItem( Constants.OAUTH.EXPIRES_IN );
        const createdTime = localStorage.getItem( Constants.OAUTH.CREATED_TIME );

        if ( accessToken && expiresIn ) {

            const currentTime: number = new Date().getTime();

            const diff = currentTime - Number( createdTime );

            if (( Number( expiresIn ) * EXPIRATION_FLOAT ) >= diff ) {
                return true;
            }

            localStorage.clear();
        }
        return false;
    }

    private startExpiresTimer( seconds: number ) {

        if ( this.expiresTimerId != null ) {
            clearTimeout( this.expiresTimerId );
        }

        this.expiresTimerId = setTimeout(() => {
            localStorage.clear();
            this.router.navigate( ['/loginExternal'] );
        }, seconds * 1000 );
        console.log( 'Token expiration timer set for', seconds, 'seconds' );
    }
}
