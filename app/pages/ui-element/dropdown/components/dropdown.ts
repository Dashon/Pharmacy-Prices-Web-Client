import {Component} from 'angular2/core';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'grid',
    templateUrl: './pages/ui-element/dropdown/components/dropdown.html',
    directives: [DROPDOWN_DIRECTIVES]
})

export class DropdownCmp {
	status:{isopen:boolean} = {isopen: false};
	toggleDropdown($event:MouseEvent):void {
	    $event.preventDefault();
	    $event.stopPropagation();
	    this.status.isopen = !this.status.isopen;
	}
}
