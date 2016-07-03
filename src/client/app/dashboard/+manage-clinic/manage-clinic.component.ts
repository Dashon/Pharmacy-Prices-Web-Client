import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'manage-clinic-cmp',
    templateUrl: './manage-clinic.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class ManageClinicComponent {
    clinicPharmacies = [];
    currentClinic = {};
    editClinic = {};
    http = null;
    response = null;
    editMode = false;
    userEditMode = false;
    editUser = {}
    errorMessage = null;
    clinicId = 1;
    baseUrl = 'http://localhost:3000/api/v1/';
    apiKey = '0113aaaf-87da-4677-a13c-fb4d9420de1b';
    members = [{id:1, name: 'test Man', email: 'test@email.com', role: 'Team Member'},
        {id:2, name: 'Admin', email: 'admin@email.com', role: 'Admin Member'}];

    constructor(http:Http) {
        this.http = http;
        this.getClinic();
    }

    callApi(url) {
        var authHeader = new Headers();
        this.errorMessage = '';
        authHeader.append('X-Api-Key', this.apiKey);
        var options = new RequestOptions({headers: authHeader});
        return this.http.get(url, options);
    }


    putApi(url, body) {
        this.errorMessage = '';
        var authHeader = new Headers();
        authHeader.append('X-Api-Key', this.apiKey);
        var options = new RequestOptions({headers: authHeader});
        var bodyJSON = JSON.stringify({body});
        return this.http.put(url, bodyJSON, options);
    }


    deleteApi(url) {
        this.errorMessage = '';
        var authHeader = new Headers();
        authHeader.append('X-Api-Key', this.apiKey);
        var options = new RequestOptions({headers: authHeader});
        return this.http.delete(url, options);
    }

    setCurrentClinic(clinic) {
        this.currentClinic = clinic;
    }

    edit(clinic) {
        this.editMode = true;
        this.editClinic = (JSON.parse(JSON.stringify(clinic)));
    }

    save() {
        this.putClinic().subscribe(
            () => this.editMode = false,
            () => this.editMode = false
        );

    }

    cancel() {
        this.editMode = false;
    }


    editMember(user) {
        this.userEditMode = true;
        this.editUser = (JSON.parse(JSON.stringify(user)));
        user.editMode = true;
    }

    saveMember(user) {
        this.putUser().subscribe(
            () => this.userEditMode = false,
            () => this.userEditMode = false
        );
        user.editMode = false;
    }

    canceMemberEdit(user) {
        this.userEditMode = false;
        user.editMode = false;
    }

    getClinic() {
        return this.callApi(this.baseUrl + 'answers/' + this.clinicId).subscribe(
            clinic => this.currentClinic = clinic._body,
            error => this.errorMessage = <any>error);
    }

    putClinic() {
        return this.putApi(this.baseUrl + 'health_care_facility/' + this.clinicId, {user: this.editClinic}).subscribe(
            clinic => this.currentClinic = clinic,
            error => this.errorMessage = <any>error);
    }

    putUser() {
        return this.putApi(this.baseUrl + 'health_care_facility/' + this.clinicId, {user: this.editUser}).subscribe(
            clinic => this.currentClinic = clinic,
            error => this.errorMessage = <any>error);
    }
}
