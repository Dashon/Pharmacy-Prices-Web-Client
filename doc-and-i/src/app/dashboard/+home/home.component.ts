import {Component, OnInit} from '@angular/core';

import {HomeMenuLeftComponent} from './+menu-left/menu-left';

@Component({

    selector: 'home-cmp',
    templateUrl: './home.component.html',
    styleUrls:['./home.component.css'],
    directives: [HomeMenuLeftComponent]
})

export class HomeComponent implements OnInit {


    constructor() { }

    ngOnInit() {
    }
}
