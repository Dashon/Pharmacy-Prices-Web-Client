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
var http_1 = require('angular2/http');
var autocomplete_container_1 = require('../../../widgets/autocomplete/autocomplete-container');
var autocomplete_component_1 = require('../../../widgets/autocomplete/autocomplete.component');
exports.AUTOCOMPLETE_DIRECTIVES = [autocomplete_component_1.Autocomplete, autocomplete_container_1.AutocompleteContainer];
var DrugResultsComp = (function () {
    function DrugResultsComp(http) {
        this.http = null;
        this.response = null;
        this.status = { isopen: false };
        this.autocompleteLoading = false;
        this.autocompleteNoResults = false;
        this.carsExample1 = ['BMW', 'Audi', 'Mercedes', 'Porsche', 'Volkswagen', 'Opel', 'Maserati', 'Volkswagen', 'BMW Serie 2'];
        this.http = http;
    }
    DrugResultsComp.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    };
    DrugResultsComp.prototype.getDrugs = function (text) {
        var authHeader = new http_1.Headers();
        authHeader.append('X-Api-Key', '9a04cee7-09d3-4372-8f56-1713ac445fff');
        var options = new http_1.RequestOptions({ headers: authHeader });
        return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix=' + text, options);
    };
    DrugResultsComp.prototype.getUsers = function () {
        var authHeader = new http_1.Headers();
        authHeader.append('X-Api-Key', '9a04cee7-09d3-4372-8f56-1713ac445fff');
        var options = new http_1.RequestOptions({ headers: authHeader });
        this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/pharmacies?distance_from_zip=60640', options);
    };
    DrugResultsComp.prototype.callApi = function (url, options) {
        return this.http.get(url, options);
    };
    DrugResultsComp.prototype.getCurrentContext = function () {
        v = this.carsExample1;
        return this;
    };
    DrugResultsComp.prototype.getAsyncData = function (context) {
        var _this = this;
        if (this._previousContext === context) {
            return this._cachedResult;
        }
        this._previousContext = context;
        var f = this.getDrugs('add').subscribe(function (response) { return _this.response = response.text(); }, function (error) { return _this.response = error.text(); }, function () { return console.log('Secret Quote Complete'); });
        this._cachedResult = f;
        return this._cachedResult;
    };
    DrugResultsComp.prototype.changeAutocompleteLoading = function (e) {
        this.autocompleteLoading = e;
    };
    DrugResultsComp.prototype.changeAutocompleteNoResults = function (e) {
        this.autocompleteNoResults = e;
    };
    DrugResultsComp.prototype.autocompleteOnSelect = function (e) {
        console.log("Selected value: " + e.item);
    };
    DrugResultsComp = __decorate([
        core_1.Component({
            selector: 'drug-results',
            templateUrl: './pages/drug-results/components/drug-results.html',
            directives: [ng2_bootstrap_1.DROPDOWN_DIRECTIVES, exports.AUTOCOMPLETE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DrugResultsComp);
    return DrugResultsComp;
}());
exports.DrugResultsComp = DrugResultsComp;
//# sourceMappingURL=drug-results.js.map