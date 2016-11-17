import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import {AuthHttp} from '../../config/http';
import {ModalDirective, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {DashBoardMenuLeftComponent} from '../+menu-left/menu-left';

@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: './home.component.html',
    viewProviders: [BS_VIEW_PROVIDERS],
    //directives: [],
    styleUrls:['../+home/home.component.css'],
    directives: [ModalDirective, DROPDOWN_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES, DashBoardMenuLeftComponent]
})

export class HomeComponent implements OnInit {
    userName = localStorage.getItem('name');
    patients:any;
    tokens:any;
    active1:string;
    active2:string;
    active3:string;
    content1Current:string;
    content2Current:string;
    content3Current:string;
    currentUser = {};
    currentClinic = {};
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    errorMessage = null;
    currentMonth = '--';

    constructor(private http:AuthHttp) {

        this.getAccountInfo(localStorage.getItem('user_id'));
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        var today = new Date();
        this.currentMonth = monthNames[today.getMonth()];
    }

    ngOnInit() {
        this.active1="active";
        this.content1Current = "current";
        if (localStorage.getItem('currentUser')) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            console.log(this.currentUser);
            this.patients = (this.currentUser.total_points / 10).toFixed(0);
            this.tokens = (this.currentUser.total_points/1000).toFixed(0);
        }  
        if (localStorage.getItem('currentClinic')) {
            this.currentClinic = JSON.parse(localStorage.getItem('currentClinic'));
        }
    }

    getAccountInfo(id) {
        return this.callApi(this.baseUrl + 'users/' + id).subscribe(
            user => {
                this.currentUser = user.json();
                this.getClinic(this.currentUser.health_care_facility_id);
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            },
            error => this.errorMessage = <any>error);
    }
    openModel(){

    }
    content1(){
        this.content1Current = "current";
        this.content2Current="";
        this.content3Current="";
        this.active1="active";
        this.active2="";
        this.active3="";
    }
    content2(){
        this.content2Current = "current";
        this.content1Current="";
        this.content3Current="";
        this.active1="";
        this.active2="active";
        this.active3="";
    }
    content3(){
        this.content3Current = "current";
        this.content2Current="";
        this.content1Current="";
        this.active1="";
        this.active2="";
        this.active3="active";
    }
    getClinic(id) {
        return this.callApi(this.baseUrl + 'health_care_facilities/' + id).subscribe(
            clinic => {
                this.currentClinic = JSON.parse(clinic._body);
                localStorage.setItem('currentClinic', JSON.stringify(this.currentClinic));
            },
            error => this.errorMessage = <any>error);
    }


    chooseAvatar(imgURL) {
        this.currentUser['image_url'] = imgURL;
        var payload = {image_url: imgURL};
        return this.putApi(this.baseUrl + '/users/' + this.currentUser['id'], payload).subscribe(
            user => this.currentUser = user.json(),
            error => this.errorMessage = <any>error);
    }

    putApi(url, body) {
        this.errorMessage = '';
        var bodyJSON = JSON.stringify(body);
        return this.http.put(url, bodyJSON);
    }


    callApi(url) {
        this.errorMessage = '';
        return this.http.get(url);
    }

}
