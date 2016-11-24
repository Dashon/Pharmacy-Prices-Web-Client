import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { HomeComponent } from './+home/index';

import { HomeOverviewComponent } from './+home/+home-overview/home-overview.component';
import { MyAchievementsComponent } from './+home/+my-achievements/my-achievements';


export const DashboardRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		children: [{
			path: 'home',
			component: HomeComponent,
			children: [
				{path: '', component:HomeOverviewComponent},
				{path: 'my-achievement', component: MyAchievementsComponent}

			]
		}
        ]
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(DashboardRoutes)
	],
	exports: [
		RouterModule
	]
})
export class DashboardModule { }