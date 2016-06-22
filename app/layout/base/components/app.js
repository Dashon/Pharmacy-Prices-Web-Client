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
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var login_1 = require('../../../pages/login/components/login');
var signup_1 = require('../../../pages/signup/components/signup');
var dashboard_1 = require('../../dashboard/components/dashboard');
var _404_1 = require('../../../pages/404/components/404');
var AppCmp = (function () {
    function AppCmp() {
    }
    AppCmp = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: './layout/base/components/app.html',
            styleUrls: ['./layout/base/components/app.css'],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/login', component: login_1.LoginCmp, as: 'Login', useAsDefault: true },
            { path: '/signup', component: signup_1.SignupCmp, as: 'Signup' },
            { path: '/404-page', component: _404_1.PageNotFoundCmp, as: '404Page' },
            { path: '/dashboard/...', component: dashboard_1.DashboardCmp, as: 'Dashboard' }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppCmp);
    return AppCmp;
}());
exports.AppCmp = AppCmp;
//# sourceMappingURL=app.js.map