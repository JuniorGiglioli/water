import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Constants } from '../constants';
import { ResponseAuthorization } from './../oauth2/response-authorization';
import { ConfigService } from '../service/config/config.service';
import { Requester } from '../service/requester/requester';
import { LoginSession } from './login-session';

@Injectable()
export class LoginService {

    constructor( private router: Router, private http: Http, private loginSession: LoginSession, private configService: ConfigService, private requester: Requester ) {
    }

    public doLogin( responseAuthorization: ResponseAuthorization ) {
        this.loginSession.createSession( responseAuthorization );
        this.fetchUserInfo();
    }

    public doLogout() {
        let accessToken = this.getAccessToken();
        // logout from authorization server?
        // this.logoutAuthorizationServer(accessToken);
        this.loginSession.clearSession();
    }


    getUserInfo() {
        let userInfo = localStorage.getItem( Constants.STORAGE.USER_INFO );
        if ( userInfo ) {
            return JSON.parse( userInfo );
        }
        return null;
    }

    public fetchUserInfo() {

        let promisse = this.requester.get( this.configService.getConfig().getUserInfoUrl() );

        promisse.then( userInfo => {
            localStorage.setItem( Constants.STORAGE.USER_INFO, JSON.stringify( userInfo ) );
        } ).catch(( error: Response ) => {
            if ( error.status == Constants.HTTP_STATUS.UNAUTHORIZED || error.status == Constants.HTTP_STATUS.FORBIDDEN ) {
                this.loginSession.clearSession();
                this.router.navigate( ['/'] );
            }
            console.error( "Failed to fetch user info:", error );
        } );
    }


    private logoutAuthorizationServer( accessToken: string ) {
        let userInfo = this.getUserInfo();
        if ( userInfo ) {
            let logoutUrl = this.configService.getConfig().getLogoutUrl();

            let url: string = logoutUrl.replace( '__userId__', userInfo['id'] );

            let promisse = this.requester.get( url, null, { 'Accept': 'text/plain' } );

            promisse.then(( response: Response ) => {
                let iframe = window.document.getElementById( 'logoutFrame' );

                iframe.setAttribute( 'src', response.url );
            } ).catch( err => {
                console.error( "Failed to logout info:", err );
            } );
        }
    }

    public getAccessToken() {
        return localStorage.getItem( Constants.OAUTH.ACCESS_TOKEN );
    }
}
