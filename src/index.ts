import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {DocAndIWebClient} from 'doc-and-i-web-client';

@Component({
  selector: 'main'
})

@View({
  directives: [DocAndIWebClient],
  template: `
    <doc-and-i-web-client></doc-and-i-web-client>
  `
})

class Main {

}

bootstrap(Main);
