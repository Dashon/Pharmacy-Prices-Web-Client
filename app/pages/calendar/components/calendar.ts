import {Component} from 'angular2/core';

@Component({
	selector : 'calendar',
	templateUrl: './pages/calendar/components/calendar.html'
})

export class CalendarCmp {
	ngOnInit() {
		var calendar: any = $('#calendar');
		calendar.fullCalendar({
		     eventClick: function(calEvent, jsEvent, view) {
		        alert('Event: ' + calEvent.title);
		        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
		        alert('View: ' + view.name);
		    }
		});
	}
}
