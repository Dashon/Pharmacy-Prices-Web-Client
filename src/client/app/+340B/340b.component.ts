/**
 * Created by Dashon on 6/14/16.
 */

import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES, TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
// import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {AuthHttp} from "../config/http";

/**
 * This class represents the lazy loaded Three40BComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'three40b-cmp',
  templateUrl: '340b.component.html',
    directives: [DROPDOWN_DIRECTIVES, TAB_DIRECTIVES, ROUTER_DIRECTIVES,FORM_DIRECTIVES]
})
export class Three40BComponent {

  baseUrl = 'http://localhost:3000/api/v1/';
  http = null;
  response = null;
  errorMessage = null;
  currentTab = "start"
  currentSurvey = {};
  allPharmacies = [];
  contractedPharmacies=[];
  currentClinic = {id: 1};
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
    this.newSurvey();
    this.getClinic(localStorage.getItem('hcf_id'));
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

  getClinic(id) {
    return this.callApi(this.baseUrl + 'health_care_facilities/' + id).subscribe(
        clinic => {
          this.currentClinic = JSON.parse(clinic._body);
          this.getClinicPharmacies(1);
          this.getContractedPharmacies(1);
        },
        error => this.errorMessage = <any>error);
  }

  goToMap(){

  }
  goToSavings(){

  }
  getContractedPharmacies(page) {
    return this.callApi(this.baseUrl + 'contracted_pharmacies/list?health_care_facility_id='+this.currentClinic['id']+'&page=' + page).map(res => {
      this.totalPages = res.headers.get('Total_pages');
      this.currentPage = res.headers.get('Current_page');
      return res.json()
    }).subscribe((el)=> this.contractedPharmacies = el);
  }

  getClinicPharmacies(page) {
    return this.callApi(this.baseUrl + 'hcf_pharmacies/list?health_care_facility_id=' + this.currentClinic['id'] + '&limit=' + 100).map(res => {
      this.totalPages = res.headers.get('Total_pages');
      this.currentPage = res.headers.get('Current_page');
      return res.json()
    }).subscribe((el)=> this.allPharmacies = el);
  }


  answerQuestion(question, answer) {
    if (question == 1){
    }
    if(question == 3){
    }
    this.currentTab = answer;

    // return this.postApi(this.baseUrl + 'hcf_pharmacies', body).map(res => res.json()).subscribe(()=> {
    //
    // });
  }

  postEditRequest(body) {
    return this.postApi(this.baseUrl + 'pharmacy_edit_requests', body);
  }

  newSurvey() {
    this.currentSurvey = {};
    this.currentTab = 'start';
  }

  submitSurvey(body) {
    this.currentTab = 'submitted';
    // return this.postApi(this.baseUrl + 'pharmacy_edit_requests', body);
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
