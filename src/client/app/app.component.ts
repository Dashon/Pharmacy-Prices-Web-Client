import { Component,ViewContainerRef, NgModule } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { TopNavComponent, SidebarComponent } from './shared/index';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
 @NgModule({
 	moduleId: module.id,
 	selector: 'sd-app',
 	templateUrl: 'app.component.html',
 	directives: [ROUTER_DIRECTIVES, TopNavComponent, SidebarComponent, Ng2Bs3ModalModule]
	// imports: [Ng2Bs3ModalModule]
 })

export class AppComponent {
	viewContainerRef;
	public constructor(viewContainerRef:ViewContainerRef) {
		// You need this small hack in order to catch application root view container ref
		this.viewContainerRef = viewContainerRef;
	}

}
