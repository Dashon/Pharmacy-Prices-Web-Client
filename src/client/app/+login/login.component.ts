import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
//import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms/index';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'login-cmp',
  templateUrl: 'login.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent {}
