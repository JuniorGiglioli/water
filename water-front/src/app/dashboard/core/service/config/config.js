"use strict";
var Config = (function () {
    function Config() {
    }
    Config.prototype.getCallbackUrl = function () {
        return this.callbackUrl;
    };
    Config.prototype.getUserInfoUrl = function () {
        return this.userInfoUrl;
    };
    Config.prototype.getUserInfoNameField = function () {
        return this.userInfoNameField;
    };
    Config.prototype.getAuthorizationEndpoint = function () {
        return this.authorizationEndpoint;
    };
    Config.prototype.getClientId = function () {
        return this.clientId;
    };
    Config.prototype.getScopes = function () {
        return this.scopes;
    };
    Config.prototype.getLogoutUrl = function () {
        return this.logoutUrl;
    };
    Config.prototype.getResourceServer = function () {
        return this.resourceServer;
    };
    Config.prototype.getProfileUrl = function () {
        return this.profileUrl;
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map