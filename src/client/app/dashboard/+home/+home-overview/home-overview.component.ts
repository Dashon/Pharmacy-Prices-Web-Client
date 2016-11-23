import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {AuthHttp} from '../../../config/http';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { ChartModule } from 'angular2-highcharts';
@Component({
    moduleId: module.id,
    templateUrl: './home-overview.html',
    selector: "home-overview",
    styleUrls:['../home.component.css'],
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DROPDOWN_DIRECTIVES]
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

    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.pointInDay = this.currentUser.survey_day.expected_patients * 10;
            this.tokenInDay = (this.currentUser.survey_day.expected_patients / 10000).toFixed(0);
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
