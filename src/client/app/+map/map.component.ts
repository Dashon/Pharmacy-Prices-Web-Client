import {Component} from '@angular/core';
import {
    MapsAPILoader,
    NoOpMapsAPILoader,
    MouseEvent,
    GOOGLE_MAPS_DIRECTIVES,
    GOOGLE_MAPS_PROVIDERS,
    GoogleMapsAPIWrapper, MarkerManager
} from 'angular2-google-maps/core/index';
import {AuthHttp} from "../config/http";
import {TYPEAHEAD_DIRECTIVES, DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'map-cmp',
    providers: [GOOGLE_MAPS_PROVIDERS],
    directives: [GOOGLE_MAPS_DIRECTIVES, TYPEAHEAD_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
    templateUrl: './map.component.html', styles: [`
    .sebm-google-map-container {
       height: 100%;
       width: 100%;
     }
  `]
})

export class MapComponent {
    // google maps zoom level
    zoom:number = 13;

    // initial center position for the map
    latitude:number = 41.8781;
    longitude:number = -87.6298;

    clickedMarker(label:string, index:number) {
        console.log(`clicked the marker: ${label || index}`);
    }

    updateCurrentGeo(event) {
        this.latitude = event.lat;
        this.longitude = event.lng;
    }


    markerDragEnd(m:Marker, $event:MouseEvent) {
        this.newCords = $event.coords;
        console.log('dragEnd', m, $event);
    }

    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    http = null;
    response = null;
    errorMessage = null;

    clinicPharmacies = [];
    currentLocation = {};
    newCords = {};
    contractedPharmacies = [];
    currentClinic = {};
    editPharmacy = {};

    totalPages = 0;
    currentPage = 0;

    clinics = [];
    typeAheadDataRef = this.getAsyncData.bind(this);
    searchString:string = '';
    typeaheadLoading:boolean = false;
    typeaheadNoResults:boolean = false;


    constructor(http:AuthHttp) {
        this.http = http;
        this.getClinics();
        this.getClinic(localStorage.getItem('hcf_id'));
    }

    setLocation(location) {
        this.currentLocation = location;

        this.latitude = this.currentLocation['latitude'];
        this.longitude = this.currentLocation['longitude'];
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
            .map((hcf_pharmacies)=> {
                this.contractedPharmacies = hcf_pharmacies.map((hcf_pharmacy)=> {
                    var dni_pharmacy = hcf_pharmacy['dni_pharmacy'];
                    dni_pharmacy.hcf_pharmacy_id = hcf_pharmacy.id;
                    return dni_pharmacy;
                });
                return "";
            }).toPromise();
    }

    checkLimit(event) {
        if ((event.keyCode == 8 || event.keyCode == 46 ) && this.searchString.length < 3) {
            this.getPharmacies(1);
        }
    }

    getClinic(id) {
        return this.callApi(this.baseUrl + 'health_care_facilities/' + id).subscribe(
            clinic => {
                this.currentClinic = JSON.parse(clinic._body);
                this.setLocation(this.currentClinic['hcf_locations'][0])
                this.getPharmacies(1);
            },
            error => this.errorMessage = <any>error);
    }

    setCurrentClinic(clinic) {
        this.currentClinic = clinic;
    }


    mapClicked(event) {
    }

    zoomToPharmacy(pharmacy) {
        this.zoom = 22;
        this.latitude = pharmacy.latitude;
        this.longitude = pharmacy.longitude;
    }

    updateCords(pharmacy) {
        pharmacy.longitude = this.newCords['lng'];
        pharmacy.latitude = this.newCords['lat'];
        this.putApi(this.baseUrl + 'dni_pharmacies/' + pharmacy['id'], pharmacy).map(res => res.json()).subscribe(()=> {
            this.getPharmacies(this.currentPage);
        });
    }


    getPharmacies(page) {
        return this.callApi(this.baseUrl + 'health_care_facilities/' + this.currentClinic['id'] + '/map?page=' + page).map(res => {
            this.totalPages = res.headers.get('Total_pages');
            this.currentPage = res.headers.get('Current_page');
            return res.json()
        }).map((y) => {
            y.map(x => {
                x['draggable'] = false;
                if (x['contracted']) {
                    x['icon_url'] = '../assets/images/doc_and_i_icon_sm.png';
                }

                return x;
            });

            return y;
        }).subscribe((el)=> this.contractedPharmacies = el);
    }

    getClinics() {
        return this.callApi(this.baseUrl + 'health_care_facilities?limit=100').map(res => res.json()).subscribe(
            (el)=> this.clinics = el,
            error => this.errorMessage = <any>error);
    }


    prevPage() {
        this.getPharmacies(this.currentPage - 1);
    }

    nextPage() {
        this.getPharmacies(this.currentPage + 1);
    }


    callApi(url) {
        this.errorMessage = '';
        return this.http.get(url);
    }

    putApi(url, body) {
        this.errorMessage = '';
        var bodyJSON = JSON.stringify(body);
        return this.http.put(url, bodyJSON);
    }


}

// just an interface for type safety.
interface Marker {
    lat:number;
    lng:number;
    label?:string;
    draggable?:boolean;
}
