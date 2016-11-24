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
var router_1 = require('@angular/router');
var angular2_jwt_1 = require('angular2-jwt');
var http_1 = require('../../config/http');
var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (angular2_jwt_1.tokenNotExpired()) {
            return true;
        }
        localStorage.clear();
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a;
}());
exports.AuthGuard = AuthGuard;
var AdminGaurd = (function () {
    function AdminGaurd(router, http) {
        this.router = router;
        this.http = http;
        this.isAdmin = false;
        var role = localStorage.getItem('role');
        this.isAdmin = (role == ' doc_and_i_admin');
    }
    AdminGaurd.prototype.canActivate = function () {
        var _this = this;
        var baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
        this.http.get(baseUrl + 'users/1/isAdmin').subscribe(function (res) {
            var role = res.json();
            _this.isAdmin = role['isAdmin'] === true;
            if (!_this.isAdmin) {
                _this.router.navigate(['/dashboard', '/home']);
                return false;
            }
            return true;
        });
        if (angular2_jwt_1.tokenNotExpired()) {
            return this.isAdmin;
        }
        localStorage.clear();
        this.router.navigate(['/login']);
        return false;
    };
    AdminGaurd = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, http_1.AuthHttp])
    ], AdminGaurd);
    return AdminGaurd;
    var _a;
}());
exports.AdminGaurd = AdminGaurd;
//# sourceMappingURL=auth.gaurd.js.map