import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../services/volunteer.service';
import { Volunteer } from '../../models/volunteer';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EditVolunteerModalComponent } from '../edit-volunteer-modal/edit-volunteer-modal.component';
import { Message } from '../../models/message';
import { MessageService } from 'src/app/modules/core/services/message.service';

@Component({
  selector: 'app-list-volunteers',
  templateUrl: './list-volunteers.component.html',
  styleUrls: ['./list-volunteers.component.scss']
})
export class ListVolunteersComponent implements OnInit {

  volunteers$: Observable<Volunteer[]>;

  constructor(
    private volunteerService: VolunteerService,
    private messageService: MessageService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadVolunteers();
  }

  openEditModal(idVolunteer: number) {
    this.volunteerService.getById(idVolunteer)
      .subscribe(volunteer => {
        const modalRef = this.modalService.open(EditVolunteerModalComponent,
          {
            scrollable: false,
            centered: true,
            windowClass: 'max-width-modal',
            keyboard: false,
            beforeDismiss: () => false
          });
    
        const data = {
          volunteer
        }
    
        modalRef.componentInstance.data = data;
        modalRef.result.then((result) => result && this.loadVolunteers());
      })
  }

  validateRemoveVolunteer(volunteer: Volunteer) {
    this.messageService.confirmMessage()
      .then(result => {
        if (result.value) {
          this.removeVolunteer(volunteer);
        }
      })
  }

  private removeVolunteer(volunteer: Volunteer) {
    this.volunteerService.removeById(volunteer.id)
      .subscribe(response => {
        this.messageService.successMessage(response.message);
        this.loadVolunteers();
      });
  }

  private loadVolunteers() {
    this.volunteers$ = this.volunteerService.getAll();
  }

}
