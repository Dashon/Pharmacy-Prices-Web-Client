import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {CORE_DIRECTIVES} from 'angular2/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	selector: 'topnav',
	templateUrl: './widgets/topnav/components/topnav.html',
	directives: [DROPDOWN_DIRECTIVES, CORE_DIRECTIVES]
})

export class TopNavCmp {
	status:{isopen:boolean} = {isopen: false};
	constructor(private _router:Router) {}

	toggled(open:boolean):void {
	console.log('Dropdown is now: ', open);
	}

	sidebarToggler(): void  {
		var sidebar: any = $('#sidebar');
		var mainContainer: any = $('.main-container');
		sidebar.toggleClass('sidebar-left-zero');
		mainContainer.toggleClass('main-container-ml-zero');
	}
	rtl(): void {
		var body: any = $('body');
		body.toggleClass('rtl');
	}

	toggleDropdown($event:MouseEvent):void {
		$event.preventDefault();
		$event.stopPropagation();
		this.status.isopen = !this.status.isopen;
	}
	changeTheme(color: string): void {
		var link: any = $('<link>');
		link
			.appendTo('head')
			.attr({type : 'text/css', rel : 'stylesheet'})
			.attr('href', 'assets/sass/app-'+color+'.css');
	}
	gotoLogin(): void {
		this._router.navigate(['Login']);
	}
	gotoHome(): void {
		this._router.navigate(['Dashboard','Home']);
	}
  gotoSavings(): void {
    this._router.navigate(['Dashboard','DrugSearch']);
  }
	gotoProfile(): void {
		this._router.navigate(['Profile']);
	}
}
