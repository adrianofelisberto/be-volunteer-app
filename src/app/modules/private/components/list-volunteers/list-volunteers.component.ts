import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../services/volunteer.service';
import { Volunteer } from '../../models/volunteer';

@Component({
  selector: 'app-list-volunteers',
  templateUrl: './list-volunteers.component.html',
  styleUrls: ['./list-volunteers.component.scss']
})
export class ListVolunteersComponent implements OnInit {

  volunteers$: Observable<Volunteer[]>;

  constructor(
    private volunteerService: VolunteerService
  ) { }

  ngOnInit(): void {
    this.loadVolunteers();
  }

  editVolunteer(volunteer: Volunteer) {
    console.log('edit', volunteer);
    this.loadVolunteers();
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
