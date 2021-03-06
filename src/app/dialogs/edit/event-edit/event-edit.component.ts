import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceEventoService } from 'src/app/service-evento.service';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent {

  eventForm = this.fb.group({
    cod_evento: [null, Validators.required],
    nome_evento: [null, Validators.required],
    data_inizio: [null, Validators.required],
    data_fine: [null, Validators.required],
    costo_unitario: [null, Validators.required],
    posti_disponibili: [null, Validators.required],
    location: [null, Validators.required],
    descrizione: [null, Validators.required]
  });

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<EventEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private serviceEvento: ServiceEventoService) { } 

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  submit() {
    // emppty stuff
  }

  exit(): void {
    this.dialogRef.close();
  }

  confirmEdit(): void {
    console.log(this.eventForm.value);
    this.editEvento(this.eventForm.value);
    
  }

  
  //=======================
  //INSERIMENTO EVENTO
  //=======================

  editEvento(evento: any): void {

    //=============================Controlli sull'inserimento=======================================

    if(evento.indirizzo!=null&&evento.citta!=null&&evento.provincia!=null&&evento.postalCode!=null)
      evento.location = evento.indirizzo+' '+evento.citta.toUpperCase()+' '+evento.postalCode+' '+evento.provincia.toUpperCase();

    //=============================CHIAMATA AL SERVIZIO=======================================

    this.serviceEvento.editEvento(evento).subscribe(res => {
      alert('Evento '+evento.nome_evento+' modificato con successo :D');
    },
      (error: HttpErrorResponse) => {                       //Error callback
        console.error('error caught in component')
        alert('Qualcosa ?? andato storto... :(\n Prova a ricontrollare tutti i campi ');
      });

  }
}
