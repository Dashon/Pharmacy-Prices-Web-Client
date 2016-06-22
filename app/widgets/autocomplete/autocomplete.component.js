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
function setProperty(renderer, elementRef, propName, propValue) {
    renderer.setElementProperty(elementRef.nativeElement, propName, propValue);
}
var sanitize_1 = require('./sanitize');
var autocomplete_container_1 = require('./autocomplete-container');
var options_class_1 = require('./options.class');
var Autocomplete = (function () {
    function Autocomplete(cd, element, renderer, loader) {
        this.cd = cd;
        this.element = element;
        this.renderer = renderer;
        this.loader = loader;
        this.autocompleteLoading = new core_1.EventEmitter();
        this.autocompleteNoResults = new core_1.EventEmitter();
        this.autocompleteOnSelect = new core_1.EventEmitter();
        this.autocompleteAsync = null;
        this.autocompleteLatinize = true;
        this.autocompleteSingleWords = true;
        this.autocompleteWordDelimiters = ' ';
        this.autocompletePhraseDelimiters = '\'"';
        this._matches = [];
        this.placement = 'bottom-left';
    }
    Object.defineProperty(Autocomplete.prototype, "matches", {
        get: function () {
            return this._matches;
        },
        enumerable: true,
        configurable: true
    });
    Autocomplete.prototype.debounce = function (func, wait) {
        var timeout;
        var args;
        var timestamp;
        var waitOriginal = wait;
        return function () {
            args = [].slice.call(arguments, 0);
            timestamp = Date.now();
            wait = this.container ? waitOriginal : this.autocompleteWaitMs;
            var later = function () {
                var last = Date.now() - timestamp;
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);
                }
                else {
                    timeout = null;
                    func.apply(this, args);
                }
            };
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
        };
    };
    Autocomplete.prototype.processMatches = function () {
        this._matches = [];
        if (this.cd.model.toString().length >= this.autocompleteMinLength) {
            var normalizedQuery = (this.autocompleteLatinize ? sanitize_1.AutocompleteUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
            normalizedQuery = this.autocompleteSingleWords ? sanitize_1.AutocompleteUtils.tokenize(normalizedQuery, this.autocompleteWordDelimiters, this.autocompletePhraseDelimiters) : normalizedQuery;
            for (var i = 0; i < this.autocomplete.length; i++) {
                var match = void 0;
                if (typeof this.autocomplete[i] === 'object' &&
                    this.autocomplete[i][this.autocompleteOptionField]) {
                    match = this.autocompleteLatinize ? sanitize_1.AutocompleteUtils.latinize(this.autocomplete[i][this.autocompleteOptionField].toString()) : this.autocomplete[i][this.autocompleteOptionField].toString();
                }
                if (typeof this.autocomplete[i] === 'string') {
                    match = this.autocompleteLatinize ? sanitize_1.AutocompleteUtils.latinize(this.autocomplete[i].toString()) : this.autocomplete[i].toString();
                }
                if (!match) {
                    console.log('Invalid match type', typeof this.autocomplete[i], this.autocompleteOptionField);
                    continue;
                }
                if (this.testMatch(match.toLowerCase(), normalizedQuery)) {
                    this._matches.push(this.autocomplete[i]);
                    if (this._matches.length > this.autocompleteOptionsLimit - 1) {
                        break;
                    }
                }
            }
        }
    };
    Autocomplete.prototype.testMatch = function (match, test) {
        var spaceLength;
        if (typeof test === 'object') {
            spaceLength = test.length;
            for (var i = 0; i < spaceLength; i += 1) {
                if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                    return false;
                }
            }
            return true;
        }
        else {
            return match.indexOf(test) >= 0;
        }
    };
    Autocomplete.prototype.finalizeAsyncCall = function () {
        this.autocompleteLoading.emit(false);
        this.autocompleteNoResults.emit(this.cd.model.toString().length >=
            this.autocompleteMinLength && this.matches.length <= 0);
        if (this.cd.model.toString().length <= 0 || this._matches.length <= 0) {
            this.hide();
            return;
        }
        if (this.container && this._matches.length > 0) {
            var normalizedQuery = (this.autocompleteLatinize ? sanitize_1.AutocompleteUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
            this.container.query = this.autocompleteSingleWords ? sanitize_1.AutocompleteUtils.tokenize(normalizedQuery, this.autocompleteWordDelimiters, this.autocompletePhraseDelimiters) : normalizedQuery;
            this.container.matches = this._matches;
        }
        if (!this.container && this._matches.length > 0) {
            this.show(this._matches);
        }
    };
    Autocomplete.prototype.ngOnInit = function () {
        var _this = this;
        this.autocompleteOptionsLimit = this.autocompleteOptionsLimit || 20;
        this.autocompleteMinLength = this.autocompleteMinLength || 1;
        this.autocompleteWaitMs = this.autocompleteWaitMs || 0;
        if (this.autocompleteAsync === null && typeof this.autocomplete !== 'function') {
            this.autocompleteAsync = false;
        }
        if (typeof this.autocomplete === 'function') {
            this.autocompleteAsync = true;
        }
        if (this.autocompleteAsync === true) {
            this.debouncer = this.debounce(function () {
                if (typeof _this.autocomplete === 'function') {
                    _this.autocomplete().then(function (matches) {
                        _this._matches = [];
                        if (_this.cd.model.toString().length >= _this.autocompleteMinLength) {
                            for (var i = 0; i < matches.length; i++) {
                                _this._matches.push(matches[i]);
                                if (_this._matches.length > _this.autocompleteOptionsLimit - 1) {
                                    break;
                                }
                            }
                        }
                        _this.finalizeAsyncCall();
                    });
                }
                if (typeof _this.autocomplete === 'object' && _this.autocomplete.length) {
                    _this.processMatches();
                    _this.finalizeAsyncCall();
                }
            }, 100);
        }
    };
    Autocomplete.prototype.onChange = function (e) {
        if (this.container) {
            if (e.keyCode === 27) {
                this.hide();
                return;
            }
            if (e.keyCode === 38) {
                this.container.prevActiveMatch();
                return;
            }
            if (e.keyCode === 40) {
                this.container.nextActiveMatch();
                return;
            }
            if (e.keyCode === 13) {
                this.container.selectActiveMatch();
                return;
            }
        }
        this.autocompleteLoading.emit(true);
        if (this.autocompleteAsync === true) {
            this.debouncer();
        }
        if (this.autocompleteAsync === false) {
            this.processMatches();
            this.finalizeAsyncCall();
        }
    };
    Autocomplete.prototype.changeModel = function (value) {
        var valueStr = ((typeof value === 'object' && this.autocompleteOptionField) ? value[this.autocompleteOptionField] : value).toString();
        this.cd.viewToModelUpdate(valueStr);
        setProperty(this.renderer, this.element, 'value', valueStr);
        this.hide();
    };
    Autocomplete.prototype.show = function (matches) {
        var _this = this;
        var options = new options_class_1.AutocompleteOptions({
            placement: this.placement,
            animation: false
        });
        var binding = core_1.Injector.resolve([
            new core_1.Provider(options_class_1.AutocompleteOptions, { useValue: options })
        ]);
        this.popup = this.loader
            .loadNextToLocation(autocomplete_container_1.AutocompleteContainer, this.element, binding)
            .then(function (componentRef) {
            componentRef.instance.position(_this.element);
            _this.container = componentRef.instance;
            _this.container.parent = _this;
            var normalizedQuery = (_this.autocompleteLatinize ? sanitize_1.AutocompleteUtils.latinize(_this.cd.model) : _this.cd.model).toString().toLowerCase();
            _this.container.query = _this.autocompleteSingleWords ? sanitize_1.AutocompleteUtils.tokenize(normalizedQuery, _this.autocompleteWordDelimiters, _this.autocompletePhraseDelimiters) : normalizedQuery;
            _this.container.matches = matches;
            _this.container.field = _this.autocompleteOptionField;
            _this.element.nativeElement.focus();
            return componentRef;
        });
    };
    Autocomplete.prototype.hide = function () {
        var _this = this;
        if (this.container) {
            this.popup.then(function (componentRef) {
                componentRef.dispose();
                _this.container = null;
                return componentRef;
            });
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Autocomplete.prototype, "autocompleteLoading", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Autocomplete.prototype, "autocompleteNoResults", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Autocomplete.prototype, "autocompleteOnSelect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Autocomplete.prototype, "autocomplete", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Autocomplete.prototype, "autocompleteMinLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Autocomplete.prototype, "autocompleteWaitMs", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Autocomplete.prototype, "autocompleteOptionsLimit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Autocomplete.prototype, "autocompleteOptionField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Autocomplete.prototype, "autocompleteAsync", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Autocomplete.prototype, "autocompleteLatinize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Autocomplete.prototype, "autocompleteSingleWords", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Autocomplete.prototype, "autocompleteWordDelimiters", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Autocomplete.prototype, "autocompletePhraseDelimiters", void 0);
    __decorate([
        core_1.HostListener('keyup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], Autocomplete.prototype, "onChange", null);
    Autocomplete = __decorate([
        core_1.Directive({
            selector: 'autocomplete[ngModel], [ngModel][autocomplete]'
        }), 
        __metadata('design:paramtypes', [common_1.NgModel, core_1.ElementRef, core_1.Renderer, core_1.DynamicComponentLoader])
    ], Autocomplete);
    return Autocomplete;
}());
exports.Autocomplete = Autocomplete;
//# sourceMappingURL=autocomplete.component.js.map