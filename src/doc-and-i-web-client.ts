import {Component, View} from 'angular2/core';

@Component({
  selector: 'doc-and-i-web-client'
})

@View({
  templateUrl: 'drugSearch.html'
})

export class DocAndIWebClient {

  constructor() {
    console.info('DocAndIWebClient Component Mounted Successfully')
  }

}
