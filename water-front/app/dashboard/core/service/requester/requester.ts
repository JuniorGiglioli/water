import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs'

import { Constants } from '../../constants';
import { AuthHttpException } from '../../exceptions/oauth-exception';
import { ResponseException } from '../../exceptions/response-exception';

@Injectable()
export class Requester {

    constructor( private http: Http ) {
    }


    /**
     * Example of use:
     *
     *  constructor(private requester: Requester) {
     *    let promise = requester.get('https://localhost/api/v1/person', {'paramter1': 'value'}, {'header1': 'value'});
     *
     *    promise.then((resolve) => {
     *      console.log('Json:', resolve);
     *    }).catch(error => {
     *      console.log('Error:', error);
     *    });
     *
     * }
     */
    public get( url: string, search?: { [index: string]: any; }, headers?: { [index: string]: any; } ) {

        let options = this.getOptions( search, headers );

        let response = this.http.get( url, options );

        return this.getPromise( response );
    }


    public post( url: string, body?: { [index: string]: any; }, search?: { [index: string]: any; }, headers?: { [index: string]: any; } ) {

        let options = this.getOptions( search, headers );

        var bodyJson = null;

        if ( body ) {
            options.headers.append( Constants.HEADER.CONTENT_TYPE, Constants.HEADER_VALUE.APPLICATION_JSON );
            bodyJson = JSON.stringify( body );
        }

        let response = this.http.post( url, bodyJson, options );

        return this.getPromise( response );
    }


    public delete( url: string, search?: { [index: string]: any; }, headers?: { [index: string]: any; } ) {

        let options = this.getOptions( search, headers );

        let response = this.http.delete( url, options );

        return this.getPromiseWithoutBody( response );
    }


    public put( url: string, body?: { [index: string]: any; }, search?: { [index: string]: any; }, headers?: { [index: string]: any; } ) {

        let options = this.getOptions( search, headers );

        var bodyJson = null;

        if ( body ) {
            options.headers.append( Constants.HEADER.CONTENT_TYPE, Constants.HEADER_VALUE.APPLICATION_JSON );
            bodyJson = JSON.stringify( body );
        }

        let response = this.http.put( url, bodyJson, options );

        return this.getPromise( response );
    }


    private getPromise( response: Observable<Response> ) {
        return new Promise(( resolve, reject ) => {
            response.subscribe(( data: Response ) => {
                resolve( data.json() );
            }, ( error: Response ) => {
                reject( error );
                this.treatError( error );
            } );
        } );
    }

    private getPromiseWithoutBody( response: Observable<Response> ) {
        return new Promise(( resolve, reject ) => {
            response.map( result => result.ok ).subscribe(() => {
                resolve();
            }, ( error: Response ) => {
                reject( error );
                this.treatError( error );
            } );
        } );
    }


    private treatError( error: Response ) {

        if ( error.status == Constants.HTTP_STATUS.BAD_REQUEST ) {
            throw new ResponseException( error.statusText, error.status, error['_body'] );
        }
        if ( error.status == Constants.HTTP_STATUS.UNAUTHORIZED || error.status == Constants.HTTP_STATUS.FORBIDDEN ) {
            throw new AuthHttpException( error.statusText, error.status, error['_body'] );
        }
        if ( error.status == Constants.HTTP_STATUS.INTERNAL_ERROR ) {
            //TODO Tratar erro no Back
            let errors = { errors: [{ message: 'Erro interno', status: 'danger' }] };
            throw new ResponseException( "Erro interno", error.status, JSON.stringify( errors ) );
        }
    }


    private getOptions( search: { [index: string]: any; } = {}, headers: { [index: string]: any; } = {} ): RequestOptionsArgs {
        var options = {};
        if ( search ) {
            options['search'] = this.getURLSearchParams( search );
        }
        if ( headers ) {
            options['headers'] = this.getHeaders( headers );
        }
        return options;
    }


    private getURLSearchParams( search: { [index: string]: any; } = {} ): URLSearchParams {
        let uRLSearchParams = new URLSearchParams();

        Object.entries( search ).forEach(
            ( [key, value] ) => {
                uRLSearchParams.append( key, value );
            }
        );

        return uRLSearchParams;
    }


    private getHeaders( headersMap: { [index: string]: any; } = {} ): Headers {
        let headers = new Headers();

        Object.entries( headersMap ).forEach(
            ( [key, value] ) => {
                headers.append( key, value );
            }
        );

        let accessToken = localStorage.getItem( Constants.OAUTH.ACCESS_TOKEN );

        if ( accessToken ) {
            headers.append( Constants.HEADER.AUTHORIZATION, `Bearer ${accessToken}` );
        }

        return headers;
    }
}