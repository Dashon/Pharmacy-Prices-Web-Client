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
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
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
        return this.callApi(this.baseUrl + 'dni_pharmacies/prefix?query=' + text).map(res => res.json())
            .map((dni_pharmacies)=> {
                this.pharmacies = dni_pharmacies.map((dni_pharmacy)=> {
                    for (var i = 0; i < dni_pharmacy.benefits.length; i++) {
                       var benefit = dni_pharmacy['benefits'][i];
                        if (benefit['name'] == "24 Hour"){
                            dni_pharmacy["t4Hr"] = true;
                        }
                        if (benefit['name'] == "Drive-Thru"){
                            dni_pharmacy["dthru"] = true;
                        }
                    }
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
        }).map(res => res.map((dni_pharmacy)=>{
            for (var i = 0; i < dni_pharmacy.benefits.length; i++) {
                var benefit = dni_pharmacy['benefits'][i];
                if (benefit['name'] == "24 Hour"){
                    dni_pharmacy["t4Hr"] = true;
                }
                if (benefit['name'] == "Drive-Thru"){
                    dni_pharmacy["dthru"] = true;
                }
            }
            return dni_pharmacy;
        })).subscribe((el)=> this.pharmacies = el);
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
