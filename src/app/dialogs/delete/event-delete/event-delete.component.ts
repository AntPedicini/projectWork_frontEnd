import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceEventoService } from 'src/app/service-evento.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './event-delete.component.html',
  styleUrls: ['./event-delete.component.css']
})
export class EventDeleteComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<EventDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private serviceEvento: ServiceEventoService,
              private popError:MatSnackBar) { }

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
      this.popError.open('Devi specificare il Codice Evento da eliminare','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});
    else {
      //var numberValue = Number(cod_evento);
      console.log(cod_evento);
      this.serviceEvento.deleteEvento(cod_evento).subscribe((res: any) => {
        this.popError.open('Evento con ID \''+ cod_evento +'\' eliminato con successo dal database \n NB: Le eventuali iscrizioni associate sono state cancellate :D','X', {horizontalPosition: 'center' ,verticalPosition: 'top' , panelClass: ['coloreBlue']});

      },
        (error: HttpErrorResponse) => {                       //Error callback
          console.error('error caught in component')
          this.popError.open('Qualcosa è andato storto... Controlla il Codice Evento inserito','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});
        });
    }
  }
}
