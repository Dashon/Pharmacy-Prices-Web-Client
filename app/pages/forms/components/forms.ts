import {Component} from 'angular2/core';
import {
	RouteConfig,
	ROUTER_DIRECTIVES
} from 'angular2/router';

import {FormElementCmp} from '../elements/components/elements';
import {FormComponentCmp} from '../form-component/components/components';


@Component({
    selector: 'form',
    templateUrl: './pages/forms/components/forms.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/elements', component: FormElementCmp, as: 'FormElement', useAsDefault: true },
	{ path: '/components', component: FormComponentCmp, as: 'FormComponent' }
])
export class FormCmp {}
