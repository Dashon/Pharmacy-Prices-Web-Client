import {DashboardComponent} from './index';
import {HomeRoutes} from './+home/index';
import {AccountSettingsRoutes} from './+account-settings/account-settings.routes';
import {MyClinicRoutes} from './+my-clinic/my-clinic.routes';
import {MyPharmaciesRoutes} from './+my-pharmacies/my-pharmacies.routes';
import {ContractedPharmaciesRoutes} from './+contracted-pharmacies/contracted-pharmacies.routes';
import {HelpRoutes} from './+help/help.routes';
import {AuthGuard} from "../shared/services/auth.gaurd";


export const DashboardRoutes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
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
