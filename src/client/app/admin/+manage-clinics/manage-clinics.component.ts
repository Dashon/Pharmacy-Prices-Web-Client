import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from "../../config/http";

@Component({
    moduleId: module.id,
    selector: 'manage-clinics-cmp',
    templateUrl: './manage-clinics.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class ManageClinicsComponent {
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    http = null;
    response = null;
    errorMessage = null;

    editClinicItem = {};
    clinics = [];
    totalPages = 0;
    currentPage = 0;


    constructor(http:AuthHttp) {
        this.http = http;
        this.getClinics(1);
    }

    createClinic() {
        this.postApi(this.baseUrl + 'health_care_facilities/', this.editClinicItem).subscribe(
            () => this.getClinics(this.totalPages),
            error => this.errorMessage = <any>error);
        this.editClinicItem = {};
    }

    editClinic(clinic) {
        this.editClinicItem = (JSON.parse(JSON.stringify(clinic)))
    }

    getClinics(page) {
        this.callApi(this.baseUrl + 'health_care_facilities?page=' + page).map(res => {
            this.totalPages = res.headers.get('Total_pages');
            this.currentPage = res.headers.get('Current_page');
            return res.json()
        }).subscribe((el)=> this.clinics = el);
    }

    saveClinic() {
            delete this.editClinicItem['image_url'];
        this.putApi(this.baseUrl + 'health_care_facilities/' + this.editClinicItem['id'], this.editClinicItem).map(res => res.json()).subscribe(()=> {
            this.getClinics(this.currentPage);
        });
        this.editClinicItem = {};

    }

    inviteUser(){
        this.postApi(this.baseUrl + 'invite_user', this.editUserItem).subscribe(
            () => this.getUsers(this.totalPages),
            error => this.errorMessage = <any>error);
    }

    deleteClinic(id) {
        return this.deleteApi(this.baseUrl + 'health_care_facilities/' + id).subscribe(()=> {
            this.getClinics(this.currentPage);
        });
    }

    cancelEditClinic() {
        this.editClinicItem = {};
    }


    newClinic() {
        this.editClinicItem = {id: 'NEW'};
    }

    prevPage() {
        this.getClinics(this.currentPage - 1);
    }

    nextPage() {
        this.getClinics(this.currentPage + 1);
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
