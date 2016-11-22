import { Component} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { AuthHttp } from '../../../config/http';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { Modal } from '../../../shared/ng2-modal/modal';

@Component({
    // moduleId: module.id,
    // selector: 'home-menu-left',
    templateUrl: 'modal-avatar.html',
    styleUrls: ['../home.component.css'],
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DROPDOWN_DIRECTIVES, Modal]
})

export class ModalAvatarComponent {
    modal: Modal;
    constructor(http: AuthHttp, private router: Router, public _modal: Modal) {
        this.modal = _modal;
    }

    close() {
        this.modal.close();
    }

}
