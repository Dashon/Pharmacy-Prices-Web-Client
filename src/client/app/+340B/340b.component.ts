/**
 * Created by Dashon on 6/14/16.
 */

import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES, TAB_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
// import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {AuthHttp} from '../config/http';
import {GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core/directives-const';
import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core/index';

/**
 * This class represents the lazy loaded Three40BComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'three40b-cmp',
    templateUrl: '340b.component.html',
    directives: [DROPDOWN_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES, TYPEAHEAD_DIRECTIVES, TAB_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    providers: [GOOGLE_MAPS_PROVIDERS],
    styles: [`
    .sebm-google-map-container {
       height: 100%;
       width: 100%;
     }
  `]
})
export class Three40BComponent {

    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    http = null;
    response = null;
    errorMessage = null;
    currentTab = 'start';
    currentSurvey = {};
    allPharmacies = [];
    contractedPharmacies = [];
    currentClinic = {id: 1};
    editPharmacy = {};

    totalPages = 0;
    currentPage = 0;

    clinics = [];

    typeAheadDataRef = this.getAsyncData.bind(this);
    searchString:string = '';
    typeaheadLoading:boolean = false;
    typeaheadNoResults:boolean = false;


    contactInfo = null;
    selectedPharmacy = null;
    messageSent = false;
    questions = {
        q1: null,
        //yes
        q2: 0,
        q3: null,
        //no
        q4: null,
        q5: null,
        //agree?
        q6: null,
        //yes
        q7: 0,
        q8: null,
        q9: null,
        q10: null,
        //no
        q11: 0,
        text_consent:false
    };


    // google maps zoom level
    zoom:number = 13;

    // initial center position for the map
    currentLocation = {};
    longitude:number = -87.6298;
    latitude:number = 41.8781;
    newCords = {};
    showMap = false;
    currentUser = {};

    constructor(http:AuthHttp) {
        this.http = http;
        if (localStorage.getItem('user_id') && localStorage.getItem('user_id') != 'null') {
            this.getAccountInfo(localStorage.getItem('user_id'));
        }

        this.http = http;
        this.newSurvey();
        this.getClinic(localStorage.getItem('hcf_id'));
    }

    getAccountInfo(id) {
        return this.callApi(this.baseUrl + 'users/' + id).subscribe(
            user => this.currentUser = JSON.parse(user._body),
            error => this.errorMessage = <any>error);
    }


    setLocation(location) {
        this.currentLocation = location;

        this.latitude = this.currentLocation['latitude'];
        this.longitude = this.currentLocation['longitude'];
    }

    clickedMarker(label:string, index:number) {
        console.log(`clicked the marker: ${label || index}`);
    }

    updateCurrentGeo(event) {
        this.latitude = event.lat;
        this.longitude = event.lng;
    }

    zoomToPharmacy(pharmacy) {
        this.zoom = 22;
        this.latitude = pharmacy.latitude;
        this.longitude = pharmacy.longitude;
    }


    searchTypeAhead(text) {
        return this.callApi(this.baseUrl + 'contracted_pharmacies/prefix?health_care_facility_id='+
                            this.currentClinic['id']+'&query=' + text).map(res => res.json())
            .map((el) =>
                    this.contractedPharmacies = el
            ).toPromise();
    }

    checkLimit(event) {
        if ((event.keyCode === 8 || event.keyCode === 46 ) && this.searchString.length < 3) {
            this.getContractedPharmacies(1);
        }
    }

    chooseFromMap(contractedPharmacy) {
        if (contractedPharmacy) {
            this.questions.q7 = contractedPharmacy.id;
        }
        this.showMap = false;
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

    getClinic(id) {
        return this.callApi(this.baseUrl + 'health_care_facilities/' + id).subscribe(
            clinic => {
                this.currentClinic = JSON.parse(clinic._body);
                this.getClinicPharmacies(1);
                this.setLocation(this.currentClinic['hcf_locations'][0]);
                this.getContractedPharmacies(1);
            },
            error => this.errorMessage = <any>error);
    }

    getContractedPharmacies(page) {
        return this.callApi(this.baseUrl + 'contracted_pharmacies/list?health_care_facility_id=' +
                            this.currentClinic['id'] + '&page=' + page).map(res => {
            this.totalPages = res.headers.get('Total_pages');
            this.currentPage = res.headers.get('Current_page');
            return res.json();
        }).map((y) => {
            y.map(x => {
                x['draggable'] = false;
                x['icon_url'] = '../assets/images/doc_and_i_icon_sm.png';

                return x;
            });

            return y;
        }).subscribe((el)=> this.contractedPharmacies = el);
    }

    getClinicPharmacies(page) {
        return this.callApi(this.baseUrl + 'hcf_pharmacies/list?health_care_facility_id=' +
                            this.currentClinic['id'] + '&limit=' + 100).map(res => {
            this.totalPages = res.headers.get('Total_pages');
            this.currentPage = res.headers.get('Current_page');
            return res.json();
        }).subscribe((el)=> this.allPharmacies = el);
    }


    answerQuestion(question, answer) {
        if (question == 1) {
            this.questions.q1 = answer;
        }
        if (question == 6) {
            this.questions.q6 = answer;
        }
        this.currentTab = answer;
    }

    postEditRequest(body) {
        return this.postApi(this.baseUrl + 'pharmacy_edit_requests', body);
    }

    newSurvey() {
        this.currentSurvey = {};
        this.resetQuestions();
        this.currentTab = 'start';
        this.messageSent = false;
        this.selectedPharmacy = null;
       this.setLocation(this.currentLocation);
    }

    submitSurvey() {
        if (this.questions.q7) {
            this.selectedPharmacy = this.contractedPharmacies.filter(x=>x.id == this.questions.q7)[0];
        }


        var answers = [];
        for (var key in this.questions) {
            var questionID = key.replace('q', '');
            var answer = this.questions[key];
            if (answer) {
                answers.push({question_id: questionID, user_answer: answer});
            }
        }
        var newSurvey = {answers: answers};
        return this.postApi(this.baseUrl + 'surveys', newSurvey).subscribe(()=> {
            this.currentTab = 'submitted';

            $('.profile-box').addClass('add-points');

            setTimeout(() => {
                $('.profile-box').removeClass('add-points');
                if (!this.questions.q7 && this.currentTab == 'submitted') {
                    this.newSurvey();
                }
            }, 3000);
            this.getAccountInfo(this.currentUser['id']);
        });
    }

    sendText() {
        if (this.contactInfo) {
            var msg = {contact_info: this.contactInfo, contrated_pharamcy_id: this.selectedPharmacy['id']};
            return this.postApi(this.baseUrl + 'surveys/text_patient', msg).subscribe(()=> {
                this.contactInfo = null;
                this.messageSent = true;
                setTimeout(() => {
                    if (this.currentTab == 'submitted') {
                        this.newSurvey();
                    }
                }, 3000);
            });
        }
    }

    sendEmail() {
        if (this.contactInfo) {
            var msg = {contact_info: this.contactInfo, contrated_pharamcy_id: this.selectedPharmacy['id']};
            return this.postApi(this.baseUrl + 'surveys/email_patient', msg).subscribe(()=> {
                this.contactInfo = null;
                this.messageSent = true;
                setTimeout(() => {
                    if (this.currentTab == 'submitted') {
                        this.newSurvey();
                    }
                }, 3000);
            });
        }
    }

    resetQuestions() {
        this.questions = {
            q1: null,
            //yes
            q2: 0,
            q3: null,
            //no
            q4: null,
            q5: null,
            //agree?
            q6: null,
            //yes
            q7: 0,
            q8: null,
            q9: null,
            q10: null,
            //no
            q11: 0,
            text_consent:false
        };
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
