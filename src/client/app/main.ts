import { APP_BASE_HREF } from '@angular/common';
import { disableDeprecatedForms, provideForms } from '@angular/forms/index';
import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { APP_ROUTER_PROVIDERS } from './app.routes';
import { AppComponent } from './app.component';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
 bootstrap(AppComponent, [
 	disableDeprecatedForms(),
 	provideForms(),
 	APP_ROUTER_PROVIDERS,
 	{
 		provide: APP_BASE_HREF,
 		useValue: '<%= APP_BASE %>'
 	}
]);
