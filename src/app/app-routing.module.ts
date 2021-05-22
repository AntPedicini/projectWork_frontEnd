import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './event-form/event-form.component';
import { LoginComponent } from './login/login.component';
import { MatBoardComponent } from './mat-board/mat-board.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { TableAutoComponent } from './table-auto/table-auto.component';
import { TableEventComponent } from './table-event/table-event.component';
import { TableMemberComponent } from './table-member/table-member.component';
import { TablePresenceComponent } from './table-presence/table-presence.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch : 'full'},
  {path: 'home', component: MatBoardComponent, canActivate: [AuthGuard]},

  {path: 'newMember', component: MemberFormComponent, canActivate: [AuthGuard]},
  {path: 'showMember', component: TableMemberComponent,canActivate: [AuthGuard]},
  {path: 'showCar', component: TableAutoComponent, canActivate: [AuthGuard]},

  {path: 'newEvent', component: EventFormComponent, canActivate: [AuthGuard]},
  {path: 'showEvent', component: TableEventComponent,canActivate: [AuthGuard]},

  {path: 'newRegistration', component: RegistrationFormComponent,canActivate: [AuthGuard]},
  {path: 'showPresence', component: TablePresenceComponent,canActivate: [AuthGuard]},

  {path: 'login', component: LoginComponent} //questo l'unico senza il canActivate (senza guardia)
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
