import {Component, OnInit} from '@angular/core';
import {RouterModule, Router} from '@angular/router';

@Component({
    templateUrl: './my-achievements.html',
    selector: "my-achievements",
    styleUrls: ['../home.component.css']
})

export class MyAchievementsComponent implements OnInit {
    options: Object;
    isActive = false;
    showMenu:string = '';
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    errorMessage:string = "";
    http:any;
    userName = localStorage.getItem('name');
    currentUser = {};
    currentClinic = {};
    totalTokens:number;

    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            //this.totalTokens = (this.currentUser.total_points / 100000).toFixed(0);
        }
        if (localStorage.getItem('currentClinic')) {
            this.currentClinic = JSON.parse(localStorage.getItem('currentClinic'));
            console.log(this.currentClinic);
        }
    }

    constructor(private router:Router) {
        this.options = {
            title : {  text: '####',
                style:{"color": "#5D5D5D", "fontSize": "24px","fontFamily": "Open Sans","fontWeight":"600"}
            },
            chart: {  type: 'area',
                margin: [90, -40, 0, -40],
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


}
