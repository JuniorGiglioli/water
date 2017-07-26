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
var config_1 = require('./config');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var ConfigService = (function () {
    function ConfigService(_http) {
        this._http = _http;
        this.config = new config_1.Config();
    }
    ConfigService.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._http.get('config.json') // path of your config.json file
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.setParameters(data);
                resolve(true);
            }, function (err) { return console.log(err); });
        });
    };
    ConfigService.prototype.setParameters = function (data) {
        var entries = Object.entries(data);
        for (var key in entries) {
            this.save(this.config, entries[key][0], entries[key][1]);
        }
    };
    ConfigService.prototype.save = function (config, field, value) {
        config[field] = value;
    };
    ConfigService.prototype.getConfig = function () {
        return this.config;
    };
    ConfigService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map