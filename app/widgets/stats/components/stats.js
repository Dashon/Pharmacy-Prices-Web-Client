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
var StatsCmp = (function () {
    function StatsCmp() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StatsCmp.prototype, "icon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StatsCmp.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StatsCmp.prototype, "text", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StatsCmp.prototype, "bgclass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StatsCmp.prototype, "link", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], StatsCmp.prototype, "progressValue", void 0);
    StatsCmp = __decorate([
        core_1.Component({
            selector: 'stats',
            templateUrl: './widgets/stats/components/stats.html'
        }), 
        __metadata('design:paramtypes', [])
    ], StatsCmp);
    return StatsCmp;
}());
exports.StatsCmp = StatsCmp;
//# sourceMappingURL=stats.js.map