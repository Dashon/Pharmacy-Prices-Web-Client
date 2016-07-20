import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

/**
 * This class represents the lazy loaded SignupComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'signup-cmp',
  templateUrl: 'signup.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class SignupComponent {}
