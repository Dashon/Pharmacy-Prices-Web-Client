import { Component } from '@angular/core';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	moduleId: module.id,
    selector: 'dropdown-cmp',
    templateUrl: './dropdown.component.html',
    directives: [DROPDOWN_DIRECTIVES]
})

export class DropdownComponent {}
