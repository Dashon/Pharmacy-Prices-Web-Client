import { Component,ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TopNavComponent, SidebarComponent } from './shared/index';


/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
 @Component({
 	moduleId: module.id,
 	selector: 'sd-app',
 	templateUrl: 'app.component.html',
 	directives: [ROUTER_DIRECTIVES, TopNavComponent, SidebarComponent]
 })

export class AppComponent {
	viewContainerRef;
	public constructor(viewContainerRef:ViewContainerRef) {
		// You need this small hack in order to catch application root view container ref
		this.viewContainerRef = viewContainerRef;
	}

}
