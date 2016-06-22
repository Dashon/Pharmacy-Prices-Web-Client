import {Component,Input} from 'angular2/core';

@Component({
	selector: 'stats',
	templateUrl: './widgets/stats/components/stats.html'
})
export class StatsCmp {
	@Input() icon : string;
	@Input() value : string;
	@Input() text : string;
	@Input() bgclass : string;
	@Input() link : string;
	@Input() progressValue : string;
}
