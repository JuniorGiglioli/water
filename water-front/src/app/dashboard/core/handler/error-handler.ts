import { ErrorHandler, ViewChild, Injector, Injectable } from '@angular/core';
import { Response } from './../../core/message/response-message';

import { AuthHttpException } from '../exceptions/oauth-exception';
import { ResponseException } from '../exceptions/response-exception';

// TODO Analisar melhor a dependência com o modulo shared
import { MessageService, Message, Status } from '../../core/message/message.service';

@Injectable()
export class MyErrorHandler implements ErrorHandler {

    constructor( private messageService: MessageService ) {
    }


    public handleError( error ) {
        if ( error instanceof ResponseException ) {
            const response: Response = JSON.parse( error.body );

            for ( const responseError of response.errors ) {
                responseError.status = Status.DANGER;
            }

            this.messageService.sendArray( response.errors );
        } else if ( error instanceof AuthHttpException ) {
            // TODO verificar console.log
            console.log( error.message, JSON.parse( error.body ) );
        } else {
            console.error( error );
        }
    }
}