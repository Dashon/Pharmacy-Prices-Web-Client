/**
 * Created by Dashon on 6/14/16.
 */
import {Component} from 'angular2/core';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {AutocompleteContainer} from '../../../widgets/autocomplete/autocomplete-container';
import {Autocomplete} from '../../../widgets/autocomplete/autocomplete.component';
export const AUTOCOMPLETE_DIRECTIVES = [Autocomplete, AutocompleteContainer];

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'drug-results',
  templateUrl: './pages/drug-results/components/drug-results.html',
  directives: [DROPDOWN_DIRECTIVES, AUTOCOMPLETE_DIRECTIVES]

})
export class DrugResultsComp {
    doses = [];
    http = null;
    response = null;
    status:{isopen:boolean} = {isopen: false};

    typeaheadLoading:boolean = false;
    typeaheadNoResults:boolean = false;
    public getAsyncDataRef = this.getAsyncData.bind(this);
    public searchString:string = '';

    toggleDropdown($event:MouseEvent):void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    constructor(http:Http) {
        this.http = http;
    }

    getDrugs(text) {
        this.doses = [];
        return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix=' + text).map(res => res.json()).map((el)=> {
            return el.map((data)=> {
                this.doses.push(data.strength.description);
                return ({id: data.name, name: data.name}); // unnecessary as format is the same in this case
            });
        }).toPromise();
    }

    getUsers() {
        this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/pharmacies?distance_from_zip=60640');
    }

    callApi(url) {
        var authHeader = new Headers();
        authHeader.append('X-Api-Key', '9a04cee7-09d3-4372-8f56-1713ac445fff');

        var options = new RequestOptions({headers: authHeader});
        return this.http.get(url, options);
    }

    getCurrentContext() {
        return this;
    }

    getAsyncData(context:any):Function {
        if (this.searchString.length >= 3) {
            return this.getDrugs(this.searchString);
        }
    }

    changeTypeaheadLoading(e:boolean) {
        this.typeaheadLoading = e;
    }

    changeTypeaheadNoResults(e:boolean) {
        this.typeaheadNoResults = e;
    }

    typeaheadOnSelect(e:any) {
        console.log(`Selected value: ${e.item.id}`);
    }
}
