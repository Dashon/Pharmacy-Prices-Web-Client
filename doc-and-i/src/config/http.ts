import {Injectable, Provider} from '@angular/core';
import {Http, Request, Response, RequestOptionsArgs} from '@angular/http';
import {Router} from '@angular/router';
import {AuthHttp as JwtAuthHttp, AuthConfig} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthHttp extends JwtAuthHttp {
    constructor(options: AuthConfig, http: Http, private _router: Router) {
        super(options, http);
    }
    _isUnauthorized(status: number): boolean {
        return status === 401;
    }
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        var response = super.request(url, options);
        response.subscribe(null, err => {
            if (this._isUnauthorized(err.status)) {
                localStorage.clear();
                this._router.navigate(['/', 'login']);
            }
        });
        return response;
    }
}
export const AUTH_PROVIDER: any = [
    provide(AuthHttp, {
        useFactory: (http, router) => {
            return new AuthHttp(new AuthConfig({
                globalHeaders: [
                    { 'Content-Type': 'application/json' },
                    { 'X-Api-Key': '324212a0-db7b-468e-aaeb-e4b6502e829e' }
                ],
            }), http, router);
        },
        deps: [Http, Router]
    }),
];
