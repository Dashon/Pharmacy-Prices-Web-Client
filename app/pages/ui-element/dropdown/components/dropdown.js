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
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var DropdownCmp = (function () {
    function DropdownCmp() {
        this.status = { isopen: false };
    }
    DropdownCmp.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    };
    DropdownCmp = __decorate([
        core_1.Component({
            selector: 'grid',
            templateUrl: './pages/ui-element/dropdown/components/dropdown.html',
            directives: [ng2_bootstrap_1.DROPDOWN_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DropdownCmp);
    return DropdownCmp;
}());
exports.DropdownCmp = DropdownCmp;
//# sourceMappingURL=dropdown.js.map