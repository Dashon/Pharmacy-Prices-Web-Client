import {APP_BASE_HREF} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {enableProdMode,Provider} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {HttpModule,Http} from '@angular/http';
import {AuthGuard, AdminGaurd} from './shared/services/auth.gaurd';
import {AuthHttp} from './config/http';
import {APP_ROUTER_PROVIDERS} from './app.routes';
import {AppModule} from './app.module'
import {Router} from '@angular/router';

import {AppComponent} from './app.component';
//import {GOOGLE_MAPS_PROVIDERS, provideLazyMapsAPILoaderConfig} from 'angular2-google-maps/core/index';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {AuthConfig} from 'angular2-jwt/angular2-jwt';
if ('<%= ENV %>' === 'prod') {
    enableProdMode();
}

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */

platformBrowserDynamic().bootstrapModule(AppModule);

/*
bootstrap(AppComponent, [
    disableDeprecatedForms(),
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
                    {'X-Api-Key':'324212a0-db7b-468e-aaeb-e4b6502e829e'}
                ]
            });
        }
    }),
    provide(AuthHttp, {
        useFactory: (http, router) => {
            return new AuthHttp(new AuthConfig({
                globalHeaders: [
                    {'Content-Type':'application/json'},
                    {'X-Api-Key':'324212a0-db7b-468e-aaeb-e4b6502e829e'}
                ],
            }), http, router);
        },
        deps: [Http, Router]
    }),
    AuthHttp,
    provideForms(),
   // GOOGLE_MAPS_PROVIDERS,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyAtBZU8c18SA2J8LeaqkO-N3ox-mVE8Iis'
    }),
    // provideLazyMapsAPILoaderConfig({
    //     apiKey: 'AIzaSyAtBZU8c18SA2J8LeaqkO-N3ox-mVE8Iis'
    // }),
    {
        provide: APP_BASE_HREF,
        useValue: '<%= APP_BASE %>'
    }
]);
*/