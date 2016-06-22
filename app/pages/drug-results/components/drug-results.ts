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

  http = null;
  response = null;
  status:{isopen:boolean} = {isopen: false};

  autocompleteLoading:boolean = false;
  autocompleteNoResults:boolean = false;


  private _cachedResult:any;
  private _previousContext:any;
 // private carsExample1:Array<string> = ['BMW', 'Audi','Mercedes','Porsche','Volkswagen','Opel','Maserati','Volkswagen','BMW Serie 2'];
  toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  constructor(http:Http) {
    this.http = http;
  }

  getDrugs(text) {
    var authHeader = new Headers();
    authHeader.append('X-Api-Key', '9a04cee7-09d3-4372-8f56-1713ac445fff');

    var options = new RequestOptions({headers: authHeader});

    return this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/drugs?name_prefix='+text, options);
  }

  getUsers() {
    var authHeader = new Headers();
    authHeader.append('X-Api-Key', '9a04cee7-09d3-4372-8f56-1713ac445fff');

    var options = new RequestOptions({headers: authHeader});

    this.callApi('http://doc-and-i-api.herokuapp.com/api/v1/pharmacies?distance_from_zip=60640', options);
  }

  callApi(url, options) {
    return this.http.get(url, options);

  }

  getCurrentContext() {
    return this;
  }

  getAsyncData(context:any):Function {
    if (this._previousContext === context) {
      return this._cachedResult;
    }

    this._previousContext = context;
    let f = this.getDrugs('add');
    // let f:Function = function ():Promise<string[]> {
    //   let p:Promise<string[]> = new Promise((resolve:Function) => {
    //     setTimeout(() => {
    //       let query = new RegExp(context.asyncSelectedCar, 'ig');
    //       return resolve(context.carsExample1.filter((state:any) => {
    //         return query.test(state);
    //       }));
    //     }, 500);
    //   });
    //   return p;
    // };
    this._cachedResult = f;
    return this._cachedResult;
  }

  changeAutocompleteLoading(e:boolean) {
    this.autocompleteLoading = e;
  }

  changeAutocompleteNoResults(e:boolean) {
    this.autocompleteNoResults = e;
  }

  autocompleteOnSelect(e:any) {
    console.log(`Selected value: ${e.item}`);
  }
}
