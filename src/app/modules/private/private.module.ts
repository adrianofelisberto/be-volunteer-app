import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { CreateVolunteerComponent } from './components/create-volunteer/create-volunteer.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrivateComponent } from './private.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ListVolunteersComponent } from './components/list-volunteers/list-volunteers.component';
import { FormComponent } from './components/form/form.component';
import { NgxMaskModule } from 'ngx-mask'
import { ReactiveFormsModule } from '@angular/forms';
import { InterestService } from './services/interest.service';
import { HttpClientModule } from '@angular/common/http';
import { VolunteerService } from './services/volunteer.service';
import { EditVolunteerModalComponent } from './components/edit-volunteer-modal/edit-volunteer-modal.component';


@NgModule({
  declarations: [CreateVolunteerComponent, MenuComponent, PrivateComponent, MenuItemComponent, ListVolunteersComponent, FormComponent, EditVolunteerModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrivateRoutingModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    NgbModule
  ],
  providers: [
    InterestService,
    VolunteerService
  ],
  entryComponents: [
    EditVolunteerModalComponent
  ]
})
export class PrivateModule { }
