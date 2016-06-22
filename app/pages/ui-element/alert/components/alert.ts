import {Component} from 'angular2/core';
import { Alert } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'alerts',
    templateUrl: './pages/ui-element/alert/components/alert.html',
    directives: [Alert]
})

export class AlertCmp {
	msg: string = null;
	growlMessage: string = null;

	alerts:Array<Object> = [
		{
			type: 'danger',
			msg: 'Oh snap! Change a few things up and try submitting again.'
		},
		{
			type: 'info',
			msg: 'Ok! Not bad, but you can do better.'
		},
		{
			type: 'success',
			msg: 'Well done! You successfully read this important alert message.',
			closable: true
		}
	];

	closeAlert(i: number): void {
		this.alerts.splice(i, 1);
	}

	addAlert() : void {
		this.alerts.push({ msg: this.msg, type: 'warning', closable: true });
		this.msg = '';
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
