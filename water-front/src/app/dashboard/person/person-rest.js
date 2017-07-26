"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var api_rest_1 = require('../core/service/rest/api-rest');
var PersonRest = (function (_super) {
    __extends(PersonRest, _super);
    function PersonRest() {
        _super.apply(this, arguments);
    }
    PersonRest.prototype.getResourcePath = function () {
        return '/person';
    };
    return PersonRest;
}(api_rest_1.ApiRest));
exports.PersonRest = PersonRest;
//# sourceMappingURL=person-rest.js.map