import {Injectable,provide} from '@angular/core';
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
    _request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        var response = super.request(url, options);
        response.subscribe(null, err => {
            if (this._isUnauthorized(err.status)) {
                this._router.navigate(['Login']);
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
                    {'Content-Type':'application/json'},
                    {'X-Api-Key':'f78efab5-b478-430e-a94d-4ecf052c6425'}
                ],
            }), http, router);
        },
        deps: [Http, Router]
    }),
];