import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'manage-pharmacies-cmp',
    templateUrl: './manage-pharmacies.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES,FORM_DIRECTIVES]

})
export class ManagePharmaciesComponent {
    clinicPharmacies = [];
    contractedPharmacies = [];
    currentClinic:{};

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

    creatNewPharmacy(){

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

    postPharmacy(text) {
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

    putPharmacy(text) {
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

    deletePharmacy(text) {
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
