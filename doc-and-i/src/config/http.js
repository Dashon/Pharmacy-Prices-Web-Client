"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var router_1 = require('@angular/router');
var angular2_jwt_1 = require('angular2-jwt');
var AuthHttp = (function (_super) {
    __extends(AuthHttp, _super);
    function AuthHttp(options, http, _router) {
        _super.call(this, options, http);
        this._router = _router;
    }
    AuthHttp.prototype._isUnauthorized = function (status) {
        return status === 401;
    };
    AuthHttp.prototype.request = function (url, options) {
        var _this = this;
        var response = _super.prototype.request.call(this, url, options);
        response.subscribe(null, function (err) {
            if (_this._isUnauthorized(err.status)) {
                localStorage.clear();
                _this._router.navigate(['/', 'login']);
            }
        });
        return response;
    };
    AuthHttp = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof angular2_jwt_1.AuthConfig !== 'undefined' && angular2_jwt_1.AuthConfig) === 'function' && _a) || Object, (typeof (_b = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object])
    ], AuthHttp);
    return AuthHttp;
    var _a, _b, _c;
}(angular2_jwt_1.AuthHttp));
exports.AuthHttp = AuthHttp;
exports.AUTH_PROVIDER = [
    core_1.provide(AuthHttp, {
        useFactory: function (http, router) {
            return new AuthHttp(new angular2_jwt_1.AuthConfig({
                globalHeaders: [
                    { 'Content-Type': 'application/json' },
                    { 'X-Api-Key': '324212a0-db7b-468e-aaeb-e4b6502e829e' }
                ],
            }), http, router);
        },
        deps: [http_1.Http, router_1.Router]
    }),
];
//# sourceMappingURL=http.js.map