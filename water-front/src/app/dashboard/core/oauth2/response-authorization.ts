export class ResponseAuthorization {

    constructor( private accessToken: string, private expiresIn: number, private tokenType: string, private scope: string ) {
    }

    getAccessToken() {
        return this.accessToken;
    }

    setAccessToken( accessToken: string ) {
        this.accessToken = accessToken;
    }

    getExpiresIn() {
        return this.expiresIn;
    }

    setExpiresIn( expiresIn: number ) {
        this.expiresIn = expiresIn;
    }

    getTokenType() {
        return this.tokenType;
    }

    setTokenType( tokenType: string ) {
        this.tokenType = tokenType;
    }

    getScope() {
        return this.scope;
    }

    setScope( scope: string ) {
        this.scope = scope;
    }
}