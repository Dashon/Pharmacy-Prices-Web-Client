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
var common_1 = require('angular2/common');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var TopNavCmp = (function () {
    function TopNavCmp(_router) {
        this._router = _router;
        this.status = { isopen: false };
    }
    TopNavCmp.prototype.toggled = function (open) {
        console.log('Dropdown is now: ', open);
    };
    TopNavCmp.prototype.sidebarToggler = function () {
        var sidebar = $('#sidebar');
        var mainContainer = $('.main-container');
        sidebar.toggleClass('sidebar-left-zero');
        mainContainer.toggleClass('main-container-ml-zero');
    };
    TopNavCmp.prototype.rtl = function () {
        var body = $('body');
        body.toggleClass('rtl');
    };
    TopNavCmp.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    };
    TopNavCmp.prototype.changeTheme = function (color) {
        var link = $('<link>');
        link
            .appendTo('head')
            .attr({ type: 'text/css', rel: 'stylesheet' })
            .attr('href', 'assets/sass/app-' + color + '.css');
    };
    TopNavCmp.prototype.gotoLogin = function () {
        this._router.navigate(['Login']);
    };
    TopNavCmp.prototype.gotoHome = function () {
        this._router.navigate(['Dashboard', 'Home']);
    };
    TopNavCmp.prototype.gotoSavings = function () {
        this._router.navigate(['Dashboard', 'DrugSearch']);
    };
    TopNavCmp.prototype.gotoProfile = function () {
        this._router.navigate(['Profile']);
    };
    TopNavCmp = __decorate([
        core_1.Component({
            selector: 'topnav',
            templateUrl: './widgets/topnav/components/topnav.html',
            directives: [ng2_bootstrap_1.DROPDOWN_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], TopNavCmp);
    return TopNavCmp;
}());
exports.TopNavCmp = TopNavCmp;
//# sourceMappingURL=topnav.js.map