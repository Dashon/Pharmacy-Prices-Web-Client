import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { TopNavComponent, SidebarComponent } from '../shared/index';

@Component({
	moduleId: module.id,
	selector: 'dashboard-app',
	templateUrl: 'dashboard.component.html',
	directives: [ ROUTER_DIRECTIVES, TopNavComponent, SidebarComponent ]
})

export class DashboardComponent {}
