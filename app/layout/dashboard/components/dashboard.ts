import {Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeCmp} from '../../../pages/home/components/home';
import {TypographyCmp} from '../../../pages/typography/components/typography';
import {ChartCmp} from '../../../pages/charts/components/charts';
import {GridCmp} from '../../../pages/grid/components/grid';
import {FormCmp} from '../../../pages/forms/components/forms';
import {ProfileCmp} from '../../../pages/profile/components/profile';
import {UiElementCmp} from '../../../pages/ui-element/components/ui_element';
import {CalendarCmp} from '../../../pages/calendar/components/calendar';
import {BlankPageCmp} from '../../../pages/blank-page/components/blank_page';
import {MailCmp} from '../../../pages/mail/components/mail';
import {InvoiceCmp} from '../../../pages/invoice/components/invoice';
import {TableCmp} from '../../../pages/tables/components/tables';
import {TopNavCmp} from '../../../widgets/topnav/components/topnav';
import {SidebarCmp} from '../../../widgets/sidebar/components/sidebar';
import {DrugSearchComp} from '../../../pages/drug-search/components/drug-search';
import {DrugResultsComp} from '../../../pages/drug-results/components/drug-results';


@Component({
  selector: 'dashboard',
  templateUrl: './layout/dashboard/components/dashboard.html',
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, TopNavCmp, SidebarCmp]
})
@RouteConfig([
    { path: '/', component: HomeCmp, as: 'Home', useAsDefault:true},
    { path: '/typography', component: TypographyCmp, as: 'Typography' },
    { path: '/grids', component: GridCmp, as: 'Grid' },
    { path: '/charts/...', component: ChartCmp, as: 'Chart' },
    { path: '/tables', component: TableCmp, as: 'Table' },
    { path: '/form/...', component: FormCmp, as: 'Forms' },
    { path: '/ui-element/...', component: UiElementCmp, as: 'UiElement' },
    { path: '/calendar', component: CalendarCmp, as: 'Calendar' },
    { path: '/blank-page', component: BlankPageCmp, as: 'Blankpage' },
    { path: '/mail/...', component: MailCmp, as: 'Mail' },
    { path: '/invoice', component: InvoiceCmp, as: 'Invoice' },
  { path: '/profile', component: ProfileCmp, as: 'Profile' },
  { path: '/drug-search', component: DrugSearchComp, as: 'DrugSearch' },
  { path: '/drug-results', component: DrugResultsComp, as: 'DrugResults' }
])
export class DashboardCmp { }
