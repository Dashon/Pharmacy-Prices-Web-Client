/**
 * Created by Dashon on 6/14/16.
 */

import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
// import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
/**
 * This class represents the lazy loaded AccountSettingsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'account-settings-cmp',
  templateUrl: 'account-settings.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES,FORM_DIRECTIVES]
})
export class AccountSettingsComponent {
}
