import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
	moduleId: module.id,
    selector: 'ui-element',
    templateUrl: './ui-element.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class UiElementComponent {}
