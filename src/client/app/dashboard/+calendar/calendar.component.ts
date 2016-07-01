import {Component, OnInit} from '@angular/core';

@Component({
	moduleId: module.id,
    selector: 'calendar-cmp',
    templateUrl: './calendar.component.html'
})

export class CalendarComponent implements OnInit {
	ngOnInit() {
		var calendar: any = $('#calendar');
		calendar.fullCalendar({
		     eventClick: function(calEvent: any, jsEvent: any, view: any) {
		        alert('Event: ' + calEvent.title);
		        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
		        alert('View: ' + view.name);
		    }
		});
	}
}
