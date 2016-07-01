import { provideRouter, RouterConfig } from '@angular/router';

import { LoginRoutes } from './+login/index';
import { DashboardRoutes } from './dashboard/index';
import { SignupRoutes } from './+signup/index';
import { PageNotFoundRoutes } from './+404/index';

const routes: RouterConfig = [
	...LoginRoutes,
	...DashboardRoutes,
	...SignupRoutes,
	...PageNotFoundRoutes
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
