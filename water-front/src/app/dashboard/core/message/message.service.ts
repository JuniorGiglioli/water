import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Message, Status } from './../message/message';

export * from './message';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();

    private timeoutAlert: any;


    public send( message: Message ) {
        this.sendArray( [message] )
    }


    public sendArray( messages: Array<Message> ) {

        this.subject.next( messages );

        if ( this.timeoutAlert != null ) {
            clearTimeout( this.timeoutAlert );
        }

        this.timeoutAlert = setTimeout(() => {
            this.clearMessage();
        }, 8000 );
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}