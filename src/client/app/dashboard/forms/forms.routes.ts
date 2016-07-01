import { FormComponent } from './index';

import { FormElementRoutes } from './+elements/index';
import { FormComponentRoutes } from './+form-component/index';

export const FormRoutes = [
	{
		path: 'forms',
		component: FormComponent,
		children: [
			...FormElementRoutes,
			...FormComponentRoutes
		]
	},
];
