import { Component, OnInit } from '@angular/core';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	moduleId: module.id,
    selector: 'alert-cmp',
    templateUrl: './alert.component.html',
    directives: [AlertComponent]
})

export class AlrtComponent implements OnInit {
	msg: string = null;
	growlMessage: string = null;

	public alerts:Array<Object> = [
		{
			type: 'danger',
			msg: 'Oh snap! Change a few things up and try submitting again.'
		},
		{
			type: 'success',
			msg: 'Well done! You successfully read this important alert message.',
			closable: true
		}
	];

	public closeAlert(i:number):void {
		this.alerts.splice(i, 1);
	}

	public addAlert():void {
		this.alerts.push({ msg: this.msg, type: 'warning', closable: true });
		this.msg = null;
	}

	addGrowl() {
		(<any>$).growl({ title: 'Growl', message: this.growlMessage });
		this.growlMessage = '';
	}

	defaultGrowl() {
		(<any>$).growl({ title: 'Growl', message: 'The kitten is awake!' });
	}
	errorGrowl() {
		(<any>$).growl.error({ message: 'The kitten is attacking!' });
	}
	noticeGrowl() {
		(<any>$).growl.notice({ message: 'The kitten is cute!' });
	}
	warningGrowl() {
		(<any>$).growl.warning({ message: 'The kitten is ugly!' });
	}
	ngOnInit() {
		(<any>$).growl({ title: 'Growl', message: 'The kitten is awake!' });
	}
}
