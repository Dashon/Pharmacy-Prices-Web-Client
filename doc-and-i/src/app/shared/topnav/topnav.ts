import {Component, ViewEncapsulation} from '@angular/core';
import {RouterModule, Router} from '@angular/router';

//import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
//import {AuthHttp} from '../../../config/http';

@Component({
   // moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
    encapsulation: ViewEncapsulation.None,
    //directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class TopNavComponent {
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    errorMessage = null;
    http = null;
    userName = localStorage.getItem('name');
    currentUser = {};

    
/*
    constructor(http:AuthHttp, private router:Router) {
        this.http = http;
        if (localStorage.getItem('user_id') && localStorage.getItem('user_id') != 'null') {
            this.getAccountInfo(localStorage.getItem('user_id'));
        }

    }

    getAccountInfo(id) {
        return this.callApi(this.baseUrl + 'users/' + id).subscribe(
            user => {
                this.currentUser = JSON.parse(user._body);
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            },
            error => this.errorMessage = <any>error);
    }

    changeTheme(color:string):void {
        var link:any = $('<link>');
        link
            .appendTo('head')
            .attr({type: 'text/css', rel: 'stylesheet'})
            .attr('href', 'themes/app-' + color + '.css');
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
        this.router.navigate(['/', 'login']);
    }

    goToHome() {
        this.router.navigate(['/', '']);
    }
    
    goTo340b() {
        this.router.navigate(['/', '340b',{closeMap:'true'}]);
    }
    logout() {
        localStorage.clear();

        return this.deleteApi(this.baseUrl + 'sign_out').subscribe(
            () => {
                this.router.navigate(['/', 'login']);
            },
            error => {
                this.errorMessage = error;
                this.router.navigate(['/', 'login']);
            });
    }

    deleteApi(url) {
        this.errorMessage = '';
        return this.http.delete(url);
    }

    callApi(url) {
        this.errorMessage = '';
        return this.http.get(url);
    }
    */
}
