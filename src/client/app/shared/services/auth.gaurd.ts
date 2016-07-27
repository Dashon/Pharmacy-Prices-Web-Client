import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import {AuthHttp} from "../../config/http";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {

        if (tokenNotExpired()) {
            return true;
        }
        localStorage.removeItem('id_token');
        this.router.navigate(['/login']);
        return false;
    }


}

@Injectable()
export class AdminGaurd implements CanActivate {
    private isAdmin:boolean = false;

    constructor(private router: Router, private http:AuthHttp) {
        var role = localStorage.getItem('role');

        this.isAdmin = (role =='doc_and_i_admin');
    }

    canActivate() {
        var baseUrl = 'http://localhost:3000/api/v1/';

        this.http.get(baseUrl + 'users/1/isAdmin').subscribe((res) => {
            var role = res.json();
            this.isAdmin = role['isAdmin'] === "true";
            if(!this.isAdmin) {
                this.router.navigate(['/dashboard', '/home']);
                return false;
            }
            return true;
        });

        if (tokenNotExpired()) {
            return this.isAdmin;
        }
        localStorage.removeItem('id_token');
        this.router.navigate(['/login']);
        return false;
    }


}