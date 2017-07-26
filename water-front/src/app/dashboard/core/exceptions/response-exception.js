"use strict";
var ResponseException = (function () {
    function ResponseException(message, status, body) {
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
    return ResponseException;
}());
exports.ResponseException = ResponseException;
//# sourceMappingURL=response-exception.js.map