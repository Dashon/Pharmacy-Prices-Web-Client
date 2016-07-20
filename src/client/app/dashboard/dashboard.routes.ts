import {DashboardComponent} from './index';
import {HomeRoutes} from './+home/index';
import {AccountSettingsRoutes} from './+account-settings/account-settings.routes';
import {MyClinicRoutes} from './+my-clinic/my-clinic.routes';
import {MyPharmaciesRoutes} from './+my-pharmacies/my-pharmacies.routes';
import {ContractedPharmaciesRoutes} from './+contracted-pharmacies/contracted-pharmacies.routes';
import {HelpRoutes} from './+help/help.routes';


export const DashboardRoutes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            ...HomeRoutes,
            ...AccountSettingsRoutes,
            ...MyClinicRoutes,
            ...MyPharmaciesRoutes,
            ...ContractedPharmaciesRoutes,
            ...HelpRoutes
        ]
    },
];
