import '../polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from '../environments/environment';
import { AppModule } from './index';

if (environment.production) {
  enableProdMode();
}



if ('<%= ENV %>' === 'prod') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
