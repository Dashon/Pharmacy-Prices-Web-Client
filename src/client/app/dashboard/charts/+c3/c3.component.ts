/// <reference path="../../../../../../tools/manual_typings/project/c3.d.ts" />
import { Component, OnInit} from '@angular/core';

@Component({
	moduleId: module.id,
    selector: 'c3-chart',
    templateUrl: './c3.component.html'
})

export class C3Component implements OnInit {
	ngOnInit() {
		c3.generate({
		    bindto: '#linechart',
		        data: {
		        columns: [
		            ['data1', 30, 200, 100, 400, 150, 250],
		            ['data2', 50, 20, 10, 40, 15, 25]
		        ]
		    },
		    color: {
		        pattern: ['#06c5ac','#3faae3','#ee634c','#6bbd95','#f4cc0b','#9b59b6','#16a085','#c0392b']
		    }
		});
		c3.generate({
		   bindto: '#piechart',
		    data: {
		        // iris data from R
		        columns: [
		            ['data1', 30],
		            ['data2', 120],
		        ],
		        type : 'pie',
		        onclick: function (d, i) { console.log('onclick', d, i); },
		        onmouseover: function (d, i) { console.log('onmouseover', d, i); },
		        onmouseout: function (d, i) { console.log('onmouseout', d, i); }
		    },
		    color: {
		        pattern: ['#06c5ac','#3faae3','#ee634c','#6bbd95','#f4cc0b','#9b59b6','#16a085','#c0392b']
		    }
		});
		c3.generate({
		    bindto: '#donutchart',
		    data: {
		        columns: [
		            ['data1', 30],
		            ['data2', 120],
		        ],
		        type : 'donut',
		        onclick: function (d, i) { console.log('onclick', d, i); },
		        onmouseover: function (d, i) { console.log('onmouseover', d, i); },
		        onmouseout: function (d, i) { console.log('onmouseout', d, i); }
		    },
		    donut: {
		        title: 'Donut Chart'
		    },
		    color: {
		        pattern: ['#06c5ac','#3faae3','#ee634c','#6bbd95','#f4cc0b','#9b59b6','#16a085','#c0392b']
		    }
		});
		c3.generate({
		    bindto: '#areachart',
		    data: {
		        columns: [
		            ['data1', 200, 240, 300, 70, 10, 0],
		            ['data2', 130, 100, 140, 200, 150, 50]
		        ],
		        types: {
		            data1: 'area',
		            data2: 'area-spline'
		        }
		    },
		    color: {
		        pattern: ['#06c5ac','#3faae3','#ee634c','#6bbd95','#f4cc0b','#9b59b6','#16a085','#c0392b']
		    }
		});
	}
}
