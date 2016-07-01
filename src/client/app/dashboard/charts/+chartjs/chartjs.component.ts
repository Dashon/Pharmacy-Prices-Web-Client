/// <reference path="../../../../../../tools/manual_typings/project/chartjs.d.ts" />
import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
    selector: 'chart-js',
    templateUrl: './chartjs.component.html'
})

export class ChartJsComponent implements OnInit {
	ngOnInit() {
		var data1 = {
		    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		    datasets: [
		        {
		            label: 'My First dataset',
		            fillColor: 'rgba(200, 200, 255, 0.3)',
		            strokeColor: 'rgba(6, 197, 172, 1))',
		            pointColor: 'rgba(6, 197, 172, 1))',
		            pointStrokeColor: '#fff',
		            pointHighlightFill: '#fff',
		            pointHighlightStroke: 'rgba(6, 197, 172, 1))',
		            data: [65, 59, 80, 81, 56, 55, 40]
		        },
		        {
		            label: 'My Second dataset',
		            fillColor: 'rgba(213, 125, 109, 0.3)',
		            strokeColor: 'rgba(213, 125, 109, 1)',
		            pointColor: 'rgba(213, 125, 109, 1)',
		            pointStrokeColor: '#fff',
		            pointHighlightFill: '#fff',
		            pointHighlightStroke: 'rgba(213, 125, 109, 1)',
		            data: [28, 48, 40, 19, 86, 27, 90]
		        }
		    ]
		};
		var cline: any = document.getElementById('cline');
        new Chart(cline.getContext('2d')).Line(data1, { responsive: true });
        var data2 = {
		    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		    datasets: [
		        {
		            label: 'My First dataset',
		            fillColor: 'rgba(162, 209, 158, 0.5)',
		            strokeColor: 'rgba(162, 209, 158, 0.9)',
		            highlightFill: 'rgba(162, 209, 158, 0.7)',
		            highlightStroke: 'rgba(162, 209, 158, 1)',
		            data: [65, 59, 80, 81, 56, 55, 40]
		        },
		        {
		            label: 'My Second dataset',
		            fillColor: 'rgba(232, 183, 105, 0.5)',
		            strokeColor: 'rgba(232, 183, 105, 0.9)',
		            highlightFill: 'rgba(232, 183, 105, 0.7)',
		            highlightStroke: 'rgba(232, 183, 105, 1)',
		            data: [28, 48, 40, 19, 86, 27, 90]
		        }
		    ]
		};
		var cbar:any = document.getElementById('cbar');
        new Chart(cbar.getContext('2d')).Bar(data2, {responsive: true});

        var data3 = [
			{
				value: 100,
				color: '#06C5AC',
				highlight: 'rgba(6, 197, 172, 0.9)',
				label: 'Primary'
			},
			{
				value: 50,
				color: '#D57D6D',
				highlight: 'rgba(213, 125, 109, 0.9)',
				label: 'Danger'
			},
			{
				value: 50,
				color: '#80B1CB',
				highlight: 'rgba(128, 177, 203, 0.9)',
				label: 'Info'
			},
			{
				value: 100,
				color: '#E8B769',
				highlight: 'rgba(232, 183, 105, 0.9)',
				label: 'Warning'
			}
		];
		var cdonut:any = document.getElementById('cdonut');
        new Chart(cdonut.getContext('2d')).Doughnut(data3, {
            responsive: true,
            animateScale: true
        });
        var data4 = [
			{
				value: 220,
				color: '#A2D19E',
				highlight: 'rgba(162, 209, 158, 0.9)',
				label: 'Success'
			},
			{
				value: 70,
				color: '#D57D6D',
				highlight: 'rgba(213, 125, 109, 0.9)',
				label: 'Danger'
			},
			{
				value: 100,
				color: '#80B1CB',
				highlight: 'rgba(128, 177, 203, 0.9)',
				label: 'Info'
			}
		];
		var cpie:any = document.getElementById('cpie');
        new Chart(cpie.getContext('2d')).Pie(data4, {
            responsive: true
        });
	}
}
