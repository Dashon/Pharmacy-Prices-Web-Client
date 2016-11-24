import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { HomeOverviewComponent } from './dashboard/+home/+home-overview/home-overview.component';
import { MyAchievementsComponent } from './dashboard/+home/+my-achievements/my-achievements';
import {DashboardHomeModule, HomeComponent} from './dashboard/+home/index';

import {SidebarComponent} from './shared/sidebar/index';
import {TopNavComponent} from './shared/topnav/index';
import {HomeMenuLeftComponent} from './dashboard/+home/+menu-left/menu-left';

//import {AuthHttp} from '../config/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OverviewComponent,
    SidebarComponent,
    TopNavComponent,
    HomeOverviewComponent,
    MyAchievementsComponent,
    HomeMenuLeftComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardHomeModule,
   // AuthHttp,

    RouterModule.forRoot([
          {path :'', component:DashboardComponent},
          {path:'dashboard', component:OverviewComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
