import {Component} from '@angular/core';
import {RouterModule, Router} from '@angular/router';

@Component({
    selector: 'home-menu-left',
    templateUrl: 'menu-left.html',
    styleUrls:['../home.component.css']
})

export class HomeMenuLeftComponent {

    page="overview";

    constructor( private router:Router) {

    }



    gotoMyAchievements(){
        this.page="achievement"
        this.router.navigate(['/dashboard/home', 'my-achievements']);
    }
    gotoOverViewHomePage() {
        this.page="overview"
        this.router.navigate(['/dashboard/home', 'overview']);
    }
}
