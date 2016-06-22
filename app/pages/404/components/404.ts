import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
	selector: 'page-not-found',
	templateUrl: './pages/404/components/404.html'
})

export class PageNotFoundCmp {
	constructor(private _router:Router) {}
	gotoHome() {
		this._router.navigate(['Dashboard','Home']);
	}
}
