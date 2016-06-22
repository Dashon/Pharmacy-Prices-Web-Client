/// <reference path="../../../../../tools/manual_typings/ckeditor.d.ts" />
import {Component, Directive, ElementRef} from 'angular2/core';
@Directive({
  selector: 'textarea'
})
class CKEditor {
  constructor(_elm: ElementRef) {
    CKEDITOR.replace(_elm.nativeElement);
  }
}

@Component({
    selector: 'compose',
    templateUrl: './pages/mail/compose/components/compose.html',
    directives: [CKEditor]
})

export class ComposeCmp {
	items = 'Edit Text';
}
