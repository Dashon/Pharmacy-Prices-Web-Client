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
var home_1 = require('../../../pages/home/components/home');
var typography_1 = require('../../../pages/typography/components/typography');
var charts_1 = require('../../../pages/charts/components/charts');
var grid_1 = require('../../../pages/grid/components/grid');
var forms_1 = require('../../../pages/forms/components/forms');
var profile_1 = require('../../../pages/profile/components/profile');
var ui_element_1 = require('../../../pages/ui-element/components/ui_element');
var calendar_1 = require('../../../pages/calendar/components/calendar');
var blank_page_1 = require('../../../pages/blank-page/components/blank_page');
var mail_1 = require('../../../pages/mail/components/mail');
var invoice_1 = require('../../../pages/invoice/components/invoice');
var tables_1 = require('../../../pages/tables/components/tables');
var topnav_1 = require('../../../widgets/topnav/components/topnav');
var sidebar_1 = require('../../../widgets/sidebar/components/sidebar');
var drug_search_1 = require('../../../pages/drug-search/components/drug-search');
var drug_results_1 = require('../../../pages/drug-results/components/drug-results');
var DashboardCmp = (function () {
    function DashboardCmp() {
    }
    DashboardCmp = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: './layout/dashboard/components/dashboard.html',
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [router_1.ROUTER_DIRECTIVES, topnav_1.TopNavCmp, sidebar_1.SidebarCmp]
        }),
        router_1.RouteConfig([
            { path: '/', component: home_1.HomeCmp, as: 'Home', useAsDefault: true },
            { path: '/typography', component: typography_1.TypographyCmp, as: 'Typography' },
            { path: '/grids', component: grid_1.GridCmp, as: 'Grid' },
            { path: '/charts/...', component: charts_1.ChartCmp, as: 'Chart' },
            { path: '/tables', component: tables_1.TableCmp, as: 'Table' },
            { path: '/form/...', component: forms_1.FormCmp, as: 'Forms' },
            { path: '/ui-element/...', component: ui_element_1.UiElementCmp, as: 'UiElement' },
            { path: '/calendar', component: calendar_1.CalendarCmp, as: 'Calendar' },
            { path: '/blank-page', component: blank_page_1.BlankPageCmp, as: 'Blankpage' },
            { path: '/mail/...', component: mail_1.MailCmp, as: 'Mail' },
            { path: '/invoice', component: invoice_1.InvoiceCmp, as: 'Invoice' },
            { path: '/profile', component: profile_1.ProfileCmp, as: 'Profile' },
            { path: '/drug-search', component: drug_search_1.DrugSearchComp, as: 'DrugSearch' },
            { path: '/drug-results', component: drug_results_1.DrugResultsComp, as: 'DrugResults' }
        ]), 
        __metadata('design:paramtypes', [])
    ], DashboardCmp);
    return DashboardCmp;
}());
exports.DashboardCmp = DashboardCmp;
//# sourceMappingURL=dashboard.js.map