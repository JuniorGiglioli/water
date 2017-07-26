import { ConfigService } from './../service/config/config.service';
import { LoginSession } from './login-session';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component( {
    moduleId: module.id,
    selector: '<login></login>',
    templateUrl: './login.component.html'
} )

export class LoginComponent {

    constructor( private configService: ConfigService, private router: Router, private loginSession: LoginSession ) {
        if ( this.loginSession.isLogged() ) {
            this.router.navigate( ['/'] );
        }
    }

    private getUrlImplicit() {

        const config = this.configService.getConfig();
        console.log(`${config.getAuthorizationEndpoint()}?redirect_uri=${config.getCallbackUrl()}&response_type=token&client_id=${config.getClientId()}&scope=${config.getScopes()}`);

        return `${config.getAuthorizationEndpoint()}?redirect_uri=${config.getCallbackUrl()}&response_type=token&client_id=${config.getClientId()}&scope=${config.getScopes()}`;
    }

    public resolve() {
        window.location.href = this.getUrlImplicit();
    }
}