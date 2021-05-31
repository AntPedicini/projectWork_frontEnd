import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceEventoService } from '../service-evento.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventForm = this.fb.group({
    cod_evento: [null],
    nome_evento: [null, Validators.required],
    data_inizio: [null, Validators.required],
    data_fine: [null, Validators.required],
    costo_unitario: [null, Validators.required],
    posti_disponibili: [null, Validators.required],
    indirizzo: [null, Validators.required],
    citta: [null, Validators.required],
    provincia: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(2)])
    ],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    descrizione: [null, Validators.required]
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder, private serviceEvento: ServiceEventoService, public datepipe: DatePipe, private snackBar: MatSnackBar) { }

  //motodo invocazione servizio REST
  onSubmit(): void {
    this.insertEvento(this.eventForm.value);
  }

  //=======================
  //INSERIMENTO EVENTO
  //=======================

  insertEvento(evento: any): void {

    //=============================Controlli sull'inserimento=======================================
    if (evento.data_inizio != null && evento.data_fine != null) {
      evento.data_inizio = this.datepipe.transform(evento.data_inizio, 'yyyy-MM-dd');
      evento.data_fine = this.datepipe.transform(evento.data_fine, 'yyyy-MM-dd');
    }

    if (evento.indirizzo != null && evento.citta != null && evento.provincia != null && evento.postalCode != null)
      evento.location = evento.indirizzo + ' ' + evento.citta.toUpperCase() + ' ' + evento.postalCode + ' ' + evento.provincia.toUpperCase();

    //=============================CHIAMATA AL SERVIZIO=======================================

    this.serviceEvento.insertEvento(evento).subscribe(res => {
      this.snackBar.open('Evento inserito con successo', 'X', {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreBlue'] });
    },
      (error: HttpErrorResponse) => {                       //Error callback
        console.error('error caught in component')
        this.snackBar.open('Qualcosa è andato storto... Prova a ricontrollare tutti i campi', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
      });

  }

  registrationForm = this.fb.group({
    tessera: [null, Validators.required],
  });

}

