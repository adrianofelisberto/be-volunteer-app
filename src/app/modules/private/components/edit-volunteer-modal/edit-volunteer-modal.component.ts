import { Volunteer } from './../../models/volunteer';
import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-volunteer-modal',
  templateUrl: './edit-volunteer-modal.component.html',
  styleUrls: ['./edit-volunteer-modal.component.scss']
})
export class EditVolunteerModalComponent {

  @Input() data: { volunteer: Volunteer };

  constructor(
    public activeModal: NgbActiveModal
  ) { }

}
