import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Router} from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HomeOverviewComponent } from './dashboard/+home/+home-overview/home-overview.component';
import { MyAchievementsComponent } from './dashboard/+home/+my-achievements/my-achievements';
import { HomeComponent} from './dashboard/+home/index';
import {LoginComponent} from './+login/login.component';
import {DashboardModule} from './dashboard/dashboard.route';

import {SidebarComponent} from './shared/sidebar/index';
import {TopNavComponent} from './shared/topnav/index';
import {HomeMenuLeftComponent} from './dashboard/+home/+menu-left/menu-left';
import { ChartModule } from 'angular2-highcharts';
import {APP_ROUTER_PROVIDER} from './app.routes'
//import {AuthHttp} from '../config/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    TopNavComponent,
    HomeComponent,
    HomeOverviewComponent,
    MyAchievementsComponent,
    HomeMenuLeftComponent,
LoginComponent,

  ],
  imports: [
    ChartModule,
    BrowserModule,
    FormsModule,
    HttpModule,
      RouterModule,
   // APP_ROUTER_PROVIDER,
    //DashboardModule,
   // AuthHttp,

    RouterModule.forRoot([
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [{
          path: 'home',
          component: HomeComponent,
          children: [
            {path: 'overview', component:HomeOverviewComponent},
            {path: 'my-achievements', component: MyAchievementsComponent}

          ]
        }
        ]
      },
        {
            path: '',
            component: LoginComponent,
            index: true
        },
    ])
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
