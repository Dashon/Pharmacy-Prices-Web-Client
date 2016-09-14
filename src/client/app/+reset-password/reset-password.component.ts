import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES,Router,ActivatedRoute} from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'reset-password-cmp',
    templateUrl: 'reset-password.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class ResetPasswordComponent {
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    http = null;
    response = null;
    errorMessage = null;
    confirmPassword='';
    password='';
    password_token = null;

    constructor(http:Http, private router:Router, private route:ActivatedRoute) {
        this.http = http;
    }
    ngOnInit() {
        this.router
            .routerState
            .queryParams
            .subscribe(params => {
                this.password_token = params['reset_password_token'];
            });
    }

    changePassword() {
        localStorage.clear();
        this.postApi(this.baseUrl + 'reset_password/',{'password':this.confirmPassword, 'password_confirmation':this.password, 'reset_password_token':this.password_token}).subscribe(
            response => {
                this.router.navigate(['/', 'login']);
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
