import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {AuthHttp} from '../../../config/http';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    templateUrl: './my-achievements.html',
    //styleUrls:['../home.component.css'],
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DROPDOWN_DIRECTIVES]
})

export class MyAchievementsComponent {

isActive = false;
    showMenu:string = '';

    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    errorMessage :string="";
    http :any;
    userName = localStorage.getItem('name');
    currentUser = {};


    constructor(private router:Router) {
       
    }

}
