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
var inbox_1 = require('../inbox/components/inbox');
var compose_1 = require('../compose/components/compose');
var MailCmp = (function () {
    function MailCmp() {
    }
    MailCmp = __decorate([
        core_1.Component({
            selector: 'chart',
            templateUrl: './pages/mail/components/mail.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/inbox', component: inbox_1.InboxCmp, as: 'Inbox', useAsDefault: true },
            { path: '/compose', component: compose_1.ComposeCmp, as: 'Compose' }
        ]), 
        __metadata('design:paramtypes', [])
    ], MailCmp);
    return MailCmp;
}());
exports.MailCmp = MailCmp;
//# sourceMappingURL=mail.js.map