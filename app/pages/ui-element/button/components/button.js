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
var ButtonCmp = (function () {
    function ButtonCmp() {
    }
    ButtonCmp.prototype.ngOnInit = function () {
        [].slice.call(document.querySelectorAll('button.progress-button')).forEach(function (bttn) {
            var button = new ProgressButton(bttn, {
                callback: function (instance) {
                    var progress = 0, interval = setInterval(function () {
                        progress = Math.min(progress + Math.random() * 0.1, 1);
                        instance._setProgress(progress);
                        if (progress === 1) {
                            instance._stop(1);
                            clearInterval(interval);
                        }
                    }, 200);
                }
            });
            console.log(button);
            console.clear();
        });
    };
    ButtonCmp = __decorate([
        core_1.Component({
            selector: 'buttons',
            templateUrl: './pages/ui-element/button/components/button.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ButtonCmp);
    return ButtonCmp;
}());
exports.ButtonCmp = ButtonCmp;
//# sourceMappingURL=button.js.map