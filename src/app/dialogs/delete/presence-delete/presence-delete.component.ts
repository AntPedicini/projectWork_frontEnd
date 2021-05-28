import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ServicePresenceService } from 'src/app/service-presence.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './presence-delete.component.html',
  styleUrls: ['./presence-delete.component.css']
})
export class PresenceDeleteComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<PresenceDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceIscrizioni: ServicePresenceService,
    private snackBar: MatSnackBar) { }

  //=========================
  //CANCELLAZIONE ISCRIZIONE
  //=========================

  deleteIscrizione(cod_evento: number, targa: string) {

    this.serviceIscrizioni.deleteIscrizione(cod_evento, targa).subscribe((res: any) => {
      this.snackBar.open('L\'Iscrizione del veicolo con TARGA ' + targa + ' dall\'evento è stata cancellata con successo', 'X', {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreBlue'] });
    },
      (error: HttpErrorResponse) => {                       //Error callback
        console.log(error)
        if (error.status == 404)
          this.snackBar.open('Qualcosa è andato storto... Nessuna iscrizione trovata per il veicolo con targa ' + targa + ' per l\'evento specificato', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
        if (error.status == 400 || error.status == 500)
          this.snackBar.open('Qualcosa è andato storto... Controlla tutti i campi e riprova', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
      });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.deleteIscrizione(this.data.cod_evento, this.data.targa);
    console.log(this.data.cod_evento, this.data.targa);
  }
}