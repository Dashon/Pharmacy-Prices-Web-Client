import {DashboardComponent} from './index';
import {HomeRoutes} from './+home/index';
import {AccountSettingsRoutes} from './+account-settings/account-settings.routes';
import {EditRequestRoutes} from './+edit-request/edit-request.routes';
import {ManagePharmaciesRoutes} from './+manage-pharmacies/manage-pharmacies.routes';
import {ManageClinicRoutes} from './+manage-clinic/manage-clinic.routes';
import {ManageClinicPharmaciesRoutes} from './+manage-clinic-pharmacies/manage-clinic-pharmacies.routes';
import {ManageContractedPharmaciesRoutes} from './+manage-contracted-pharmacies/manage-contracted-pharmacies.routes';
import {ManageRewardsRoutes} from './+manage-rewards/manage-rewards.routes';


export const DashboardRoutes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            ...HomeRoutes,
            ...AccountSettingsRoutes,
            ...EditRequestRoutes,
            ...ManagePharmaciesRoutes,
            ...ManageClinicRoutes,
            ...ManageClinicPharmaciesRoutes,
            ...ManageContractedPharmaciesRoutes,
            ...ManageRewardsRoutes
        ]
    },
];
