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
var C3Cmp = (function () {
    function C3Cmp() {
    }
    C3Cmp.prototype.ngOnInit = function () {
        c3.generate({
            bindto: '#linechart',
            data: {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 50, 20, 10, 40, 15, 25]
                ]
            },
            color: {
                pattern: ['#06c5ac', '#3faae3', '#ee634c', '#6bbd95', '#f4cc0b', '#9b59b6', '#16a085', '#c0392b']
            }
        });
        c3.generate({
            bindto: '#piechart',
            data: {
                columns: [
                    ['data1', 30],
                    ['data2', 120],
                ],
                type: 'pie',
                onclick: function (d, i) { console.log('onclick', d, i); },
                onmouseover: function (d, i) { console.log('onmouseover', d, i); },
                onmouseout: function (d, i) { console.log('onmouseout', d, i); }
            },
            color: {
                pattern: ['#06c5ac', '#3faae3', '#ee634c', '#6bbd95', '#f4cc0b', '#9b59b6', '#16a085', '#c0392b']
            }
        });
        c3.generate({
            bindto: '#donutchart',
            data: {
                columns: [
                    ['data1', 30],
                    ['data2', 120],
                ],
                type: 'donut',
                onclick: function (d, i) { console.log('onclick', d, i); },
                onmouseover: function (d, i) { console.log('onmouseover', d, i); },
                onmouseout: function (d, i) { console.log('onmouseout', d, i); }
            },
            donut: {
                title: 'Donut Chart'
            },
            color: {
                pattern: ['#06c5ac', '#3faae3', '#ee634c', '#6bbd95', '#f4cc0b', '#9b59b6', '#16a085', '#c0392b']
            }
        });
        c3.generate({
            bindto: '#areachart',
            data: {
                columns: [
                    ['data1', 200, 240, 300, 70, 10, 0],
                    ['data2', 130, 100, 140, 200, 150, 50]
                ],
                types: {
                    data1: 'area',
                    data2: 'area-spline'
                }
            },
            color: {
                pattern: ['#06c5ac', '#3faae3', '#ee634c', '#6bbd95', '#f4cc0b', '#9b59b6', '#16a085', '#c0392b']
            }
        });
    };
    C3Cmp = __decorate([
        core_1.Component({
            selector: 'high-chart',
            templateUrl: './pages/charts/c3/components/c3.html'
        }), 
        __metadata('design:paramtypes', [])
    ], C3Cmp);
    return C3Cmp;
}());
exports.C3Cmp = C3Cmp;
//# sourceMappingURL=c3.js.map