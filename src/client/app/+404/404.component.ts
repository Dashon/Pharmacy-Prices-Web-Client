import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'page-not-found',
	templateUrl: './404.component.html'
})

export class PageNotFoundComponent {
	constructor(private _router:Router) {}
	gotoHome() {
		this._router.navigate(['/dashboard','/home']);
	}
}
