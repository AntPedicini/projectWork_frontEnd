import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './event-form/event-form.component';
import { MatBoardComponent } from './mat-board/mat-board.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { TableAutoComponent } from './table-auto/table-auto.component';
import { TableEventComponent } from './table-event/table-event.component';
import { TableMemberComponent } from './table-member/table-member.component';
import { TablePresenceComponent } from './table-presence/table-presence.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch : 'full'},
  {path: 'home', component: MatBoardComponent},

  {path: 'newMember', component: MemberFormComponent},
  {path: 'showMember', component: TableMemberComponent},
  {path: 'showCar', component: TableAutoComponent},

  {path: 'newEvent', component: EventFormComponent},
  {path: 'showEvent', component: TableEventComponent},

  {path: 'newRegistration', component: RegistrationFormComponent},
  {path: 'showPresence', component: TablePresenceComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
