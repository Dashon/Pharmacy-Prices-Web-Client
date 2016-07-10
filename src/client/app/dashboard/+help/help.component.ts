import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'help-cmp',
    templateUrl: './help.component.html',
    directives: [DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class HelpComponent {
    http = null;

    constructor(http:Http) {
        this.http = http;
    }




}
