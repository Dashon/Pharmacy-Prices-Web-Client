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
var http_1 = require('../../config/http');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var SidebarComponent = (function () {
    function SidebarComponent(http, router) {
        this.router = router;
        this.isActive = false;
        this.showMenu = '';
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
    SidebarComponent.prototype.eventCalled = function () {
        this.isActive = !this.isActive;
    };
    SidebarComponent.prototype.addExpandClass = function (element) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        }
        else {
            this.showMenu = element;
        }
    };
    SidebarComponent.prototype.getAccountInfo = function (id) {
        var _this = this;
        return this.callApi(this.baseUrl + 'users/' + id).subscribe(function (user) { return _this.currentUser = JSON.parse(user._body); }, function (error) { return _this.errorMessage = error; });
    };
    SidebarComponent.prototype.rtl = function () {
        var body = $('body');
        body.toggleClass('rtl');
    };
    SidebarComponent.prototype.sidebarToggler = function () {
        var sidebar = $('#sidebar');
        var mainContainer = $('.main-container');
        sidebar.toggleClass('sidebar-left-zero');
        mainContainer.toggleClass('main-container-ml-zero');
    };
    SidebarComponent.prototype.isAdmin = function () {
        return localStorage.getItem('role') == 'doc_and_i_admin';
    };
    SidebarComponent.prototype.isLoggedIn = function () {
        return localStorage.getItem('user_id') != null;
    };
    SidebarComponent.prototype.isAssociated = function () {
        return this.isLoggedIn() && localStorage.getItem('hcf_id') != 'null';
    };
    SidebarComponent.prototype.goToLogin = function () {
        this.sidebarToggler();
        this.router.navigate(['/', 'login']);
    };
    SidebarComponent.prototype.goToHome = function () {
        this.sidebarToggler();
        this.router.navigate(['/', 'home']);
    };
    SidebarComponent.prototype.logout = function () {
        var _this = this;
        this.sidebarToggler();
        return this.deleteApi(this.baseUrl + 'sign_out').subscribe(function () {
            localStorage.clear();
            _this.router.navigate(['/', 'login']);
        }, function (error) { return _this.errorMessage = error; });
    };
    SidebarComponent.prototype.deleteApi = function (url) {
        this.errorMessage = '';
        return this.http.delete(url);
    };
    SidebarComponent.prototype.callApi = function (url) {
        this.errorMessage = '';
        return this.http.get(url);
    };
    SidebarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sidebar-cmp',
            templateUrl: 'sidebar.html',
            directives: [router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.AuthHttp, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], SidebarComponent);
    return SidebarComponent;
    var _a;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.js.map