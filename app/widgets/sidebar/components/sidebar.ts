import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'sidebar',
	templateUrl: './widgets/sidebar/components/sidebar.html',
	directives: [ROUTER_DIRECTIVES]
})

export class SidebarCmp {
	ngOnInit() {
		var calendar:any = $('#calendar1');
		calendar.fullCalendar({
		     eventClick: function(calEvent, jsEvent, view) {
		        alert('Event: ' + calEvent.title);
		        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
		        alert('View: ' + view.name);
		    }
		});
		var sidebar: any = $('.sidenav-outer');
		sidebar.perfectScrollbar();
	}
}
