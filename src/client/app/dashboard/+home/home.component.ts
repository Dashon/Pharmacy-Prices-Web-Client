/// <reference path="../../../../../tools/manual_typings/project/c3.d.ts" />
import {Component, OnInit} from '@angular/core';
import {TodoComponent, StatsComponent} from '../../../widgets/index';

@Component({
  moduleId: module.id,
  selector: 'home-cmp',
  templateUrl: './home.component.html',
  directives: [TodoComponent, StatsComponent]
})

export class HomeComponent implements OnInit {
  ngOnInit() {
    var vmap: any = $('#vmap');
    vmap.vectorMap({
      map: 'world_en',
      backgroundColor: '#FFF',
      borderColor: '#D9D9D9',
      borderOpacity: 0.25,
      borderWidth: 1,
      color: '#CCCCCC',
      enableZoom: true,
      hoverColor: '#63B4E6',
      hoverOpacity: null,
      normalizeFunction: 'linear',
      scaleColors: ['#b6d6ff', '#005ace'],
      selectedColor: '#63B4E6',
      selectedRegions: [],
      showTooltip: true,
      onRegionClick: function(element: any, code: any, region: any) {
        var message = 'You clicked "'
          + region
          + '" which has the code: '
          + code.toUpperCase();
        console.log(message);
      }
    });
    c3.generate({
      bindto: '#lineChart',
      data: {
        columns: [
          ['Newuser', 30, 200, 100, 400, 150, 250],
          ['Returning user', 50, 120, 210, 140, 115, 425],
          ['Referral user', 40, 150, 98, 300, 175, 100]
        ]
      },
      color: {
        pattern: ['#3CA2E0', '#5CB85C', '#F1B35B']
      },
      axis: {
        x: {
          show: false
        },
        y: {
          show: false
        }
      }
    });

    c3.generate({
      bindto: '#cbar',
      data: {
        columns: [
          [10, 40, 20, 90, 35, 70, 10, 50, 20, 80, 60, 10, 20, 40, 70, 65]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
      },
      color: {
        pattern: ['#DB5B57']
      },
      legend: {
        show: false
      },
      axis: {
        x: {
          show: false
        },
        y: {
          show: false
        }
      }
    });
    c3.generate({
      bindto: '#pie',
      data: {
        columns: [
          ['data1', 11],
          ['data2', 23],
          ['data3', 66]
        ],
        type: 'pie'
      },
      color: {
        pattern: ['#5CB85C', '#F0AD4E', '#3CA2E0']
      },
      legend: {
        show: false
      }
    });
  }
}
