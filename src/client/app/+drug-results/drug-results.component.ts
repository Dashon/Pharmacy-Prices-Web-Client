/**
 * Created by Dashon on 6/14/16.
 */

import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
/**
 * This class represents the lazy loaded DrugResultsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'drug-results-cmp',
  templateUrl: 'drug-results.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES,FORM_DIRECTIVES]
})
export class DrugResultsComponent {
    formChildren = [];
    children = [];
    forms = [];

    http = null;
    response = null;

    results = [];
    typeaheadLoading:boolean = false;
    typeaheadNoResults:boolean = false;
    public getAsyncDataRef = this.getAsyncData.bind(this);
    public searchString:string = '';


    constructor(http:Http) {
        this.http = http;
    }

    getDrugs(text) {
        this.formChildren = [];
        return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix=' + text).map(res => res.json())
            .map((el)=> {
                var uniqueItems = {};
                this.formChildren = [];

                this.results = el.filter((data)=> {
                    if (!uniqueItems[data.name]) {
                        uniqueItems[data.name] = data;
                        data.children = [];
                        data.children.push(data);
                        return data;
                    } else {
                        uniqueItems[data.name].children.push(data);
                        return false;
                    }
                });
                return this.results;
            }).toPromise();
    }

    getUsers() {
        this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/pharmacies?distance_from_zip=60640');
    }

    callApi(url) {
        var authHeader = new Headers();
        authHeader.append('X-Api-Key', '9a04cee7-09d3-4372-8f56-1713ac445fff');

        var options = new RequestOptions({headers: authHeader});
        return this.http.get(url, options);
    }

    getCurrentContext() {
        return this;
    }

    getAsyncData(context:any):Function {
        return this.getDrugs(this.searchString);
    }

    changeTypeaheadLoading(e:boolean) {
        this.typeaheadLoading = e;
    }

    changeTypeaheadNoResults(e:boolean) {
        this.typeaheadNoResults = e;
    }

    selectForm(form) {
        this.formChildren = this.children.filter(xx => xx.dosageForm === form);
    }
    typeaheadOnSelect(e:any) {
        this.children = e.item.children.map(res => res.children)[0];

        this.forms = this.children.map(xx => xx.dosageForm);
        this.formChildren = this.children.filter(xx => xx.dosageForm === this.forms[0]);
    }
}
