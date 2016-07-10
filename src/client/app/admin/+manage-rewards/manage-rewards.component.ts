import {Component} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'manage-rewards-cmp',
    templateUrl: './manage-rewards.component.html',
    directives: [DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class ManageRewardsComponent {
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
        authHeader.append('X-Api-Key', '3e7b2e2b-e619-4b66-be83-88eaefaea5df');

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

    removePharmacy(id:number) {

    }

    addPharmacy(id:number) {

    }

    creatNewPharmacy() {

    }

    setCurrentClinic(clinic) {
        this.currentClinic = clinic;
    }

    deleteReward(text) {
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

    getReward(text) {
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

    postReward(text) {
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

    putReward(text) {
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
