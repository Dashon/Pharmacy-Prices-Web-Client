"use strict";
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var router_1 = require('angular2/router');
var app_1 = require('./layout/base/components/app');
var http_1 = require('angular2/http');
if ('<%= ENV %>' === 'prod') {
    core_1.enableProdMode();
}
browser_1.bootstrap(app_1.AppCmp, [
    router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, http_1.BaseRequestOptions,
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
]);
//# sourceMappingURL=main.js.map