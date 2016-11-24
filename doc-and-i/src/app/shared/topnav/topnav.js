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
var common_1 = require('@angular/common');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var http_1 = require('../../config/http');
var TopNavComponent = (function () {
    function TopNavComponent(http, router) {
        this.router = router;
        this.baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
        this.errorMessage = null;
        this.http = null;
        this.userName = localStorage.getItem('name');
        this.currentUser = {};
        this.http = http;
        if (localStorage.getItem('user_id') && localStorage.getItem('user_id') != 'null') {
            this.getAccountInfo(localStorage.getItem('user_id'));
        }
    }
    TopNavComponent.prototype.getAccountInfo = function (id) {
        var _this = this;
        return this.callApi(this.baseUrl + 'users/' + id).subscribe(function (user) {
            _this.currentUser = JSON.parse(user._body);
            localStorage.setItem('currentUser', JSON.stringify(_this.currentUser));
        }, function (error) { return _this.errorMessage = error; });
    };
    TopNavComponent.prototype.changeTheme = function (color) {
        var link = $('<link>');
        link
            .appendTo('head')
            .attr({ type: 'text/css', rel: 'stylesheet' })
            .attr('href', 'themes/app-' + color + '.css');
    };
    TopNavComponent.prototype.rtl = function () {
        var body = $('body');
        body.toggleClass('rtl');
    };
    TopNavComponent.prototype.sidebarToggler = function () {
        var sidebar = $('#sidebar');
        var mainContainer = $('.main-container');
        sidebar.toggleClass('sidebar-left-zero');
        mainContainer.toggleClass('main-container-ml-zero');
    };
    TopNavComponent.prototype.isAdmin = function () {
        return localStorage.getItem('role') == 'doc_and_i_admin';
    };
    TopNavComponent.prototype.isLoggedIn = function () {
        return localStorage.getItem('user_id') != null;
    };
    TopNavComponent.prototype.isAssociated = function () {
        return this.isLoggedIn() && localStorage.getItem('hcf_id') != 'null';
    };
    TopNavComponent.prototype.goToLogin = function () {
        this.router.navigate(['/', 'login']);
    };
    TopNavComponent.prototype.goToHome = function () {
        this.router.navigate(['/', '']);
    };
    TopNavComponent.prototype.goTo340b = function () {
        this.router.navigate(['/', '340b', { closeMap: 'true' }]);
    };
    TopNavComponent.prototype.logout = function () {
        var _this = this;
        localStorage.clear();
        return this.deleteApi(this.baseUrl + 'sign_out').subscribe(function () {
            _this.router.navigate(['/', 'login']);
        }, function (error) {
            _this.errorMessage = error;
            _this.router.navigate(['/', 'login']);
        });
    };
    TopNavComponent.prototype.deleteApi = function (url) {
        this.errorMessage = '';
        return this.http.delete(url);
    };
    TopNavComponent.prototype.callApi = function (url) {
        this.errorMessage = '';
        return this.http.get(url);
    };
    TopNavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'top-nav',
            templateUrl: 'topnav.html',
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [ng2_bootstrap_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.AuthHttp, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], TopNavComponent);
    return TopNavComponent;
    var _a;
}());
exports.TopNavComponent = TopNavComponent;
//# sourceMappingURL=topnav.js.map