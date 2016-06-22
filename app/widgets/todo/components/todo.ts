import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import {NameList} from '../../../shared/services/name_list';
@Component({
	selector: 'todo',
	templateUrl: './widgets/todo/components/todo.html',
	providers: [NameList],
	directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})

export class TodoCmp {
	newName: string;
	constructor(public nameList: NameList) { }
	addName(): boolean {
		this.nameList.add(this.newName);
		this.newName = '';
		return false;
	}
	ngOnInit() {
		var todoListWraper: any = $('.todo-list-wrap');
		todoListWraper.perfectScrollbar();
	}
}
