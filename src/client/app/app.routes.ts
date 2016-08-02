import { provideRouter, RouterConfig } from '@angular/router';

import { LoginRoutes } from './+login/index';
import { DashboardRoutes } from './dashboard/index';
import { SignupRoutes } from './+signup/index';
import { DrugSearchRoutes } from './+drug-search/index';
import { DrugResultsRoutes } from './+drug-results/index';
import { PageNotFoundRoutes } from './+404/index';
import {Three40BRoutes} from './+340B/340b.routes';
import {MapRoutes} from './+map/map.routes';
import {AdminRoutes} from './admin/admin.routes';
import {HomeRoutes} from "./+home/home.routes";
import {ForgotPasswordRoutes} from "./+forgot-password/forgot-password.routes";



const routes: RouterConfig = [
	...LoginRoutes,
	...DashboardRoutes,
	...AdminRoutes,
	...SignupRoutes,
	...DrugSearchRoutes,
	...DrugResultsRoutes,
	...PageNotFoundRoutes,
	...Three40BRoutes,
	...MapRoutes,
	...HomeRoutes,
	...ForgotPasswordRoutes
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
