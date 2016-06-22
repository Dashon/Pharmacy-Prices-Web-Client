/// <reference path="../../../../../tools/manual_typings/progressButton.d.ts" />
import {Component} from 'angular2/core';

@Component({
    selector: 'buttons',
    templateUrl: './pages/ui-element/button/components/button.html'
})

export class ButtonCmp {
	ngOnInit() {
		[].slice.call( document.querySelectorAll( 'button.progress-button' ) ).forEach( function( bttn ) {
			var button = new ProgressButton( bttn, {
				callback : function( instance ) {
					var progress = 0,
					interval = setInterval( function() {
						progress = Math.min( progress + Math.random() * 0.1, 1 );
						instance._setProgress( progress );

						if( progress === 1 ) {
							instance._stop(1);
							clearInterval( interval );
						}
					}, 200 );
				}
			} );
			console.log(button);
			console.clear();
		} );
	}
}
