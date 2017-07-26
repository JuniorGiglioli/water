"use strict";
var AuthHttpException = (function () {
    function AuthHttpException(message, status, body) {
        if (message) {
            this.message = message;
        }
        if (status) {
            this.status = status;
        }
        if (body) {
            this.body = body;
        }
    }
    return AuthHttpException;
}());
exports.AuthHttpException = AuthHttpException;
//# sourceMappingURL=oauth-exception.js.map