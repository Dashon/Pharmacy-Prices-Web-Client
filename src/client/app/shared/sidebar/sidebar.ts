import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {AuthHttp} from '../../config/http';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.html',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DROPDOWN_DIRECTIVES]
})

export class SidebarComponent {
    isActive = false;
    showMenu:string = '';

    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    errorMessage = null;
    http = null;
    userName = localStorage.getItem('name');
    currentUser = {};


    constructor(http:AuthHttp, private router:Router) {
        this.http = http;
        if (localStorage.getItem('user_id') && localStorage.getItem('user_id') != 'null') {
            this.getAccountInfo(localStorage.getItem('user_id'));
        }
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element:any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    getAccountInfo(id) {
        return this.callApi(this.baseUrl + 'users/' + id).subscribe(
            user => this.currentUser = JSON.parse(user._body),
            error => this.errorMessage = <any>error);
    }

    rtl():void {
        var body:any = $('body');
        body.toggleClass('rtl');
    }

    sidebarToggler():void {
        var sidebar:any = $('#sidebar');
        var mainContainer:any = $('.main-container');
        sidebar.toggleClass('sidebar-left-zero');
        mainContainer.toggleClass('main-container-ml-zero');
    }

    isAdmin() {
        return localStorage.getItem('role') == 'doc_and_i_admin';
    }

    isLoggedIn() {
        return localStorage.getItem('user_id') != null;
    }

    isAssociated() {
        return this.isLoggedIn() && localStorage.getItem('hcf_id') != 'null';
    }

    goToLogin() {
        this.sidebarToggler();
        this.router.navigate(['/', 'login']);
    }

    goToHome() {
        this.sidebarToggler();
        this.router.navigate(['/', 'home']);
    }

    logout() {
        this.sidebarToggler();
        return this.deleteApi(this.baseUrl + 'sign_out').subscribe(
            () => {
                localStorage.removeItem('id_token');
                localStorage.removeItem('hcf_id');
                localStorage.removeItem('name');
                localStorage.removeItem('role');
                localStorage.removeItem('user_id');

                this.router.navigate(['/', 'login']);

            },
            error => this.errorMessage = <any>error);
    }

    deleteApi(url) {
        this.errorMessage = '';
        return this.http.delete(url);
    }

    callApi(url) {
        this.errorMessage = '';
        return this.http.get(url);
    }
}
