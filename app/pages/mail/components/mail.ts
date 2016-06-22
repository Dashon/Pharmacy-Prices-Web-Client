import {Component} from 'angular2/core';
import {
RouteConfig,
ROUTER_DIRECTIVES
} from 'angular2/router';

import {InboxCmp} from '../inbox/components/inbox';
import {ComposeCmp} from '../compose/components/compose';

@Component({
    selector: 'chart',
    templateUrl: './pages/mail/components/mail.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/inbox', component: InboxCmp, as: 'Inbox', useAsDefault: true },
    { path: '/compose', component: ComposeCmp, as: 'Compose' }
])
export class MailCmp { }
