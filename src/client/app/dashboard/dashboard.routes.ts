import { DashboardComponent } from './index';
import { HomeRoutes } from './+home/index';
import { GridRoutes } from './+grid/index';
import { TableRoutes } from './+tables/index';
import { TypographyRoutes } from './+typography/index';
import { FormRoutes } from './forms/index';
import { UiElementRoutes } from './ui-element/index';
import { CalendarRoutes } from './+calendar/index';
import { InvoiceRoutes } from './+invoice/index';
import { MailRoutes } from './mail/index';
import { ChartRoutes } from './charts/index';
import { ProfileRoutes } from './+profile/index';
import { BlankPageRoutes } from './+blank-page/index';


export const DashboardRoutes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		children: [
			...HomeRoutes,
			...GridRoutes,
			...TableRoutes,
			...TypographyRoutes,
			...FormRoutes,
			...UiElementRoutes,
			...CalendarRoutes,
			...InvoiceRoutes,
			...MailRoutes,
			...ChartRoutes,
			...ProfileRoutes,
			...BlankPageRoutes
	    ]
	},
];
