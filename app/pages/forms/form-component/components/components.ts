import {Component} from 'angular2/core';

@Component({
    selector: 'form-component',
    templateUrl: './pages/forms/form-component/components/components.html'
})

export class FormComponentCmp {
	ngOnInit() {
		var dateTimePicker:any = $('#date-time-picker');
		dateTimePicker.datetimepicker();
	}
}
