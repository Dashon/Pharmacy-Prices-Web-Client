/// <reference path='../../../../../tools/manual_typings/project/c3.d.ts' />
import {Component, OnInit} from '@angular/core';
import {AuthHttp} from '../../config/http';
import {ModalDirective, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: './home.component.html',
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [ModalDirective]
})

export class HomeComponent implements OnInit {
    userName = localStorage.getItem('name');
    currentUser = {};
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
        if (localStorage.getItem('currentUser')) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }


    getAccountInfo(id) {
        return this.callApi(this.baseUrl + 'users/' + id).subscribe(
            user => {
                this.currentUser = user.json();
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
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
