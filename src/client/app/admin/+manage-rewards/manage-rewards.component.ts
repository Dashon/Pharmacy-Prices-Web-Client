import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from "../../config/http";

@Component({
    moduleId: module.id,
    selector: 'manage-rewards-cmp',
    templateUrl: './manage-rewards.component.html',
    directives: [DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class ManageRewardsComponent {

    baseUrl = 'http://api.docandi.com/api/v1/';
    http = null;
    response = null;
    errorMessage = null;

    editRewardItem = {};
    rewards = [];
    totalPages = 0;
    currentPage = 0;


    constructor(http:AuthHttp) {
        this.http = http;
        this.getRewards(1);
    }

    createReward() {
        this.postApi(this.baseUrl + 'rewards/', this.editRewardItem).subscribe(
            () => this.getRewards(this.totalPages),
            error => this.errorMessage = <any>error);
        this.editRewardItem = {};
    }

    editReward(reward) {
        this.editRewardItem = (JSON.parse(JSON.stringify(reward)))
    }

    getRewards(page) {
        this.callApi(this.baseUrl + 'rewards?page=' + page).map(res => {
            this.totalPages = res.headers.get('Total_pages');
            this.currentPage = res.headers.get('Current_page');
            return res.json()
        }).subscribe((el)=> this.rewards = el);
    }

    saveReward() {
        this.putApi(this.baseUrl + 'rewards/'+this.editRewardItem['id'], this.editRewardItem).map(res => res.json()).subscribe(()=> {
            this.getRewards(this.currentPage);
        });
        this.editRewardItem = {};

    }

    deleteReward(id) {
        return this.deleteApi(this.baseUrl + 'rewards/' + id).subscribe(()=> {
            this.getRewards(this.currentPage);
        });
    }

    cancelEditReward() {
        this.editRewardItem = {};
    }


    newReward() {
        this.editRewardItem = {id: 'NEW'};
    }

    prevPage() {
        this.getRewards(this.currentPage - 1);
    }

    nextPage() {
        this.getRewards(this.currentPage + 1);
    }


    callApi(url) {
        this.errorMessage = '';
        return this.http.get(url);
    }

    postApi(url, body) {
        this.errorMessage = '';
        var bodyJSON = JSON.stringify(body);
        return this.http.post(url, bodyJSON);
    }

    putApi(url, body) {
        this.errorMessage = '';
        var bodyJSON = JSON.stringify(body);
        return this.http.put(url, bodyJSON);
    }

    deleteApi(url) {
        this.errorMessage = '';
        return this.http.delete(url);
    }

}
