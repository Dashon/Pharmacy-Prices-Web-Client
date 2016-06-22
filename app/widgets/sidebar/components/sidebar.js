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
var SidebarCmp = (function () {
    function SidebarCmp() {
    }
    SidebarCmp.prototype.ngOnInit = function () {
        var calendar = $('#calendar1');
        calendar.fullCalendar({
            eventClick: function (calEvent, jsEvent, view) {
                alert('Event: ' + calEvent.title);
                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                alert('View: ' + view.name);
            }
        });
        var sidebar = $('.sidenav-outer');
        sidebar.perfectScrollbar();
    };
    SidebarCmp = __decorate([
        core_1.Component({
            selector: 'sidebar',
            templateUrl: './widgets/sidebar/components/sidebar.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarCmp);
    return SidebarCmp;
}());
exports.SidebarCmp = SidebarCmp;
//# sourceMappingURL=sidebar.js.map