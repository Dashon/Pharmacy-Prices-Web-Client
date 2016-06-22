import {Component} from 'angular2/core';
import {CAROUSEL_DIRECTIVES, TOOLTIP_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
@Component({
    selector: 'other',
    templateUrl: './pages/ui-element/other-element/components/other-element.html',
    directives: [CAROUSEL_DIRECTIVES, TOOLTIP_DIRECTIVES]
})

export class OtherCmp {}
