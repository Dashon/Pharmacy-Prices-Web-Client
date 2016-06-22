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
var todo_1 = require('../../../widgets/todo/components/todo');
var stats_1 = require('../../../widgets/stats/components/stats');
var HomeCmp = (function () {
    function HomeCmp() {
    }
    HomeCmp.prototype.ngOnInit = function () {
        var vmap = $('#vmap');
        vmap.vectorMap({
            map: 'world_en',
            backgroundColor: '#FFF',
            borderColor: '#D9D9D9',
            borderOpacity: 0.25,
            borderWidth: 1,
            color: '#CCCCCC',
            enableZoom: true,
            hoverColor: '#63B4E6',
            hoverOpacity: null,
            normalizeFunction: 'linear',
            scaleColors: ['#b6d6ff', '#005ace'],
            selectedColor: '#63B4E6',
            selectedRegions: [],
            showTooltip: true,
            onRegionClick: function (element, code, region) {
                var message = 'You clicked "'
                    + region
                    + '" which has the code: '
                    + code.toUpperCase();
                console.log(message);
            }
        });
        c3.generate({
            bindto: '#lineChart',
            data: {
                columns: [
                    ['Newuser', 30, 200, 100, 400, 150, 250],
                    ['Returning user', 50, 120, 210, 140, 115, 425],
                    ['Referral user', 40, 150, 98, 300, 175, 100]
                ]
            },
            color: {
                pattern: ['#3CA2E0', '#5CB85C', '#F1B35B']
            },
            axis: {
                x: {
                    show: false
                },
                y: {
                    show: false
                }
            }
        });
        c3.generate({
            bindto: '#cbar',
            data: {
                columns: [
                    [10, 40, 20, 90, 35, 70, 10, 50, 20, 80, 60, 10, 20, 40, 70, 65]
                ],
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.5
                }
            },
            color: {
                pattern: ['#DB5B57']
            },
            legend: {
                show: false
            },
            axis: {
                x: {
                    show: false
                },
                y: {
                    show: false
                }
            }
        });
        c3.generate({
            bindto: '#pie',
            data: {
                columns: [
                    ['data1', 11],
                    ['data2', 23],
                    ['data3', 66]
                ],
                type: 'pie'
            },
            color: {
                pattern: ['#5CB85C', '#F0AD4E', '#3CA2E0']
            },
            legend: {
                show: false
            }
        });
    };
    HomeCmp = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: './pages/home/components/home.html',
            styleUrls: ['./pages/home/components/home.css'],
            directives: [todo_1.TodoCmp, stats_1.StatsCmp]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeCmp);
    return HomeCmp;
}());
exports.HomeCmp = HomeCmp;
//# sourceMappingURL=home.js.map