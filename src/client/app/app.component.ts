import { Component,ViewContainerRef, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopNavComponent, SidebarComponent } from './shared/index';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
	//moduleId: module.id,
	selector: 'sd-app',
	templateUrl: 'app.component.html',
	//imports:[RouterModule],
	directives: [TopNavComponent, SidebarComponent]
})

export class AppComponent {
	viewContainerRef;
	public constructor(viewContainerRef:ViewContainerRef) {
		// You need this small hack in order to catch application root view container ref
		this.viewContainerRef = viewContainerRef;
	}

}
