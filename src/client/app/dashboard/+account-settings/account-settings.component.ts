import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from "angular2-jwt";

@Component({
    moduleId: module.id,
    selector: 'account-settings-cmp',
    templateUrl: 'account-settings.component.html',

    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class AccountSettingsComponent {
    clinicPharmacies = [];
    http = null;
    response = null;
    baseUrl = 'http://localhost:3000/api/v1/';
    currentUser = {id:1};
    editUser = {};
    currentUserId = 1;
    errorMessage = null;

    constructor(http:AuthHttp) {
        this.http = http;
        this.getAccountInfo()
    }


    getAccountInfo() {
        return this.callApi(this.baseUrl + 'users/' + this.currentUser['id']).subscribe(
            user => this.currentUser = JSON.parse(user._body),
            error => this.errorMessage = <any>error);
    }
    putAccountInfo() {
        return this.putApi(this.baseUrl + 'users/' + this.currentUserId, {user: this.editUser}).subscribe(
            user => this.currentUser = user,
            error => this.errorMessage = <any>error);
    }


    changePasswordAccountInfo() {
        return this.putApi(this.baseUrl +'/password/', this.editUser);
    }

    edit() {
        this.editUser = (JSON.parse(JSON.stringify(this.currentUser)));
    }

    save() {
        this.changePasswordAccountInfo().subscribe(
            () =>  this.editUser = {},
            () =>  this.editUser = {}
        );

    }

    cancel() {
        this.editUser = {};
    }



    callApi(url) {
        this.errorMessage = '';
        return this.http.get(url);
    }

    postApi(url, body) {
        this.errorMessage = '';
        var bodyJSON = JSON.stringify(body);
        return this.http.post(url, bodyJSON);
    }

    putApi(url, body) {
        this.errorMessage = '';
        var bodyJSON = JSON.stringify(body);
        return this.http.put(url, bodyJSON);
    }


    deleteApi(url) {
        this.errorMessage = '';
        return this.http.delete(url);
    }

}
