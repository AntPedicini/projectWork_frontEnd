import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceEventoService } from 'src/app/service-evento.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './event-delete.component.html',
  styleUrls: ['./event-delete.component.css']
})
export class EventDeleteComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<EventDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private serviceEvento: ServiceEventoService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void{
    console.log('Eliminato');
    this.deleteEvento(this.data.cod_evento);
  }

  //====================
  //CANCELLAZIONE EVENTO
  //====================

  deleteEvento(cod_evento: number) {
    if (cod_evento == null)
      alert('Devi specificare il Codice Evento da eliminare');
    else {
      //var numberValue = Number(cod_evento);
      console.log(cod_evento);
      this.serviceEvento.deleteEvento(cod_evento).subscribe((res: any) => {
        alert('Evento con ID \''+ cod_evento +'\' eliminato con successo dal database \n NB: Le eventuali iscrizioni associate sono state cancellate :D');

      },
        (error: HttpErrorResponse) => {                       //Error callback
          console.error('error caught in component')
          alert('Qualcosa è andato storto... :(\n Controlla il Codice Evento inserito ');
        });
    }
  }
}
