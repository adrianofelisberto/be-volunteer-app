import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../services/volunteer.service';
import { Volunteer } from '../../models/volunteer';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EditVolunteerModalComponent } from '../edit-volunteer-modal/edit-volunteer-modal.component';

@Component({
  selector: 'app-list-volunteers',
  templateUrl: './list-volunteers.component.html',
  styleUrls: ['./list-volunteers.component.scss']
})
export class ListVolunteersComponent implements OnInit {

  volunteers$: Observable<Volunteer[]>;

  constructor(
    private volunteerService: VolunteerService,
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
            
          });
    
        const data = {
          volunteer
        }
    
        modalRef.componentInstance.data = data;
        modalRef.result.finally(() => this.loadVolunteers());
      })
  }

  removeVolunteer(volunteer: Volunteer) {
    this.volunteerService.removeById(volunteer.id)
      .subscribe(message => {
        alert(message.message);
        this.loadVolunteers();
      });
  }

  private loadVolunteers() {
    this.volunteers$ = this.volunteerService.getAll();
  }

}
