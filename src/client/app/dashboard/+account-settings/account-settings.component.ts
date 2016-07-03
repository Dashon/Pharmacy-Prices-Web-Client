import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'account-settings-cmp',
    templateUrl: 'account-settings.component.html',

    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class AccountSettingsComponent {
    clinicPharmacies = [];
    editMode = false;
    http = null;
    response = null;
    baseUrl = 'http://localhost:3000/api/v1/';
    currentUser = {};
    editUser = {};
    currentUserId = 2;
    errorMessage = null;

    constructor(http:Http) {
        this.http = http;
    }

    callApi(url) {
        var authHeader = new Headers();
        authHeader.append('X-Api-Key', '9a04cee7-09d3-4372-8f56-1713ac445fff');

        var options = new RequestOptions({headers: authHeader});
        return this.http.get(url, options);
    }

    putApi(url, body) {
        var authHeader = new Headers();
        authHeader.append('X-Api-Key', '9a04cee7-09d3-4372-8f56-1713ac445fff');

        var options = new RequestOptions({headers: authHeader});
        var bodyJSON = JSON.stringify({body});
        return this.http.put(url, bodyJSON, options);
    }

    getAccountInfo() {
        return this.callApi(this.baseUrl + 'users/' + this.currentUserId).subscribe(
            user => this.currentUser = user,
            error => this.errorMessage = <any>error);
    }


    putAccountInfo() {
        return this.putApi(this.baseUrl + 'users/' + this.currentUserId, {user: this.editUser}).subscribe(
            user => this.currentUser = user,
            error => this.errorMessage = <any>error);
    }

    edit() {
        this.editMode = true;
        this.editUser = (JSON.parse(JSON.stringify(this.currentUser)));
    }

    save() {
        this.putAccountInfo().subscribe(
            () =>  this.editMode = false,
            () =>  this.editMode = false
        );

    }

    cancel() {
        this.editMode = false;
    }

}
