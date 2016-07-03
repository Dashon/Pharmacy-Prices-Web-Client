import { APP_BASE_HREF } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms/index';
import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';

import { APP_ROUTER_PROVIDERS } from './app.routes';
import { AppComponent } from './app.component';
import {GOOGLE_MAPS_PROVIDERS,provideLazyMapsAPILoaderConfig} from 'angular2-google-maps/core/index';
if ('<%= ENV %>' === 'prod') { enableProdMode(); }

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
 bootstrap(AppComponent, [
 	HTTP_PROVIDERS,
 	disableDeprecatedForms(),
 	provideForms(),
 	APP_ROUTER_PROVIDERS,
	 GOOGLE_MAPS_PROVIDERS,
	 provideLazyMapsAPILoaderConfig( {
		 apiKey: 'AIzaSyAtBZU8c18SA2J8LeaqkO-N3ox-mVE8Iis'
	 } ),
	 {
 		provide: APP_BASE_HREF,
 		useValue: '<%= APP_BASE %>'
 	}
]);
