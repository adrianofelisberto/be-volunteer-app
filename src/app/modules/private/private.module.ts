import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { CreateVolunteerComponent } from './components/create-volunteer/create-volunteer.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrivateComponent } from './private.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ListVolunteersComponent } from './components/list-volunteers/list-volunteers.component';



@NgModule({
  declarations: [CreateVolunteerComponent, MenuComponent, PrivateComponent, MenuItemComponent, ListVolunteersComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
