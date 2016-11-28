import { Component } from '@angular/core';

@Component({
  selector: 'sd-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
      System.import('app')
          .then(function() {
              System.import('./main.js') // or whatever the main entry point `System.register('app/main.js')` name is in the bundle
          });
  }
}
