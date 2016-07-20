import {Component} from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from "../../config/http";

@Component({
    moduleId: module.id,
    selector: 'manage-pharmacies-cmp',
    templateUrl: './manage-pharmacies.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES,FORM_DIRECTIVES]

})
export class ManagePharmaciesComponent {
    baseUrl = 'http://localhost:3000/api/v1/';
    http = null;
    response = null;
    errorMessage = null;

    editPharmacyItem = {};
    pharmacies = [];
    totalPages = 0;
    currentPage = 0;

    typeAheadDataRef = this.getAsyncData.bind(this);
    searchString:string = '';
    typeaheadLoading:boolean = false;
    typeaheadNoResults:boolean = false;


    constructor(http:AuthHttp) {
        this.http = http;
        this.getPharmacys(1);
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
                this.pharmacies = hcf_pharmacies.map((hcf_pharmacy)=> {
                var dni_pharmacy = hcf_pharmacy['dni_pharmacy'];
                dni_pharmacy.hcf_pharmacy_id = hcf_pharmacy.id;
                return dni_pharmacy;
            });
            return "";
            }).toPromise();
    }

    checkLimit(event){
        if( (event.keyCode == 8 || event.keyCode == 46 ) && this.searchString.length < 3){
            this.getPharmacys(1);
        }
    }

    createPharmacy() {
        this.postApi(this.baseUrl + 'dni_pharmacies/', this.editPharmacyItem).subscribe(
            () => this.getPharmacys(this.totalPages),
            error => this.errorMessage = <any>error);
        this.editPharmacyItem = {};
    }

    editPharmacy(pharmacy) {
        this.editPharmacyItem = (JSON.parse(JSON.stringify(pharmacy)))
    }

    getPharmacys(page) {
        this.callApi(this.baseUrl + 'dni_pharmacies?page=' + page).map(res => {
            this.totalPages = res.headers.get('Total_pages');
            this.currentPage = res.headers.get('Current_page');
            return res.json()
        }).subscribe((el)=> this.pharmacies = el);
    }

    savePharmacy() {
        this.putApi(this.baseUrl + 'dni_pharmacies/'+this.editPharmacyItem['id'], this.editPharmacyItem).map(res => res.json()).subscribe(()=> {
            this.getPharmacys(this.currentPage);
        });
        this.editPharmacyItem = {};

    }

    deletePharmacy(id) {
        return this.deleteApi(this.baseUrl + 'dni_pharmacies/' + id).subscribe(()=> {
            this.getPharmacys(this.currentPage);
        });
    }

    cancelEditPharmacy() {
        this.editPharmacyItem = {};
    }


    newPharmacy() {
        this.editPharmacyItem = {id: 'NEW'};
    }

    prevPage() {
        this.getPharmacys(this.currentPage - 1);
    }

    nextPage() {
        this.getPharmacys(this.currentPage + 1);
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
