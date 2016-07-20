/// <reference path="../../../../../tools/manual_typings/project/c3.d.ts" />
import {Component, OnInit} from '@angular/core';
import {AuthHttp} from "../../config/http";

@Component({
  moduleId: module.id,
  selector: 'home-cmp',
  templateUrl: './home.component.html',
  directives: []
})

export class HomeComponent implements OnInit {
  ngOnInit() {

  }
  userName = localStorage.getItem('name');
  currentUser = {};
  baseUrl = 'http://localhost:3000/api/v1/';
  errorMessage = null;

  constructor(private http:AuthHttp) {
    this.getAccountInfo(localStorage.getItem('user_id'));
  }

  getAccountInfo(id) {
    return this.callApi(this.baseUrl + 'users/' + id).subscribe(
        user => this.currentUser = user.json(),
        error => this.errorMessage = <any>error);
  }

  callApi(url) {
    this.errorMessage = '';
    return this.http.get(url);
  }

}
