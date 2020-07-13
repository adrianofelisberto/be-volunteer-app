import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateVolunteerComponent } from './components/create-volunteer/create-volunteer.component';
import { PrivateComponent } from './private.component';
import { ListVolunteersComponent } from './components/list-volunteers/list-volunteers.component';


const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'create',
        component: CreateVolunteerComponent
      },
      {
        path: 'list',
        component: ListVolunteersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
