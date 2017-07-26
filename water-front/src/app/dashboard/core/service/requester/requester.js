"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var constants_1 = require('../../constants');
var oauth_exception_1 = require('../../exceptions/oauth-exception');
var response_exception_1 = require('../../exceptions/response-exception');
var Requester = (function () {
    function Requester(http) {
        this.http = http;
    }
    /**
     * Example of use:
     *
     *  constructor(private requester: Requester) {
     *    let promise = requester.get('https://localhost/api/v1/person', {'paramter1': 'value'}, {'header1': 'value'});
     *
     *    promise.then((resolve) => {
     *      console.log('Json:', resolve);
     *    }).catch(error => {
     *      console.log('Error:', error);
     *    });
     *
     * }
     */
    Requester.prototype.get = function (url, search, headers) {
        var options = this.getOptions(search, headers);
        var response = this.http.get(url, options);
        return this.getPromise(response);
    };
    Requester.prototype.post = function (url, body, search, headers) {
        var options = this.getOptions(search, headers);
        var bodyJson = null;
        if (body) {
            options.headers.append(constants_1.Constants.HEADER.CONTENT_TYPE, constants_1.Constants.HEADER_VALUE.APPLICATION_JSON);
            bodyJson = JSON.stringify(body);
        }
        var response = this.http.post(url, bodyJson, options);
        return this.getPromise(response);
    };
    Requester.prototype.delete = function (url, search, headers) {
        var options = this.getOptions(search, headers);
        var response = this.http.delete(url, options);
        return this.getPromiseWithoutBody(response);
    };
    Requester.prototype.put = function (url, body, search, headers) {
        var options = this.getOptions(search, headers);
        var bodyJson = null;
        if (body) {
            options.headers.append(constants_1.Constants.HEADER.CONTENT_TYPE, constants_1.Constants.HEADER_VALUE.APPLICATION_JSON);
            bodyJson = JSON.stringify(body);
        }
        var response = this.http.put(url, bodyJson, options);
        return this.getPromise(response);
    };
    Requester.prototype.getPromise = function (response) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            response.subscribe(function (data) {
                resolve(data.json());
            }, function (error) {
                reject(error);
                _this.treatError(error);
            });
        });
    };
    Requester.prototype.getPromiseWithoutBody = function (response) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            response.map(function (result) { return result.ok; }).subscribe(function () {
                resolve();
            }, function (error) {
                reject(error);
                _this.treatError(error);
            });
        });
    };
    Requester.prototype.treatError = function (error) {
        if (error.status == constants_1.Constants.HTTP_STATUS.BAD_REQUEST) {
            throw new response_exception_1.ResponseException(error.statusText, error.status, error['_body']);
        }
        if (error.status == constants_1.Constants.HTTP_STATUS.UNAUTHORIZED || error.status == constants_1.Constants.HTTP_STATUS.FORBIDDEN) {
            throw new oauth_exception_1.AuthHttpException(error.statusText, error.status, error['_body']);
        }
        if (error.status == constants_1.Constants.HTTP_STATUS.INTERNAL_ERROR) {
            //TODO Tratar erro no Back
            var errors = { errors: [{ message: 'Erro interno', status: 'danger' }] };
            throw new response_exception_1.ResponseException("Erro interno", error.status, JSON.stringify(errors));
        }
    };
    Requester.prototype.getOptions = function (search, headers) {
        if (search === void 0) { search = {}; }
        if (headers === void 0) { headers = {}; }
        var options = {};
        if (search) {
            options['search'] = this.getURLSearchParams(search);
        }
        if (headers) {
            options['headers'] = this.getHeaders(headers);
        }
        return options;
    };
    Requester.prototype.getURLSearchParams = function (search) {
        if (search === void 0) { search = {}; }
        var uRLSearchParams = new http_1.URLSearchParams();
        Object.entries(search).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            uRLSearchParams.append(key, value);
        });
        return uRLSearchParams;
    };
    Requester.prototype.getHeaders = function (headersMap) {
        if (headersMap === void 0) { headersMap = {}; }
        var headers = new http_1.Headers();
        Object.entries(headersMap).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            headers.append(key, value);
        });
        var accessToken = localStorage.getItem(constants_1.Constants.OAUTH.ACCESS_TOKEN);
        if (accessToken) {
            headers.append(constants_1.Constants.HEADER.AUTHORIZATION, "Bearer " + accessToken);
        }
        return headers;
    };
    Requester = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Requester);
    return Requester;
}());
exports.Requester = Requester;
//# sourceMappingURL=requester.js.map