import {Component, OnInit} from '@angular/core';

@Component({
	moduleId: module.id,
    selector: 'form-component',
    templateUrl: './form-cmp.components.html'
})

export class FormCmpComponent implements OnInit {
	ngOnInit() {
		var dateTimePicker:any = $('#date-time-picker');
		dateTimePicker.datetimepicker();
	}
}
