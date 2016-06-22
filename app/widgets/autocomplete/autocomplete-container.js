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
var options_class_1 = require('./options.class');
var position_1 = require('./position');
var AutocompleteContainer = (function () {
    function AutocompleteContainer(element, options) {
        this.element = element;
        this._matches = [];
        Object.assign(this, options);
    }
    Object.defineProperty(AutocompleteContainer.prototype, "matches", {
        get: function () {
            return this._matches;
        },
        set: function (value) {
            this._matches = value;
            if (this._matches.length > 0) {
                this._active = this._matches[0];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutocompleteContainer.prototype, "field", {
        set: function (value) {
            this._field = value;
        },
        enumerable: true,
        configurable: true
    });
    AutocompleteContainer.prototype.position = function (hostEl) {
        this.display = 'block';
        this.top = '0px';
        this.left = '0px';
        var p = position_1.positionService
            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
        this.top = p.top + 'px';
        this.left = p.left + 'px';
    };
    AutocompleteContainer.prototype.selectActiveMatch = function () {
        this.selectMatch(this._active);
    };
    AutocompleteContainer.prototype.prevActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
    };
    AutocompleteContainer.prototype.nextActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
    };
    AutocompleteContainer.prototype.selectActive = function (value) {
        this._active = value;
    };
    AutocompleteContainer.prototype.isActive = function (value) {
        return this._active === value;
    };
    AutocompleteContainer.prototype.selectMatch = function (value, e) {
        if (e === void 0) { e = null; }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.parent.changeModel(value);
        this.parent.autocompleteOnSelect.emit({
            item: value
        });
        return false;
    };
    AutocompleteContainer.prototype.hightlight = function (item, query) {
        var itemStr = (typeof item === 'object' && this._field ? item[this._field] : item).toString();
        var itemStrHelper = itemStr.toLowerCase();
        var startIdx;
        var tokenLen;
        if (typeof query === 'object') {
            var queryLen = query.length;
            for (var i = 0; i < queryLen; i += 1) {
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
                    itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
                }
            }
        }
        else if (query) {
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
            }
        }
        return itemStr;
    };
    AutocompleteContainer = __decorate([
        core_1.Component({
            selector: 'autocomplete-container',
            directives: [common_1.CORE_DIRECTIVES],
            template: "\n                  <ul class=\"dropdown-menu\"\n                      [ngStyle]=\"{top: top, left: left, display: display}\"\n                      style=\"display: block\">\n                    <li *ngFor=\"#match of matches\"\n                        [class.active]=\"isActive(match)\"\n                        (mouseenter)=\"selectActive(match)\">\n                        <a href=\"#\" (click)=\"selectMatch(match, $event)\" tabindex=\"-1\" [innerHtml]=\"hightlight(match, query)\"></a>\n                    </li>\n                  </ul>\n              ",
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, options_class_1.AutocompleteOptions])
    ], AutocompleteContainer);
    return AutocompleteContainer;
}());
exports.AutocompleteContainer = AutocompleteContainer;
//# sourceMappingURL=autocomplete-container.js.map