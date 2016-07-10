import {APP_BASE_HREF} from '@angular/common';
import {disableDeprecatedForms, provideForms} from '@angular/forms/index';
import {enableProdMode,provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS,Http} from '@angular/http';
import {AUTH_PROVIDERS,AuthHttp, AuthConfig} from 'angular2-jwt';

import {APP_ROUTER_PROVIDERS} from './app.routes';
import {AppComponent} from './app.component';
import {GOOGLE_MAPS_PROVIDERS, provideLazyMapsAPILoaderConfig} from 'angular2-google-maps/core/index';
if ('<%= ENV %>' === 'prod') {
    enableProdMode();
}

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig({
                globalHeaders: [
                    {'Content-Type':'application/json'},
                    {'X-Api-Key':'dd337a5f-48f4-4207-85c4-35638dfd56b5'}
                ],
            }), http);
        },
        deps: [Http]
    }),
    disableDeprecatedForms(),
    provideForms(),
    APP_ROUTER_PROVIDERS,
    GOOGLE_MAPS_PROVIDERS,
    provideLazyMapsAPILoaderConfig({
        apiKey: 'AIzaSyAtBZU8c18SA2J8LeaqkO-N3ox-mVE8Iis'
    }),
    {
        provide: APP_BASE_HREF,
        useValue: '<%= APP_BASE %>'
    }
]);
