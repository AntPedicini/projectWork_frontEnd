import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { ServicePresenceService } from 'src/app/service-presence.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './presence-delete.component.html',
  styleUrls: ['./presence-delete.component.css']
})
export class PresenceDeleteComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<PresenceDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private serviceIscrizioni:ServicePresenceService) { }

              //=========================
  //CANCELLAZIONE ISCRIZIONE
  //=========================

  deleteIscrizione(cod_evento: number, targa: string) {

      this.serviceIscrizioni.deleteIscrizione(cod_evento, targa).subscribe((res: any) => {
        alert('L\'Iscrizione del veicolo con TARGA ' + targa + ' dall\'evento è stata cancellata con successo :D');    
      },
        (error: HttpErrorResponse) => {                       //Error callback
          console.log(error)
          if (error.status == 404)
            alert('Qualcosa è andato storto... :(\n Nessuna iscrizione trovata per il veicolo con targa ' + targa + ' per l\'evento specificato ');
          if (error.status == 400 || error.status == 500)
            alert('Qualcosa è andato storto... :(\n Controlla tutti i campi e riprova')
        });
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void{
    this.deleteIscrizione(this.data.cod_evento,this.data.targa);
    console.log(this.data.cod_evento,this.data.targa);
  }
}