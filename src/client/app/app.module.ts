// import {APP_BASE_HREF } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import {enableProdMode,Provider} from '@angular/core';
// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// import {BrowserModule} from '@angular/platform-browser';
//
// import {HttpModule,Http} from '@angular/http';
// import {AuthGuard, AdminGaurd} from './shared/services/auth.gaurd';
// import {AuthHttp} from './config/http';
// import {APP_ROUTER_PROVIDERS, APP_ROUTER} from './app.routes';
// import {Router, RouterModule} from '@angular/router';

import {Observable} from 'rxjs/Rx';
import {AppComponent} from './app.component';
//import {GOOGLE_MAPS_PROVIDERS, provideLazyMapsAPILoaderConfig} from 'angular2-google-maps/core/index';
import {AuthConfig} from 'angular2-jwt/angular2-jwt';
if ('<%= ENV %>' === 'prod') {
    enableProdMode();
}
import "rxjs/Rx";
// /**
//  * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
//  * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
//  */
// /*
// bootstrap(AppComponent, [
//     disableDeprecatedForms(),
//     HTTP_PROVIDERS,
//     APP_ROUTER_PROVIDERS,
//     AuthGuard,
//     AdminGaurd,
//     provide(AuthConfig, {
//         useFactory: () => {
//             return new AuthConfig({
//                 noJwtError: true,
//                 globalHeaders: [
//                     {'Content-Type':'application/json'},
//                     {'X-Api-Key':'324212a0-db7b-468e-aaeb-e4b6502e829e'}
//                 ]
//             });
//         }
//     }),
//     provide(AuthHttp, {
//         useFactory: (http, router) => {
//             return new AuthHttp(new AuthConfig({
//                 globalHeaders: [
//                     {'Content-Type':'application/json'},
//                     {'X-Api-Key':'324212a0-db7b-468e-aaeb-e4b6502e829e'}
//                 ],
//             }), http, router);
//         },
//         deps: [Http, Router]
//     }),
//     AuthHttp,
//     provideForms(),
//     GOOGLE_MAPS_PROVIDERS,
//     provideLazyMapsAPILoaderConfig({
//         apiKey: 'AIzaSyAtBZU8c18SA2J8LeaqkO-N3ox-mVE8Iis'
//     }),
//     {
//         provide: APP_BASE_HREF,
//         useValue: '<%= APP_BASE %>'
//     }
// ]);
// */
// import {LoginComponent} from '../app/+login/index';
// @NgModule({
//     declarations: [
//         AppComponent
//     ],
//     imports: [
//         BrowserModule,
//         FormsModule,
//         HttpModule,
//         //DeprecatedFormsModule,
//         RouterModule.forRoot([{
//             path: 'login',
//             component: LoginComponent
//         },
//             {
//                 path: '',
//                 component: LoginComponent
//             }
//             ])
//     ],
//     providers: [],
//     bootstrap: [AppComponent]
// })
// export class AppModule { }
//
// @NgModule({
//     declarations: [
//         AppComponent,
//         LoginComponent,
//         HomeComponent,
//         MyNewDirectiveDirective,
//         DateFormatPipe
//     ],
//     imports: [
//         BrowserModule,
//         FormsModule,
//         HttpModule,
//         RouterModule.forRoot([
//             {path :'', component:LoginComponent}
//         ])
//     ],
//     providers: [],
//     bootstrap: [AppComponent]
// })
// export class AppModule { }


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';

import { LoginComponent } from '../app/+login/index';




@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {path :'', component:LoginComponent}
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
