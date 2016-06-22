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
var chartjs_1 = require('../chartjs/components/chartjs');
var c3_1 = require('../c3/components/c3');
var ChartCmp = (function () {
    function ChartCmp() {
    }
    ChartCmp = __decorate([
        core_1.Component({
            selector: 'chart',
            templateUrl: './pages/charts/components/charts.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/chartjs', component: chartjs_1.ChartjsCmp, as: 'Chartjs', useAsDefault: true },
            { path: '/c3js', component: c3_1.C3Cmp, as: 'C3' }
        ]), 
        __metadata('design:paramtypes', [])
    ], ChartCmp);
    return ChartCmp;
}());
exports.ChartCmp = ChartCmp;
//# sourceMappingURL=charts.js.map