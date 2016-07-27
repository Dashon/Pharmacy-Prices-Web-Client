import {AdminComponent} from './index';
import {EditRequestRoutes} from './+edit-request/edit-request.routes.ts';
import {ManagePharmaciesRoutes} from './+manage-pharmacies/manage-pharmacies.routes.ts';
import {ManageRewardsRoutes} from './+manage-rewards/manage-rewards.routes.ts';
import {ManageClinicsRoutes} from './+manage-clinics/manage-clinics.routes.ts';
import {ManageUsersRoutes} from './+manage-users/manage-users.routes.ts';
import {SurveyQuestionsRoutes} from './+survey-questions/survey-questions.routes.ts';
import {AdminGaurd} from "../shared/services/auth.gaurd";


export const AdminRoutes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGaurd],
        children: [
            ...EditRequestRoutes,
            ...ManagePharmaciesRoutes,
            ...ManageRewardsRoutes,
            ...ManageClinicsRoutes,
            ...ManageUsersRoutes,
            ...SurveyQuestionsRoutes
        ]
    },
];
