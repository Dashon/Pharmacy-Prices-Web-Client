/**
 * Created by Dashon on 6/14/16.
 */
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

/**
 * This class represents the lazy loaded LoginComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'drug-search-cmp',
  templateUrl: 'drug-search.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class DrugSearchComponent {}
