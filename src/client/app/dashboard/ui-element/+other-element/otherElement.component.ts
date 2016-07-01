import { Component } from '@angular/core';
import {CAROUSEL_DIRECTIVES, TOOLTIP_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	moduleId: module.id,
    selector: 'other-element',
    templateUrl: './other-element.component.html',
    directives: [CAROUSEL_DIRECTIVES, TOOLTIP_DIRECTIVES]
})

export class OtherElementComponent {}
