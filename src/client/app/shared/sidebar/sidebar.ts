import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html',
	directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class SidebarComponent implements OnInit {
	isActive = false;
	showMenu: string = '';

	constructor(private router: Router) {}

	ngOnInit() {
		var calendar:any = $('#calendar1');
		calendar.fullCalendar({
			 eventClick: function(calEvent:any, jsEvent:any, view:any) {
			    alert('Event: ' + calEvent.title);
			    alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			    alert('View: ' + view.name);
			}
		});
		var sidebar: any = $('.sidenav-outer');
		sidebar.perfectScrollbar();
	}

	eventCalled() {
		this.isActive = !this.isActive;
	}

	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}
}
