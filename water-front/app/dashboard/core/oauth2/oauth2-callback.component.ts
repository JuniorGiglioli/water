import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from './../constants';
import { LoginService } from './../login/login.service';
import { ResponseAuthorization } from './response-authorization';

@Component( {
    moduleId: module.id,
    selector: '<oauth2-callback></oauth2-callback>',
    templateUrl: './oauth2-callback.component.html',
    styleUrls: ['./oauth2-callback.component.css']
} )

export class OAuth2Callback {

    private parameters: { [id: string]: string; };

    constructor( router: Router, private loginService: LoginService ) {

        this.parameters = this.getParameters( router.url );

        var responseAuthorization: ResponseAuthorization = this.getResponse( this.parameters );

        this.loginService.doLogin( responseAuthorization );

        router.navigate( ['/'] );
    }


    private getParameters( url: string ) {
        var hashMap = {};

        if ( url && url.includes( '#' ) ) {
            var splitQuery = url.split( '#' );

            if ( splitQuery && splitQuery.length > 1 ) {
                var query: string = splitQuery[1];

                this.setQueryInHashMap( query, hashMap );
            }
        }
        return hashMap;
    }


    private setQueryInHashMap( query: string, hashMap: { [id: string]: string; } ) {
        if ( query && query.includes( "&" ) ) {
            var parameters = query.split( "&" );

            for ( var keyParameters in parameters ) {
                var parameter = parameters[keyParameters];

                if ( parameter && parameter.includes( "=" ) ) {
                    var pairParameter = parameter.split( "=" );
                    hashMap[pairParameter[0]] = pairParameter[1];
                }
            }
        }
    }

    private getResponse( parameters: { [id: string]: string; } ): ResponseAuthorization {

        var acessToken = parameters[Constants.OAUTH.ACCESS_TOKEN];
        var expiresIn = Number( parameters[Constants.OAUTH.EXPIRES_IN] );
        var scope = parameters[Constants.OAUTH.SCOPE];
        var tokenType = parameters[Constants.OAUTH.TOKEN_TYPE];

        return new ResponseAuthorization( acessToken, expiresIn, scope, tokenType );
    }
}