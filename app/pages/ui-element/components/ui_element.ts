import {Component} from 'angular2/core';
import {
	RouteConfig,
	ROUTER_DIRECTIVES
} from 'angular2/router';

import {ButtonCmp} from '../../../pages/ui-element/button/components/button';
import {DropdownCmp} from '../../../pages/ui-element/dropdown/components/dropdown';
import {IconCmp} from '../../../pages/ui-element/icons/components/icons';
import {CardCmp} from '../../../pages/ui-element/card/components/card';
import {AlertCmp} from '../../../pages/ui-element/alert/components/alert';
import {ProgressbarCmp} from '../../../pages/ui-element/progressbar/components/progressbar';
import {PaginationCmp} from '../../../pages/ui-element/pagination/components/pagination';
import {OtherCmp} from '../../../pages/ui-element/other-element/components/other-element';

@Component({
    selector: 'chart',
    templateUrl: './pages/ui-element/components/ui-element.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/ui-element/button', component: ButtonCmp, as: 'Button', useAsDefault: true},
	{ path: '/ui-element/dropdown', component: DropdownCmp, as: 'Dropdown' },
	{ path: '/ui-element/icons', component: IconCmp, as: 'Icon' },
	{ path: '/ui-element/cards', component: CardCmp, as: 'Card' },
	{ path: '/ui-element/alert', component: AlertCmp, as: 'Alert' },
	{ path: '/ui-element/progressbar', component: ProgressbarCmp, as: 'Progressbar' },
	{ path: '/ui-element/pagination', component: PaginationCmp, as: 'Pagination' },
	{ path: '/ui-element/others', component: OtherCmp, as: 'Other' }
])
export class UiElementCmp {}
