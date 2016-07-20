import {AdminComponent} from './index';
import {EditRequestRoutes} from './+edit-request/edit-request.routes';
import {ManagePharmaciesRoutes} from './+manage-pharmacies/manage-pharmacies.routes';
import {ManageRewardsRoutes} from './+manage-rewards/manage-rewards.routes';
import {ManageClinicsRoutes} from './+manage-clinics/manage-clinics.routes';
import {ManageUsersRoutes} from './+manage-users/manage-users.routes';
import {SurveyQuestionsRoutes} from './+survey-questions/survey-questions.routes';
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
