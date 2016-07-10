import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from 'angular2-jwt';
import {MapToArray} from "../../shared/pipes/MapToArray";
@Component({
    moduleId: module.id,
    selector: 'my-clinic-cmp',
    templateUrl: './my-clinic.component.html',
    pipes: [MapToArray],
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]
})
export class MyClinicComponent {
    baseUrl = 'http://localhost:3000/api/v1/';
    http = null;
    response = null;
    errorMessage = null;

    clinicPharmacies = [];
    clinics = [];

    currentClinic = {id: 1};
    editClinicItem = {};
    editLocationItem = {};
    editMemberItem = {image_url: '33'};

    editMode = false;
    userEditMode = false;
    members = [];
    roles = [];

    constructor(http:AuthHttp) {
        this.http = http;
        this.getClinic();
        this.getRoles()
    }

    setCurrentClinic(clinic) {
        this.currentClinic = clinic;
    }

    handleLogo(event) {
        var files = event.srcElement.files

        if (files) {
            var file = files[0];
            var imageType = /^image\//;
            if (!imageType.test(file.type)) {
                return;
            }

            var nBytes = file.size;
            var filesizeText = nBytes + " bytes";
            // optional code for multiples approximation
            for (var aMultiples = ["KB", "MB", "GB", "TB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
                filesizeText = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
            }

            if (nBytes > 2000000) {
                this.errorMessage = "Max File Size 2 MB. Current size: " + filesizeText
                return;
            }

            var reader = new FileReader();
            reader.onload = (function (scope) {
                return function (e) {
                    scope['image_url'] = e.target.result;
                };
            })(this.editClinicItem);
            
            reader.readAsDataURL(file);
        }

    }

    editClinic(clinic) {
        this.editClinicItem = (JSON.parse(JSON.stringify(clinic)));
    }

    saveClinic() {
        this.putClinic().subscribe(
            clinic => this.getClinic(),
            error => this.errorMessage = <any>error);
        this.editClinicItem = {};
    }

    cancelEditClinic() {
        this.editClinicItem = {};
    }

    getClinics() {
        return this.callApi(this.baseUrl + 'health_care_facilities?limit=100').map(res => res.json()).subscribe(
            (el)=> this.clinics = el['health_care_facilities'],
            error => this.errorMessage = <any>error);
    }

    getClinic() {
        return this.callApi(this.baseUrl + 'health_care_facilities/' + this.currentClinic['id']).subscribe(
            clinic => this.currentClinic = JSON.parse(clinic._body),
            error => this.errorMessage = <any>error);
    }


    putClinic() {
        return this.putApi(this.baseUrl + 'health_care_facilities/' + this.editClinicItem['id'], this.editClinicItem);
    }


    editMember(user) {
        this.editMemberItem = (JSON.parse(JSON.stringify(user)));

        //set role to role.id
        delete this.editMemberItem['role'];
        this.editMemberItem['role_id'] = this.roles[user['role']];
    }

    saveMember() {
        this.putMember().subscribe(
            () => this.getClinic(),
            error => this.errorMessage = <any>error);
        this.editMemberItem = {};

    }


    deleteMember(id) {
        return this.callApi('http://localhost:3000/api/v1/users/' + id + '/unassociate').subscribe(
            ()=> this.getClinic(),
            error => this.errorMessage = <any>error);
    }

    cancelEditMember() {
        this.editMemberItem = {};
    }

    newMember() {
        this.editMemberItem = {id: 'NEW'};
    }

    inviteMember() {

    }

    setRole(role) {
        this.editMemberItem['role'] = role.key
    }


    putMember() {
        return this.putApi(this.baseUrl + 'users/' + this.editMemberItem['id'], this.editMemberItem);
    }


    editLocation(location) {
        this.editLocationItem = (JSON.parse(JSON.stringify(location)));
    }

    saveLocation() {
        this.putLocation().subscribe(
            () => this.getClinic(),
            error => this.errorMessage = <any>error);
        this.editLocationItem = {};
    }

    putLocation() {
        return this.putApi(this.baseUrl + 'hcf_locations/' +
            this.editLocationItem['id'], this.editLocationItem);
    }

    deleteLocation(id) {
        return this.deleteApi(this.baseUrl + 'hcf_locations/' + id).subscribe(
            () => this.getClinic(),
            error => this.errorMessage = <any>error);
    }

    cancelEditLocation() {
        this.editLocationItem = {};
    }

    newLocation() {
        this.editLocationItem = {id: 'NEW', health_care_facility_id: this.currentClinic.id};
    }

    createLocation() {
        this.postApi(this.baseUrl + 'hcf_locations/', this.editLocationItem).subscribe(
            () => this.getClinic(),
            error => this.errorMessage = <any>error);
        this.editLocationItem = {};
    }

    getRoles() {
        return this.callApi(this.baseUrl + 'users/roles/').subscribe(
            res => this.roles = JSON.parse(res._body),
            error => this.errorMessage = <any>error);
    }

    callApi(url) {
        this.errorMessage = '';
        return this.http.get(url);
    }

    putApi(url, body) {
        this.errorMessage = '';
        var bodyJSON = JSON.stringify(body);
        return this.http.put(url, bodyJSON);
    }

    postApi(url, body) {
        this.errorMessage = '';
        var bodyJSON = JSON.stringify(body);
        return this.http.post(url, bodyJSON);
    }

    deleteApi(url) {
        this.errorMessage = '';
        return this.http.delete(url);
    }

}
