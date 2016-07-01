import {Component, OnInit} from '@angular/core';
//import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms/index';

//import {NameList} from '../../app/shared/services/name_list';

@Component({
	moduleId: module.id,
	selector: 'todo-cmp',
	templateUrl: './todo.html',
	directives: [REACTIVE_FORM_DIRECTIVES]
})

export class TodoComponent implements OnInit {
	newName: string;
	nameList: any = [
		'Meeting with Nabindar Singh.',
		'Exercise at 6:pm with Nicholas.',
		'Avengers Age of Ultron.',
		'Henna birthday at Mezbaan.'
	];
	addName(): boolean {
		this.nameList.push(this.newName);
		this.newName = '';
		return true;
	}
	ngOnInit() {
		var todoListWraper: any = $('.todo-list-wrap');
		todoListWraper.perfectScrollbar({});
	}
}
