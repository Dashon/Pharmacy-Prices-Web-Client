import { HomeComponent } from './index';
import {MyArchievementsRoutes} from './+my-achievements/index';
import {HomeOverViewRoutes} from './+home-overview/index';

export const HomeRoutes = [
	{
		path: 'home',
		component: HomeComponent,
		children: [
            ...MyArchievementsRoutes,
			...HomeOverViewRoutes
        ]
	},
];
