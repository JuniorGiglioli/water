"use strict";
var ResponseAuthorization = (function () {
    function ResponseAuthorization(accessToken, expiresIn, tokenType, scope) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.tokenType = tokenType;
        this.scope = scope;
    }
    ResponseAuthorization.prototype.getAccessToken = function () {
        return this.accessToken;
    };
    ResponseAuthorization.prototype.setAccessToken = function (accessToken) {
        this.accessToken = accessToken;
    };
    ResponseAuthorization.prototype.getExpiresIn = function () {
        return this.expiresIn;
    };
    ResponseAuthorization.prototype.setExpiresIn = function (expiresIn) {
        this.expiresIn = expiresIn;
    };
    ResponseAuthorization.prototype.getTokenType = function () {
        return this.tokenType;
    };
    ResponseAuthorization.prototype.setTokenType = function (tokenType) {
        this.tokenType = tokenType;
    };
    ResponseAuthorization.prototype.getScope = function () {
        return this.scope;
    };
    ResponseAuthorization.prototype.setScope = function (scope) {
        this.scope = scope;
    };
    return ResponseAuthorization;
}());
exports.ResponseAuthorization = ResponseAuthorization;
//# sourceMappingURL=response-authorization.js.map