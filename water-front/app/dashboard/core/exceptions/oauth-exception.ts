export class AuthHttpException implements Error {

    public name: 'AuthHttpException';

    public message: string;

    public status: number;

    public body: string;

    constructor( message?: string, status?: number, body?: string ) {
        if ( message ) {
            this.message = message;
        }

        if ( status ) {
            this.status = status;
        }

        if ( body ) {
            this.body = body;
        }
    }
}
