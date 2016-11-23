import {Component, ViewChild, OnInit} from '@angular/core';
import {RouterModule, Router} from '@angular/router';
import {} from '@angular/common';
import {AuthHttp} from '../../../config/http';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    moduleId: module.id,
    templateUrl: './my-achievements.html',
    styleUrls:['../home.component.css'],
   // directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DROPDOWN_DIRECTIVES]
})

export class MyAchievementsComponent implements OnInit{

isActive = false;
    showMenu:string = '';
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    errorMessage :string="";
    http :any;
    userName = localStorage.getItem('name');
    currentUser = {};
    currentClinic = {};
    totalTokens:number;

    @ViewChild('modal')
    modal: ModalComponent;


    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.totalTokens = (this.currentUser.total_points / 100000).toFixed(0);
        }
        if (localStorage.getItem('currentClinic')) {
            this.currentClinic = JSON.parse(localStorage.getItem('currentClinic'));
            console.log(this.currentClinic);
        }
    }

    constructor(private router:Router) {
       
    }
    open() {
        this.modal.open();
    }
}
