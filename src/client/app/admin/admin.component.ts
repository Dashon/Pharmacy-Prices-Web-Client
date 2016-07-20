import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
	moduleId: module.id,
	selector: 'admin-app',
	templateUrl: 'admin.component.html',
	directives: [ ROUTER_DIRECTIVES ]
})

export class AdminComponent {}
