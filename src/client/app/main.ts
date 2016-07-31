import {APP_BASE_HREF,} from '@angular/common';
import {disableDeprecatedForms, provideForms} from '@angular/forms/index';
import {enableProdMode,provide,} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS,Http} from '@angular/http';
import {AuthGuard, AdminGaurd} from "./shared/services/auth.gaurd";
import {AuthHttp, AUTH_PROVIDER} from './config/http';
import {APP_ROUTER_PROVIDERS} from './app.routes';
import {Router} from '@angular/router';

import {AppComponent} from './app.component';
import {GOOGLE_MAPS_PROVIDERS, provideLazyMapsAPILoaderConfig} from 'angular2-google-maps/core/index';
import {AuthConfig} from "angular2-jwt/angular2-jwt";
if ('<%= ENV %>' === 'prod') {
    enableProdMode();
}

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    AuthGuard,
    AdminGaurd,
    provide(AuthConfig, {
        useFactory: () => {
            return new AuthConfig({
                noJwtError: true,
                globalHeaders: [
                    {'Content-Type':'application/json'},
                    {'X-Api-Key':'f78efab5-b478-430e-a94d-4ecf052c6425'}
                ]
            });
        }
    }),
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
    AuthHttp,
    disableDeprecatedForms(),
    provideForms(),
    GOOGLE_MAPS_PROVIDERS,
    provideLazyMapsAPILoaderConfig({
        apiKey: 'AIzaSyAtBZU8c18SA2J8LeaqkO-N3ox-mVE8Iis'
    }),
    {
        provide: APP_BASE_HREF,
        useValue: '<%= APP_BASE %>'
    }
]);
