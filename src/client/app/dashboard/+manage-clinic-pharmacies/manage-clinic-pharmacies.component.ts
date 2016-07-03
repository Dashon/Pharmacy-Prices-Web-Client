import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'manage-clinic-pharmacies-cmp',
    templateUrl: './manage-clinic-pharmacies.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES,FORM_DIRECTIVES]

})
export class ManageClinicPharmaciesComponent {
    clinicPharmacies = [];
    contractedPharmacies = [];
    currentClinic:{};

    allClinics = [{name:'Asian Human Services', address:'123 Main St' }];
    currentClinic = this.allClinics[0];

    http = null;
    response = null;

    typeaheadLoading:boolean = false;
    typeaheadNoResults:boolean = false;
    public searchString:string = '';


    constructor(http:Http) {
        this.http = http;
    }
    callApi(url) {
        var authHeader = new Headers();
        authHeader.append('X-Api-Key', '9a04cee7-09d3-4372-8f56-1713ac445fff');

        var options = new RequestOptions({headers: authHeader});
        return this.http.get(url, options);
    }

    getCurrentContext() {
        return this;
    }


    changeTypeaheadLoading(e:boolean) {
        this.typeaheadLoading = e;
    }

    changeTypeaheadNoResults(e:boolean) {
        this.typeaheadNoResults = e;
    }

    typeaheadOnSelect(e:any) {

    }

    private getRemainingPharmacies() {

    }

    removePharmacy(id:number){

    }

    addPharmacy(id:number){

    }


    postPharmacy(text) {
        return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix=' + text).map(res => res.json())
            .map((el)=> {
                var uniqueItems = {};

                this.clinicPharmacies = el.filter((data)=> {
                    if (!uniqueItems[data.name]) {
                        uniqueItems[data.name] = data;
                        data.children = [];
                        data.children.push(data);
                        return data;
                    } else {
                        uniqueItems[data.name].children.push(data);
                        return false;
                    }
                });
                return this.clinicPharmacies;
            }).toPromise();
    }
    setCurrentClinic(clinic){
        this.currentClinic = clinic;
    }

    getPharmacies(text) {
        return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix=' + text).map(res => res.json())
            .map((el)=> {
                var uniqueItems = {};

                this.clinicPharmacies = el.filter((data)=> {
                    if (!uniqueItems[data.name]) {
                        uniqueItems[data.name] = data;
                        data.children = [];
                        data.children.push(data);
                        return data;
                    } else {
                        uniqueItems[data.name].children.push(data);
                        return false;
                    }
                });
                return this.clinicPharmacies;
            }).toPromise();
    }

    getClinicPharmacies(text) {
        return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix=' + text).map(res => res.json())
            .map((el)=> {
                var uniqueItems = {};

                this.contractedPharmacies = el.filter((data)=> {
                    if (!uniqueItems[data.name]) {
                        uniqueItems[data.name] = data;
                        data.children = [];
                        data.children.push(data);
                        return data;
                    } else {
                        uniqueItems[data.name].children.push(data);
                        return false;
                    }
                });
                return this.contractedPharmacies;
            }).toPromise();
    }

    postclinicPharmacy(text) {
        return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix=' + text).map(res => res.json())
            .map((el)=> {
                var uniqueItems = {};

                this.contractedPharmacies = el.filter((data)=> {
                    if (!uniqueItems[data.name]) {
                        uniqueItems[data.name] = data;
                        data.children = [];
                        data.children.push(data);
                        return data;
                    } else {
                        uniqueItems[data.name].children.push(data);
                        return false;
                    }
                });
                return this.contractedPharmacies;
            }).toPromise();
    }
    deleteClinicPharmacy(text) {
        return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix=' + text).map(res => res.json())
            .map((el)=> {
                var uniqueItems = {};

                this.contractedPharmacies = el.filter((data)=> {
                    if (!uniqueItems[data.name]) {
                        uniqueItems[data.name] = data;
                        data.children = [];
                        data.children.push(data);
                        return data;
                    } else {
                        uniqueItems[data.name].children.push(data);
                        return false;
                    }
                });
                return this.contractedPharmacies;
            }).toPromise();
    }
}
