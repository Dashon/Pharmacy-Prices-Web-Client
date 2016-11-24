import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {MyArchievementsRoutes} from './+home/+my-achievements/index';
import {HomeOverViewRoutes} from './+home/+home-overview/index';

const DashboardRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
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
export class DashboardModule { }