import { UiElementComponent } from './index';
import { AlertRoutes } from './+alert/index';
import { ButtonRoutes } from './+buttons/index';
import { DropdownRoutes } from './+dropdown/index';
import { IconsRoutes } from './+icons/index';
import { CardRoutes } from './+cards/index';
import { ProgressbarRoutes } from './+progressbar/index';
import { PaginationRoutes } from './+pagination/index';
import { OtherElementRoutes } from './+other-element/index';

export const UiElementRoutes = [
	{
		path: 'ui-element',
		component: UiElementComponent,
		children: [
			...AlertRoutes,
			...ButtonRoutes,
			...DropdownRoutes,
			...IconsRoutes,
			...CardRoutes,
			...ProgressbarRoutes,
			...PaginationRoutes,
			...OtherElementRoutes
		]
	}
];
