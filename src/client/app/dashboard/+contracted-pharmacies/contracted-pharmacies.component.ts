import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from "angular2-jwt";

@Component({
    moduleId: module.id,
    selector: 'contracted-pharmacies-cmp',
    templateUrl: './contracted-pharmacies.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class ContractedPharmaciesComponent {
    baseUrl = 'http://localhost:3000/api/v1/';
    http = null;
    response = null;
    errorMessage = null;

    clinicPharmacies = [];
    contractedPharmacies = [];
    currentClinic = {id:1};
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
        this.getClinic(this.currentClinic);
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

    saveClinicPharmacy(body) {
        return this.putContractedPharmacy(body).subscribe(
            () => this.editPharmacy = {},
            () => this.editPharmacy = {}
        );
    }

    getContractedPharmacies(page) {
        return this.callApi(this.baseUrl + 'contracted_pharmacies/list?health_care_facility_id='+this.currentClinic['id']+'&page=' + page).map(res => {
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
