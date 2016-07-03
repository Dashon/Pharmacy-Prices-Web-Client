import {Component} from '@angular/core';
import {
	GOOGLE_MAPS_DIRECTIVES,
	MouseEvent,
} from 'angular2-google-maps/core/index';

@Component({
	moduleId: module.id,
	selector: 'map-cmp',
	directives: [GOOGLE_MAPS_DIRECTIVES],
	templateUrl: './map.component.html',styles: [`
    .sebm-google-map-container {
       height: 100%;
       width: 100%;
     }
  `]
})

export class MapComponent {
	// google maps zoom level
	zoom: number = 13;

	// initial center position for the map
	lat: number = 41.8781;
	lng: number = -87.6298;

	markers: Marker[] = [
		{
			lat: 41.8481,
			lng: -87.6298,
			label: 'CVS',
			draggable: true
		},
		{
			lat: 41.8581,
			lng: -87.6298,
			label: 'WallGreens',
			draggable: true
		},
		{
			lat: 41.8681,
			lng: -87.6298,
			label: 'Cosco',
			draggable: true
		}
	];


	clickedMarker(label: string, index: number) {
		console.log(`clicked the marker: ${label || index}`);
	}



	markerDragEnd(m: Marker, $event: MouseEvent) {
		console.log('dragEnd', m, $event);
	}

}

// just an interface for type safety.
interface Marker {
	lat: number;
	lng: number;
	label?: string;
	draggable?: boolean;
}
