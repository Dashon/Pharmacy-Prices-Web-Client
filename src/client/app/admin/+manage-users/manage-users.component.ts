import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {MapToArray} from "../../shared/pipes/MapToArray";
import {AuthHttp} from "../../config/http";

@Component({
    moduleId: module.id,
    selector: 'manage-users-cmp',
    templateUrl: './manage-users.component.html',
    pipes: [MapToArray],
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class ManageUsersComponent {
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    http = null;
    response = null;
    errorMessage = null;

    healthCareFacilities = [];
    editUserItem = {};
    allUsers = [];
    roles = [];
    totalPages = 0;
    currentPage = 0;


    constructor(http:AuthHttp) {
        this.http = http;
        this.getUsers(1);
        this.getRoles();
        this.getHealthCareFacilities();
    }

    getHealthCareFacilities() {
        return this.callApi(this.baseUrl + 'health_care_facilities/').subscribe(
            res => this.healthCareFacilities = JSON.parse(res._body),
            error => this.errorMessage = <any>error);
    }

    getRoles() {
        return this.callApi(this.baseUrl + 'users/roles/').subscribe(
            res => this.roles = JSON.parse(res._body),
            error => this.errorMessage = <any>error);
    }

    createUser() {
        this.postApi(this.baseUrl + 'users/', this.editUserItem).subscribe(
            () => this.getUsers(this.totalPages),
            error => this.errorMessage = <any>error);
        this.editUserItem = {};
    }

    editUser(user) {
        this.editUserItem = (JSON.parse(JSON.stringify(user)))

        //set role to role.id
        delete this.editUserItem['role'];
        this.editUserItem['role'] = this.roles[user['role']];
    }

    getUsers(page) {
        this.callApi(this.baseUrl + 'users?page=' + page).map(res => {
            this.totalPages = res.headers.get('Total_pages');
            this.currentPage = res.headers.get('Current_page');
            return res.json()
        }).subscribe((el)=> this.allUsers = el);
    }

    saveUser() {
        this.putApi(this.baseUrl + 'users/' + this.editUserItem['id'], this.editUserItem).map(res => res.json()).subscribe(()=> {
            this.getUsers(this.currentPage);
        });
        this.editUserItem = {};

    }

    inviteUser(){
       if(this.editUserItem['role']){
           this.editUserItem['role'] = parseInt(this.editUserItem['role']);
       }

        this.postApi(this.baseUrl + 'invite_user', this.editUserItem).subscribe(
            () => {
                this.getUsers(this.totalPages);
                this.editUserItem = {};
            },
            error => this.errorMessage = <any>error);
    }

    // deleteUser(id) {
    //     return this.deleteApi(this.baseUrl + 'users/' + id).subscribe(()=> {
    //         this.getUsers(this.currentPage);
    //     });
    // }

    deleteUser(id) {
        return this.callApi('https://doc-and-i-api.herokuapp.com/api/v1/users/' + id + '/unassociate').subscribe(
            ()=> this.getUsers(this.currentPage),
            error => this.errorMessage = <any>error);
    }

    cancelEditUser() {
        this.editUserItem = {};
    }


    newUser() {
        this.editUserItem = {id: 'NEW'};
    }

    prevPage() {
        this.getUsers(this.currentPage - 1);
    }

    nextPage() {
        this.getUsers(this.currentPage + 1);
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
