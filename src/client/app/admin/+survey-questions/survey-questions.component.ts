import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from "../../config/http";

@Component({
    moduleId: module.id,
    selector: 'survey-questions-cmp',
    templateUrl: './survey-questions.component.html',
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class SurveyQuestionsComponent {
    baseUrl = 'http://localhost:3000/api/v1/';
    http = null;
    response = null;
    errorMessage = null;

    editQuestionItem = {};
    questions = [];
    totalPages = 0;
    currentPage = 0;


    constructor(http:AuthHttp) {
        this.http = http;
        this.getQuestions(1);
    }

    createQuestion() {
        this.postApi(this.baseUrl + 'questions/', this.editQuestionItem).subscribe(
            () => this.getQuestions(this.totalPages),
            error => this.errorMessage = <any>error);
        this.editQuestionItem = {};
    }

    editQuestion(question) {
        this.editQuestionItem = (JSON.parse(JSON.stringify(question)))
    }

    getQuestions(page) {
        this.callApi(this.baseUrl + 'questions?page=' + page).map(res => {
            this.totalPages = res.headers.get('Total_pages');
            this.currentPage = res.headers.get('Current_page');
            return res.json()
        }).subscribe((el)=> this.questions = el);
    }

    saveQuestion() {
        this.putApi(this.baseUrl + 'questions'+this.editQuestionItem['id'], this.editQuestionItem).map(res => res.json()).subscribe(()=> {
            this.getQuestions(this.currentPage);
        });
        this.editQuestionItem = {};

    }

    deleteQuestion(id) {
        return this.deleteApi(this.baseUrl + 'questions/' + id).subscribe(()=> {
            this.getQuestions(this.currentPage);
        });
    }

    cancelEditQuestion() {
        this.editQuestionItem = {};
    }


    newQuestion() {
        this.editQuestionItem = {id: 'NEW'};
    }

    prevPage() {
        this.getQuestions(this.currentPage - 1);
    }

    nextPage() {
        this.getQuestions(this.currentPage + 1);
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
