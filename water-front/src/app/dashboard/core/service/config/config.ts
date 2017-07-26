export class Config {

    private callbackUrl: string;

    private userInfoUrl: string;

    private userInfoNameField: string;

    private authorizationEndpoint: string;

    private clientId: string;

    private scopes: string;

    private logoutUrl: string;

    private resourceServer: string;

    private profileUrl: string;

    public getCallbackUrl(): string {
        return this.callbackUrl;
    }

    public getUserInfoUrl(): string {
        return this.userInfoUrl;
    }

    public getUserInfoNameField(): string {
        return this.userInfoNameField;
    }

    public getAuthorizationEndpoint(): string {
        return this.authorizationEndpoint;
    }

    public getClientId(): string {
        return this.clientId;
    }

    public getScopes(): string {
        return this.scopes;
    }

    public getLogoutUrl(): string {
        return this.logoutUrl;
    }

    public getResourceServer(): string {
        return this.resourceServer;
    }

    public getProfileUrl(): string {
        return this.profileUrl;
    }
}