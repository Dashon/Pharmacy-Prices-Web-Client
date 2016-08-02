import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES,Router} from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'forgot-password-cmp',
    templateUrl: 'forgot-password.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class ForgotPasswordComponent {
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    http = null;
    response = null;
    errorMessage = null;
    userName="";

    constructor(http:Http, private router:Router) {
        this.http = http;
    }


    forgotPassword() {
        this.postApi(this.baseUrl + 'forgot_password/',{"email":this.userName}).subscribe(
            response => {
                this.router.navigate(['/', '/login']);
            },
            error => {
                this.errorMessage = error;
            });
    }

    postApi(url, body) {
        var authHeader = new Headers();
        authHeader.append('X-Api-Key', '324212a0-db7b-468e-aaeb-e4b6502e829e');
        authHeader.append('Content-Type', 'application/json');

        var options = new RequestOptions({headers: authHeader});
        this.errorMessage = '';
        var bodyJSON = JSON.stringify(body);
        return this.http.post(url, bodyJSON,options);
    }

}
