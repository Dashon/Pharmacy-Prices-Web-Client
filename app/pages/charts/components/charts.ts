import {Component} from 'angular2/core';
import {
	RouteConfig,
	ROUTER_DIRECTIVES
} from 'angular2/router';

import {ChartjsCmp} from '../chartjs/components/chartjs';
import {C3Cmp} from '../c3/components/c3';

@Component({
    selector: 'chart',
    templateUrl: './pages/charts/components/charts.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/chartjs', component: ChartjsCmp, as: 'Chartjs', useAsDefault: true },
    { path: '/c3js', component: C3Cmp, as: 'C3' }
])
export class ChartCmp {}
