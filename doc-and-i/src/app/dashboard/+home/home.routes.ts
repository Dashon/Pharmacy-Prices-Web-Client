import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './index';
import {MyArchievementsRoutes} from './+my-achievements/index';
import {HomeOverViewRoutes} from './+home-overview/index';

const HomeRoutes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		children: [
            ...MyArchievementsRoutes,
			...HomeOverViewRoutes
        ]
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(HomeRoutes)
	],
	exports: [
		RouterModule
	]
})
export class DashboardHomeModule { }