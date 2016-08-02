import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES,Router} from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: 'login.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent {
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    http = null;
    response = null;
    errorMessage = null;
    userName="";
    password="";

    constructor(http:Http, private router:Router) {
        this.http = http;
    }


    login() {
        this.postApi(this.baseUrl + 'auth_user/',{"email":this.userName, "password":this.password}).subscribe(
            response => {
                var user = response.json().user;
                localStorage.setItem('id_token', response.json().auth_token);
                localStorage.setItem('user_id', user.id);
                localStorage.setItem('name', user.name);
                localStorage.setItem('hcf_id', user.hcf_id);
                localStorage.setItem('role', user.role);

                this.router.navigate(['/dashboard', '/home']);

            },
            error => {
                this.errorMessage = error;
                this.errorMessage = "Bad Login"
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
