import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppCmp} from './layout/base/components/app';

import {HTTP_PROVIDERS, BaseRequestOptions} from 'angular2/http';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(AppCmp, [
	ROUTER_PROVIDERS,HTTP_PROVIDERS,BaseRequestOptions,
	provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
