import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
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
    baseUrl = 'http://localhost:3000/api/v1/';
    http = null;
    response = null;
    errorMessage = null;

    constructor(http:Http) {
        this.http = http;
    }


    login() {

        this.postApi(this.baseUrl + 'auth_user/',{"email":"i@dashon.co", "password":"docandi5"}).subscribe(
            response => {
                var user = response.json().user;
                localStorage.setItem('id_token', response.json().auth_token);
                localStorage.setItem('user_id', user.id);
                localStorage.setItem('name', user.name);
                localStorage.setItem('hcf_id', user.hcf_id);

                console.log(response.json().auth_token);
            },
            error => {
                console.log(error);
            });



    }

    postApi(url, body) {
        var authHeader = new Headers();
        authHeader.append('X-Api-Key', 'cbc6983d-7f39-4a89-9d23-c3b883f8263a');
        authHeader.append('Content-Type', 'application/json');

        var options = new RequestOptions({headers: authHeader});
        this.errorMessage = '';
        var bodyJSON = JSON.stringify(body);
        return this.http.post(url, bodyJSON,options);
    }

}
