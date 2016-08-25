import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from '../../config/http';

@Component({
    moduleId: module.id,
    selector: 'my-pharmacies-cmp',
    templateUrl: './my-pharmacies.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class MyPharmaciesComponent {
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    http = null;
    response = null;
    errorMessage = null;

    clinicPharmacies = [];
    allPharmacies = [];
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
    ngOnInit() {
        if (localStorage.getItem('currentClinic')) {
            this.currentClinic = JSON.parse(localStorage.getItem('currentClinic'));
        }
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
        return this.callApi(this.baseUrl + 'dni_pharmacies/prefix?query=' + text).map(res => res.json())
            .map((el)=> this.allPharmacies = el).toPromise();
    }

    getClinics() {
        return this.callApi(this.baseUrl + 'health_care_facilities?limit=100').map(res => res.json()).subscribe(
            (el)=> this.clinics = el,
            error => this.errorMessage = <any>error);
    }

    setCurrentClinic(clinic) {
        this.currentClinic = clinic;
    }

    addPharmacy(pharmacy) {
        this.postclinicPharmacy({'health_care_facility_id': this.currentClinic['id'], 'dni_pharmacy_id': pharmacy.id});
    }

    editClinicPharmacy(pharmacy) {
        this.editPharmacy = (JSON.parse(JSON.stringify(pharmacy)));
    }

    saveClinicPharmacy() {
        var editRequest = this.editPharmacy['dni_pharmacy'];
        editRequest['dni_pharmacy_id'] = editRequest['id'];
        return this.postEditRequest(editRequest).subscribe(
            () => this.editPharmacy = {},
            () => this.editPharmacy = {}
        );
    }

    getClinicPharmacies(page) {
        return this.callApi(this.baseUrl + 'hcf_pharmacies/list?health_care_facility_id=' +
                            this.currentClinic['id'] + '&page=' + page).map(res => {
            this.totalPages = res.headers.get('Total_pages');
            this.currentPage = res.headers.get('Current_page');
            return res.json();
        }).subscribe((el)=> this.clinicPharmacies = el);
    }

    getClinic(id) {
        return this.callApi(this.baseUrl + 'health_care_facilities/' + id).subscribe(
            clinic => {
                this.currentClinic = JSON.parse(clinic._body);
                localStorage.setItem('currentClinic', JSON.stringify(this.currentClinic));
                this.getClinicPharmacies(1);
            },
            error => this.errorMessage = <any>error);
    }

    postclinicPharmacy(body) {
        return this.postApi(this.baseUrl + 'hcf_pharmacies', body).map(res => res.json()).subscribe(()=> {
            this.getClinicPharmacies(this.currentPage);
        });
    }

    postEditRequest(body) {
        return this.postApi(this.baseUrl + 'pharmacy_edit_requests', body);
    }

    deleteClinicPharmacy(id) {
        return this.deleteApi(this.baseUrl + 'hcf_pharmacies/' + id).subscribe(()=> {
            this.getClinicPharmacies(this.currentPage);
        });
    }

    cancelEditClinicPharmacy() {
        this.editPharmacy = {};
    }


    prevPage() {
        this.getClinicPharmacies(this.currentPage - 1);
    }

    nextPage() {
        this.getClinicPharmacies(this.currentPage + 1);
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
