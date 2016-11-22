import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {AuthHttp} from '../../../config/http';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    templateUrl: './my-achievements.html',
    styleUrls:['../home.component.css'],
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DROPDOWN_DIRECTIVES]
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

}
