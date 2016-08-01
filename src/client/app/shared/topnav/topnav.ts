import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from "../../config/http";

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
    encapsulation: ViewEncapsulation.None,
    directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class TopNavComponent {
    baseUrl = 'http://api.docandi.com/';
    errorMessage = null;
    http = null;
    userName = localStorage.getItem('name');


    constructor(http:AuthHttp, private router:Router) {
        this.http = http;
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
    goToLogin(){
        this.router.navigate(['/', 'login']);
    }
    logout() {
        return this.deleteApi(this.baseUrl + 'users/sign_out').subscribe(
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
}
