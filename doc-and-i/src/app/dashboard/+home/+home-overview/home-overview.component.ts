import {Component, OnInit} from '@angular/core';
import {RouterModule, Router } from '@angular/router'

@Component({
   // moduleId: module.id,
    templateUrl: './home-overview.html',
    selector: "home-overview",
    styleUrls:['../home.component.css'],
    //directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DROPDOWN_DIRECTIVES]
})
export class HomeOverviewComponent implements OnInit {

    isActive = false;
    showMenu:string = '';
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    errorMessage :string="";
    http :any;
    userName = localStorage.getItem('name');
    currentUser = {};
    currentClinic = {};
    pointInDay:number;
    tokenInDay:number;
    currentUser:any;
    ngOnInit() {
        this.currentUser = localStorage.getItem('name');
        console.log(this.currentUser);
        if (this.currentUser) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            // this.pointInDay = this.currentUser.survey_day.expected_patients * 10;
            // this.tokenInDay = (this.currentUser.survey_day.expected_patients / 10000).toFixed(0);
        }
        if (localStorage.getItem('currentClinic')) {
            this.currentClinic = JSON.parse(localStorage.getItem('currentClinic'));

        }
    }

    constructor(private router:Router) {
       
    }
    goto340b(){
        this.router.navigate(['/', '340b']);
    }

}
