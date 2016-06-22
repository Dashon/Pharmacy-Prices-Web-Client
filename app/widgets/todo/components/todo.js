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
var common_1 = require('angular2/common');
var name_list_1 = require('../../../shared/services/name_list');
var TodoCmp = (function () {
    function TodoCmp(nameList) {
        this.nameList = nameList;
    }
    TodoCmp.prototype.addName = function () {
        this.nameList.add(this.newName);
        this.newName = '';
        return false;
    };
    TodoCmp.prototype.ngOnInit = function () {
        var todoListWraper = $('.todo-list-wrap');
        todoListWraper.perfectScrollbar();
    };
    TodoCmp = __decorate([
        core_1.Component({
            selector: 'todo',
            templateUrl: './widgets/todo/components/todo.html',
            providers: [name_list_1.NameList],
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [name_list_1.NameList])
    ], TodoCmp);
    return TodoCmp;
}());
exports.TodoCmp = TodoCmp;
//# sourceMappingURL=todo.js.map