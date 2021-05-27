import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyComponentComponent } from './my-component/my-component.component';
import { MatNavComponent } from './mat-nav/mat-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableComponent } from './mat-table/mat-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatBoardComponent } from './mat-board/mat-board.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MemberFormComponent } from './member-form/member-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { TableMemberComponent } from './table-member/table-member.component';
import { TableAutoComponent } from './table-auto/table-auto.component';
import { TableEventComponent } from './table-event/table-event.component';
import { TablePresenceComponent } from './table-presence/table-presence.component';
import { EventFormComponent } from './event-form/event-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { MenuComponent } from './menu/menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { ServiceSocioService } from './service-socio.service';
import { DatePipe } from '@angular/common';
import { ServiceAutoService } from './service-auto.service';
import { ServiceEventoService } from './service-evento.service';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MemberEditComponent } from './dialogs/edit/member-edit/member-edit.component';
import { PresenceEditComponent } from './dialogs/edit/presence-edit/presence-edit.component';
import { AutoEditComponent } from './dialogs/edit/auto-edit/auto-edit.component';
import { EventEditComponent } from './dialogs/edit/event-edit/event-edit.component';
import { AutoDeleteComponent } from './dialogs/delete/auto-delete/auto-delete.component';
import { MemberDeleteComponent } from './dialogs/delete/member-delete/member-delete.component';
import { EventDeleteComponent } from './dialogs/delete/event-delete/event-delete.component';
import { PresenceDeleteComponent } from './dialogs/delete/presence-delete/presence-delete.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { InfoSocioComponent } from './dialogs/info/info-socio/info-socio.component';
import { InfoEventoComponent } from './dialogs/info/info-evento/info-evento.component';
import { InfoAutoComponent } from './dialogs/info/info-auto/info-auto.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';





@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    MatNavComponent,
    MatTableComponent,
    MatBoardComponent,
    MemberFormComponent,
    TableMemberComponent,
    TableAutoComponent,
    TableEventComponent,
    TablePresenceComponent,
    EventFormComponent,
    RegistrationFormComponent,
    MenuComponent,
    LoginComponent,
    MemberEditComponent,
    PresenceEditComponent,
    AutoEditComponent,
    EventEditComponent,
    AutoDeleteComponent,
    MemberDeleteComponent,
    EventDeleteComponent,
    PresenceDeleteComponent,
    InfoSocioComponent,
    InfoEventoComponent,
    InfoAutoComponent
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule
    
  ],
  providers: [
    DatePipe,
    ServiceSocioService,
    ServiceAutoService,
    ServiceEventoService,
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'}],
  
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class DatepickerOverviewExample { }
