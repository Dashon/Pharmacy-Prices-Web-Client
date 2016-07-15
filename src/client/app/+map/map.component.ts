import {Component} from '@angular/core';
import {
	MapsAPILoader,
	NoOpMapsAPILoader,
	MouseEvent,
	GOOGLE_MAPS_DIRECTIVES,
	GOOGLE_MAPS_PROVIDERS,
	GoogleMapsAPIWrapper, MarkerManager
} from 'angular2-google-maps/core/index';
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Component({
	moduleId: module.id,
	selector: 'map-cmp',
	providers: [GOOGLE_MAPS_PROVIDERS],
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
	latitude: number = 41.8781;
	longitude: number = -87.6298;

	contractedPharmacies = [
		{
			latitude: 41.8481,
			longitude: -87.6298,
			name: 'CVS',
			draggable: true
		},
		{
			latitude: 41.8581,
			longitude: -87.6298,
			name: 'WallGreens',
			draggable: true
		},
		{
			latitude: 41.8681,
			longitude: -87.6298,
			name: 'Cosco',
			draggable: true
		}
	];


	clickedMarker(label: string, index: number) {
		console.log(`clicked the marker: ${label || index}`);
	}

	updateCurrentGeo(event){
		this.latitude = event.lat;
		this.longitude = event.lng;
	}


	markerDragEnd(m: Marker, $event: MouseEvent) {
		console.log('dragEnd', m, $event);
	}
	baseUrl = 'http://localhost:3000/api/v1/';
	http = null;
	response = null;
	errorMessage = null;

	clinicPharmacies = [];
	//contractedPharmacies = [];
	currentClinic = {id:1};
	editPharmacy = {};

	totalPages = 0;
	currentPage = 0;

	clinics = [];

	typeAheadDataRef = this.getAsyncData.bind(this);
	searchString:string = '';
	typeaheadLoading:boolean = false;
	typeaheadNoResults:boolean = false;


	constructor(http:AuthHttp, private _mapWrapper:GoogleMapsAPIWrapper) {
		this.http = http;
		this.getClinics();
		this.getClinic(this.currentClinic);
		//this.getContractedPharmacies(1);
	//	this.getPharmacies(1);

		this._mapWrapper.getNativeMap().then((m) => {
			var options = { minZoom: 14, maxZoom: 15, draggable: false,
				styles:[
					{
						stylers: [
							{ saturation: -100 }
						]
					},{
						featureType: "road",
						elementType: "geometry",
						stylers: [
							{ lightness: 100 },
							{ visibility: "simplified" }
						]
					},{
						featureType: "road",
						elementType: "labels",
						stylers: [
							{ visibility: "off" }
						]
					},{
						featureType: "poi",
						elementType: "labels",
						stylers: [
							{ visibility: "off" }
						]
					}
				]
			};
			m.setOptions(options);
		});
	}


	changeTypeaheadLoading(e:boolean) {
		this.typeaheadLoading = e;
	}

	changeTypeaheadNoResults(e:boolean) {
		this.typeaheadNoResults = e;
	}

	getAsyncData(context:any):Function {
		return this.searchTypeAhead(this.searchString);
	}

	searchTypeAhead(text) {
		return this.callApi(this.baseUrl + 'hcf_pharmacies/prefix?query=' + text).map(res => res.json())
			.map((hcf_pharmacies)=> this.clinicPharmacies = hcf_pharmacies.map((hcf_pharmacy)=> {
				var dni_pharmacy = hcf_pharmacy['dni_pharmacy'];
				dni_pharmacy.hcf_pharmacy_id = hcf_pharmacy.id;
				return dni_pharmacy;
			})).toPromise();
	}

	getClinic(clinic) {
		return this.callApi(this.baseUrl + 'health_care_facilities/' + clinic['id']).subscribe(
			clinic => {
				this.currentClinic = JSON.parse(clinic._body);
				this.getContractedPharmacies(1);
			},
			error => this.errorMessage = <any>error);
	}

	setCurrentClinic(clinic) {
		this.currentClinic = clinic;
	}

	addPharmacy(pharmacy) {
		this.postContractedPharmacy({"health_care_facility_id": this.currentClinic['id'], "hcf_pharmacy_id": pharmacy.hcf_pharmacy_id});
	}

	editClinicPharmacy(pharmacy) {
		this.editPharmacy = (JSON.parse(JSON.stringify(pharmacy)))

	}
	
	mapClicked(event){
	}
	zoomToPharmacy(pharmacy){
		console.log();


		this.zoom = 22;
		this.latitude = pharmacy.latitude;
		this.longitude = pharmacy.longitude;
	}
	saveClinicPharmacy(body) {
		return this.putContractedPharmacy(body).subscribe(
			() => this.editPharmacy = {},
			() => this.editPharmacy = {}
		);
	}
	getPharmacies(page) {
		return this.callApi(this.baseUrl + 'health_care_facilities/'+this.currentClinic['id']+'/pharmacies?page=' + page).map(res => {
			this.totalPages = res.headers.get('Total_pages');
			this.currentPage = res.headers.get('Current_page');
			return res.json()
		}).subscribe((el)=> {this.contractedPharmacies.concat(el);
		});
	}
	getContractedPharmacies(page) {
		return this.callApi(this.baseUrl + 'health_care_facilities/'+this.currentClinic['id']+'/contracted?page=' + page).map(res => {
			this.totalPages = res.headers.get('Total_pages');
			this.currentPage = res.headers.get('Current_page');
			return res.json()
		}).subscribe((el)=> this.contractedPharmacies = el);
	}

	getClinics() {
		return this.callApi(this.baseUrl + 'health_care_facilities?limit=100').map(res => res.json()).subscribe(
			(el)=> this.clinics = el,
			error => this.errorMessage = <any>error);
	}

	postContractedPharmacy(body) {
		return this.postApi(this.baseUrl + 'contracted_pharmacies', body).map(res => res.json()).subscribe(()=> {
			this.getContractedPharmacies(this.currentPage);
		});
	}

	putContractedPharmacy(body) {
		return this.putApi(this.baseUrl + 'contracted_pharmacies', body).map(res => res.json()).subscribe(()=> {
			this.getContractedPharmacies(this.currentPage);
		});
	}
	deleteContractedPharmacy(id) {
		return this.deleteApi(this.baseUrl + 'contracted_pharmacies/' + id).subscribe(()=> {
			this.getContractedPharmacies(this.currentPage);
		});
	}

	cancelEditClinicPharmacy() {
		this.editPharmacy = {};
	}

	prevPage() {
		this.getContractedPharmacies(this.currentPage - 1);
	}

	nextPage() {
		this.getContractedPharmacies(this.currentPage + 1);
	}


	callApi(url) {
		this.errorMessage = '';
		return this.http.get(url);
	}

	postApi(url, body) {
		this.errorMessage = '';
		var bodyJSON = JSON.stringify(body);
		return this.http.post(url, bodyJSON);
	}

	putApi(url, body) {
		this.errorMessage = '';
		var bodyJSON = JSON.stringify(body);
		return this.http.put(url, bodyJSON);
	}


	deleteApi(url) {
		this.errorMessage = '';
		return this.http.delete(url);
	}



}

// just an interface for type safety.
interface Marker {
	lat: number;
	lng: number;
	label?: string;
	draggable?: boolean;
}
