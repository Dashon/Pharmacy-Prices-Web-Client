import {Component} from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Component({
    moduleId: module.id,
    selector: 'edit-request-cmp',
    templateUrl: './edit-request.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES,FORM_DIRECTIVES]

})
export class EditRequestComponent {
    baseUrl = 'http://localhost:3000/api/v1/';
    http = null;
    response = null;
    errorMessage = null;

    editRequests = [];
    totalPages = 0;
    currentPage = 0;


    constructor(http:AuthHttp) {
        this.http = http;
        this.getEditRequests(1);
    }


    getEditRequests(page) {
        this.callApi(this.baseUrl + 'pharmacy_edit_requests?page=' + page).map(res => {
            this.totalPages = res.headers.get('Total_pages');
            this.currentPage = res.headers.get('Current_page');
            return res.json()
        }).subscribe((el)=> this.editRequests = el);
    }

    approveEditRequest(id) {
        this.callApi(this.baseUrl + 'pharmacy_edit_requests/approve/'+ id).map(res => res.json()).subscribe(()=> {
            this.getEditRequests(this.currentPage);
        });
    }

    denyEditRequest(id) {
        this.callApi(this.baseUrl + 'pharmacy_edit_requests/deny/'+ id).map(res => res.json()).subscribe(()=> {
            this.getEditRequests(this.currentPage);
        });
    }

    prevPage() {
        this.getEditRequests(this.currentPage - 1);
    }

    nextPage() {
        this.getEditRequests(this.currentPage + 1);
    }


    callApi(url) {
        this.errorMessage = '';
        return this.http.get(url);
    }
}
