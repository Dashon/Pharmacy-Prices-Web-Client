import {Component} from 'angular2/core';

@Component({
    selector: 'progressbar',
    templateUrl: './pages/ui-element/progressbar/components/progressbar.html'
})

export class ProgressbarCmp {
	firstNum: number = 29;
	secondNum: number = 45;
	thirdNum: number = 98;
	forthNum: number = 10;
	fifthNum: number = 48;
	generateRand() : void {
		this.firstNum = Math.floor((Math.random() * 100));
		this.secondNum = Math.floor((Math.random() * 100));
		this.thirdNum = Math.floor((Math.random() * 100));
		this.forthNum = Math.floor((Math.random() * 100));
		this.fifthNum = Math.floor((Math.random() * 100));
	}
}
