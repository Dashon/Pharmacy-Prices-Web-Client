import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {
    DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, DATEPICKER_DIRECTIVES,
    BS_VIEW_PROVIDERS, ModalDirective
} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthHttp} from '../../config/http';
import {MapToArray} from '../../shared/pipes/MapToArray';

@Component({
    moduleId: module.id,
    selector: 'clinic-stats-cmp',
    templateUrl: './clinic-stats.component.html',
    pipes: [MapToArray],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [DROPDOWN_DIRECTIVES, TYPEAHEAD_DIRECTIVES, ROUTER_DIRECTIVES, FORM_DIRECTIVES, DATEPICKER_DIRECTIVES, ModalDirective]
})
export class ClinicStatsComponent {
    baseUrl = 'https://doc-and-i-api.herokuapp.com/api/v1/';
    http = null;
    response = null;
    errorMessage = null;
    stop = new Date();
    today = new Date();
    start = new Date(this.today.getFullYear(), 7, 1);
    clinics = [];

    currentClinic = {};
    stats = {};

    constructor(http:AuthHttp) {
        this.http = http;
        this.getClinics();
        this.getClinic(localStorage.getItem('hcf_id'));

        this.getStats(this.start, this.stop);
    }

    ngOnInit() {
        if (localStorage.getItem('currentClinic')) {
            this.currentClinic = JSON.parse(localStorage.getItem('currentClinic'));
        }

        if (localStorage.getItem('stats')) {
            this.stats = JSON.parse(localStorage.getItem('stats'));
            this.createGraph();
        }


    }

    getClinics() {
        return this.callApi(this.baseUrl + 'health_care_facilities').map(res => res.json()).subscribe(
            (el)=> this.clinics = el,
            error => this.errorMessage = <any>error);
    }

    getClinic(id) {
        return this.callApi(this.baseUrl + 'health_care_facilities/' + id).subscribe(
            clinic => {
                this.currentClinic = JSON.parse(clinic._body);
                localStorage.setItem('currentClinic', JSON.stringify(this.currentClinic));
            },
            error => this.errorMessage = <any>error);
    }

    getStats(start, stop) {
        start = new Date(start).getTime() / 1000;
        stop = new Date(stop).getTime() / 1000;
        return this.callApi(this.baseUrl + 'health_care_facilities/' + localStorage.getItem('hcf_id') + '/stats?start=' + start + '&stop=' + stop).subscribe(
            stats => {
                this.stats = JSON.parse(stats._body);
                localStorage.setItem('stats', JSON.stringify(this.stats));
                this.createGraph();
            },
            error => this.errorMessage = <any>error);
    }

    private createGraph() {

        c3.generate({
            bindto: '#notGoingChart',
            data: {
                columns: [
                    ['Refused To Change', parseInt(this.stats['refusedToChange'])],
                    ['Agreed To Change', parseInt(this.stats['agreedToChange'])],
                ],
                type: 'donut',
                onclick: function (d, i) {
                    //console.log('onclick', d, i);
                },
                onmouseover: function (d, i) {
                    // console.log('onmouseover', d, i);
                },
                onmouseout: function (d, i) {
                    // console.log('onmouseout', d, i);
                }
            },
            donut: {
                title: 'Not Going:' + (this.stats['notGoing'] || 0)
            },
            color: {
                pattern: ['#ee634c', '#6bbd95']
            }
        });

        c3.generate({
            bindto: '#totalSurveyChart',
            data: {
                columns: [
                    ['Already Going', parseInt(this.stats['alreadyGoing'])],
                    ['Not Going', parseInt(this.stats['notGoing'])],
                ],
                type: 'donut',
                onclick: function (d, i) {
                    //console.log('onclick', d, i);
                },
                onmouseover: function (d, i) {
                    // console.log('onmouseover', d, i);
                },
                onmouseout: function (d, i) {
                    // console.log('onmouseout', d, i);
                }
            },
            donut: {
                title: 'Total:' + (this.stats.totalSurveys || 0)
            },
            color: {
                pattern: ['#06c5ac', '#3faae3', '#ee634c', '#6bbd95']
            }
        });

        c3.generate({
            bindto: '#gaugechart',
            data: {
                columns: [
                    ['data', ((parseInt(this.stats.totalSurveys) / parseInt(this.stats.totalPatients))*100)]
                ],
                type: 'gauge',
                onclick: function (d, i) {
                    // console.log("onclick", d, i);
                },
                onmouseover: function (d, i) {
                    // console.log("onmouseover", d, i);
                },
                onmouseout: function (d, i) {
                    // console.log("onmouseout", d, i);
                }
            },
            gauge: {
                label: {
                    show: false // to turn off the min/max labels.
                },
            },
            color: {
                pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
                threshold: {
                    values: [30, 60, 90, 100]
                }
            },
            size: {
                height: 100
            }
        });
    }


    callApi(url) {
        this.errorMessage = '';
        return this.http.get(url);
    }

}
