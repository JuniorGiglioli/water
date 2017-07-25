import { Requester } from '../requester/requester';
import { Injectable, Inject, Injector, ReflectiveInjector, APP_INITIALIZER, OnInit } from '@angular/core';
import { HttpModule, BaseRequestOptions, XHRBackend, Http, BrowserXhr, ConnectionBackend, ResponseOptions, XSRFStrategy, RequestOptions, BaseResponseOptions, CookieXSRFStrategy } from '@angular/http';

class MyCookieXSRFStrategy extends CookieXSRFStrategy {
    constructor() {
        super();
    }
}

@Injectable()
export abstract class ApiRest {

    private requester: Requester;

    constructor() {

        let injector = ReflectiveInjector.resolveAndCreate( [
            Http, BrowserXhr, Requester,
            { provide: ConnectionBackend, useClass: XHRBackend },
            { provide: ResponseOptions, useClass: BaseResponseOptions },
            { provide: XSRFStrategy, useClass: MyCookieXSRFStrategy },
            { provide: RequestOptions, useClass: BaseRequestOptions }
        ] );

        this.requester = injector.get( Requester );
    }


    /**
     * Return the resource path of a resource
     *
     * Obs.: It is responsibility of the class which implements define the resource path
     */
    public abstract getResourcePath();


    /**
     * Use the get when you need getter a list of a type.
     * Use the id parameter for return a specific object by Id
     */
    public get( id?: number ) {

        var pathComplete = this.getBaseUrl() + this.getResourcePath();

        if ( id ) {
            pathComplete += '/' + id;
        }
        return this.requester.get( pathComplete );
    }


    /**
     * Use the post when you need create a new object
     */
    public post( body: {} ) {
        return this.requester.post( this.getBaseUrl() + this.getResourcePath(), body );
    }


    /**
     * Use the put when you need update a object
     */
    public put( id: number = 0, body: {} ) {
        return this.requester.put( this.getBaseUrl() + this.getResourcePath(), body );
    }


    /**
     * Use the delete when you need delete a object
     */
    public delete( id: number = 0 ) {
        return this.requester.delete( this.getBaseUrl() + this.getResourcePath() + '/' + id );
    }


    /**
     * Return a Requester for helper in specifics methods of class which implements ApiRest
     */
    public getRequester() {
        return this.requester;
    }


    /**
     * Return the base url
     */
    public getBaseUrl() {
        //TODO buscar de configService
        return 'https://localhost:8443/water-back';
    }
}