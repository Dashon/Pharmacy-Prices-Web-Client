import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from 'angular2-jwt';

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
    encapsulation: ViewEncapsulation.None,
    directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class TopNavComponent {
    baseUrl = 'http://localhost:3000/';
    errorMessage = null;
    http = null;

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


    logout() {
        return this.deleteApi(this.baseUrl + 'users/sign_out').subscribe(
            () => this.router.navigate(['/', 'login']),
            error => this.errorMessage = <any>error);
    }

    deleteApi(url) {
        this.errorMessage = '';
        return this.http.delete(url);
    }
}
