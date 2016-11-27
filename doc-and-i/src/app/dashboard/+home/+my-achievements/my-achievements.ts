import {Component, OnInit} from '@angular/core';
import {RouterModule, Router} from '@angular/router';


@Component({
    selector: "my-achievements",
    templateUrl: './my-achievements.html',
    styleUrls:['../home.component.css']
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
            //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            //this.totalTokens = (this.currentUser.total_points / 100000).toFixed(0);
        }
        if (localStorage.getItem('currentClinic')) {
            this.currentClinic = JSON.parse(localStorage.getItem('currentClinic'));
            console.log(this.currentClinic);
        }
    }
    constructor(private router:Router) {
       
    }

}
