import { provideRouter, RouterConfig } from '@angular/router';

import { LoginRoutes } from './+login/index';
import { DashboardRoutes } from './dashboard/index';
import { SignupRoutes } from './+signup/index';
import { DrugSearchRoutes } from './+drug-search/index';
import { DrugResultsRoutes } from './+drug-results/index';
import { PageNotFoundRoutes } from './+404/index';



const routes: RouterConfig = [
	...LoginRoutes,
	...DashboardRoutes,
	...SignupRoutes,
	...DrugSearchRoutes,
	...DrugResultsRoutes,
	...PageNotFoundRoutes
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
