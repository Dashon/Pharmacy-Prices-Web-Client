import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'edit-request-cmp',
    templateUrl: './edit-request.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES,FORM_DIRECTIVES]

})
export class EditRequestComponent {
    clinicPharmacies = [];

    http = null;
    response = null;


    constructor(http:Http) {
        this.http = http;
    }
    callApi(url) {
        var authHeader = new Headers();
        authHeader.append('X-Api-Key', '9a04cee7-09d3-4372-8f56-1713ac445fff');

        var options = new RequestOptions({headers: authHeader});
        return this.http.get(url, options);
    }

    getEditRequest(text) {
        return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix=' + text).map(res => res.json())
            .map((el)=> {
                var uniqueItems = {};

                this.clinicPharmacies = el.filter((data)=> {
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
                return this.clinicPharmacies;
            }).toPromise();
    }
    approveEditRequest(text) {
        return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix=' + text).map(res => res.json())
            .map((el)=> {
                var uniqueItems = {};

                this.clinicPharmacies = el.filter((data)=> {
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
                return this.clinicPharmacies;
            }).toPromise();
    }

    denyEditRequest(text) {
        return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix=' + text).map(res => res.json())
            .map((el)=> {
                var uniqueItems = {};

                this.clinicPharmacies = el.filter((data)=> {
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
                return this.clinicPharmacies;
            }).toPromise();
    }

}
