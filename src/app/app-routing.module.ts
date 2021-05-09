import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatBoardComponent } from './mat-board/mat-board.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch : 'full'},
  {path: 'home', component: MatBoardComponent}

  /*
  {path: 'newMember', component: MatForm}
  {path: 'showMember', component: MatTable}
  {path: 'showCar', component: MatTable}

  {path: 'newEvent', component: MatForm}
  {path: 'showEvent', component: MatTable}

  {path: 'newRegistration', component: MatForm}
  {path: 'showPresence', component: MatTable}
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
