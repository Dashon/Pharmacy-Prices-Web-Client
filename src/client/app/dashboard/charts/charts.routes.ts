import { ChartComponent } from './index';
import { C3Routes } from './+c3/index';
import { ChartJsRoutes } from './+chartjs/index';

export const ChartRoutes = [
	{
		path: 'charts',
		component: ChartComponent,
		children: [
			...C3Routes,
			...ChartJsRoutes
		]
	}
];
