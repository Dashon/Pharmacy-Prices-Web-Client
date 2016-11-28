import {Component, OnInit} from '@angular/core';
import {RouterModule, Router } from '@angular/router'
import {Http, Headers, RequestOptions} from '@angular/http';
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
    options:Object;
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

    constructor(http:Http,private router:Router) {
        this.http = http;
        this.getUser(localStorage.getItem('user_id'));
        this.options = {
            title : {  text: '####',
                style:{"color": "#5D5D5D", "fontSize": "24px","fontFamily": "Open Sans","fontWeight":"600"}
            },
            chart: {  type: 'area',
                margin: [0, -40, 0, -40],
                spacingTop: 30,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0 },
            subtitle: {
                text: 'Patients Captured<br />Since January 1, 2016',
                style:{"color": "#5D5D5D", "fontSize": "14px","fontFamily": "Open Sans","fontWeight":"600"}
            },
            xAxis: {
                tickWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth:0,
                lineColor: 'transparent',
                labels:
                {
                    enabled: false

                },
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

            },
            tooltip: {
                enabled: true
            },
            yAxis: {

                gridLineWidth: 0,
                labels:
                {
                    enabled: false

                },
                plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#808080'
                }],
                title: {
                    text: ''
                }

            },
            plotOptions: {

                series: {
                    fillColor: '#8CC63F',
                    pointPadding: 0,
                    groupPadding: 0,
                    showInLegend: false
                },
                area: {
                    pointStart: 0,
                    size:'100%',
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Num patients',
                color: '#8CC63F',
                data: [111,102,146, 123, 145, 154,165,123, 143, 123, 234, 345]
            }]
        };
    }
    getUser(id){
        this.callApi(this.baseUrl+'users/'+id).subscribe(
            user => {
                this.currentUser = JSON.parse(user._body);
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            },
            error => this.errorMessage = <any>error);
    }
    goto340b(){
        this.router.navigate(['/', '340b']);
    }
    callApi(url) {
        var authHeader = new Headers();
        authHeader.append('X-Api-Key', '324212a0-db7b-468e-aaeb-e4b6502e829e');
        authHeader.append('Content-Type', 'application/json');

        var options = new RequestOptions({headers: authHeader});
        this.errorMessage = '';
        return this.http.get(url,options);
    }

}
