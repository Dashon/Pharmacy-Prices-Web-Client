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
var AlertCmp = (function () {
    function AlertCmp() {
        this.msg = null;
        this.growlMessage = null;
        this.alerts = [
            {
                type: 'danger',
                msg: 'Oh snap! Change a few things up and try submitting again.'
            },
            {
                type: 'info',
                msg: 'Ok! Not bad, but you can do better.'
            },
            {
                type: 'success',
                msg: 'Well done! You successfully read this important alert message.',
                closable: true
            }
        ];
    }
    AlertCmp.prototype.closeAlert = function (i) {
        this.alerts.splice(i, 1);
    };
    AlertCmp.prototype.addAlert = function () {
        this.alerts.push({ msg: this.msg, type: 'warning', closable: true });
        this.msg = '';
    };
    AlertCmp.prototype.addGrowl = function () {
        $.growl({ title: 'Growl', message: this.growlMessage });
        this.growlMessage = '';
    };
    AlertCmp.prototype.defaultGrowl = function () {
        $.growl({ title: 'Growl', message: 'The kitten is awake!' });
    };
    AlertCmp.prototype.errorGrowl = function () {
        $.growl.error({ message: 'The kitten is attacking!' });
    };
    AlertCmp.prototype.noticeGrowl = function () {
        $.growl.notice({ message: 'The kitten is cute!' });
    };
    AlertCmp.prototype.warningGrowl = function () {
        $.growl.warning({ message: 'The kitten is ugly!' });
    };
    AlertCmp.prototype.ngOnInit = function () {
        $.growl({ title: 'Growl', message: 'The kitten is awake!' });
    };
    AlertCmp = __decorate([
        core_1.Component({
            selector: 'alerts',
            templateUrl: './pages/ui-element/alert/components/alert.html',
            directives: [ng2_bootstrap_1.Alert]
        }), 
        __metadata('design:paramtypes', [])
    ], AlertCmp);
    return AlertCmp;
}());
exports.AlertCmp = AlertCmp;
//# sourceMappingURL=alert.js.map