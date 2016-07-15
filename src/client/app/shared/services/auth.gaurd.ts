import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

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