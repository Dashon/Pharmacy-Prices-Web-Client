/// <reference path="../../../../../../tools/manual_typings/project/ckeditor.d.ts" />

import {Component, Directive, ElementRef} from '@angular/core';

@Directive({
	selector: '[ckEditor]'
})
class CKEditorDirective {
	constructor(_elm: ElementRef) {
		CKEDITOR.replace(_elm.nativeElement);
	}
}

@Component({
	moduleId: module.id,
    selector: 'compose-cmp',
    templateUrl: './compose.component.html',
    directives: [CKEditorDirective]
})

export class ComposeComponent {
	items = 'Edit Text';
}
