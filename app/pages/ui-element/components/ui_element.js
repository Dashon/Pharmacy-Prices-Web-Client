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
var button_1 = require('../../../pages/ui-element/button/components/button');
var dropdown_1 = require('../../../pages/ui-element/dropdown/components/dropdown');
var icons_1 = require('../../../pages/ui-element/icons/components/icons');
var card_1 = require('../../../pages/ui-element/card/components/card');
var alert_1 = require('../../../pages/ui-element/alert/components/alert');
var progressbar_1 = require('../../../pages/ui-element/progressbar/components/progressbar');
var pagination_1 = require('../../../pages/ui-element/pagination/components/pagination');
var other_element_1 = require('../../../pages/ui-element/other-element/components/other-element');
var UiElementCmp = (function () {
    function UiElementCmp() {
    }
    UiElementCmp = __decorate([
        core_1.Component({
            selector: 'chart',
            templateUrl: './pages/ui-element/components/ui-element.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/ui-element/button', component: button_1.ButtonCmp, as: 'Button', useAsDefault: true },
            { path: '/ui-element/dropdown', component: dropdown_1.DropdownCmp, as: 'Dropdown' },
            { path: '/ui-element/icons', component: icons_1.IconCmp, as: 'Icon' },
            { path: '/ui-element/cards', component: card_1.CardCmp, as: 'Card' },
            { path: '/ui-element/alert', component: alert_1.AlertCmp, as: 'Alert' },
            { path: '/ui-element/progressbar', component: progressbar_1.ProgressbarCmp, as: 'Progressbar' },
            { path: '/ui-element/pagination', component: pagination_1.PaginationCmp, as: 'Pagination' },
            { path: '/ui-element/others', component: other_element_1.OtherCmp, as: 'Other' }
        ]), 
        __metadata('design:paramtypes', [])
    ], UiElementCmp);
    return UiElementCmp;
}());
exports.UiElementCmp = UiElementCmp;
//# sourceMappingURL=ui_element.js.map