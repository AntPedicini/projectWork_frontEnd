import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ServiceAutoService } from 'src/app/service-auto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './auto-delete.component.html',
  styleUrls: ['./auto-delete.component.css']
})
export class AutoDeleteComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<AutoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceAuto: ServiceAutoService,
    private snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log(this.data.targa);
    this.deleteAuto(this.data.targa);
  }

  //====================
  //CANCELLAZIONE AUTO
  //====================

  deleteAuto(targa: string) {
    if (targa == null)
      this.snackBar.open('Devi specificare la Targa del veicolo', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
    else {
      console.log(targa);
      this.serviceAuto.deleteAuto(targa).subscribe((res: any) => {
        this.snackBar.open('Veicolo con TARGA \'' + targa + '\' eliminato con successo dal database  NB: Tutte le eventuali iscrizioni del veicolo ad eventi rimosse', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreBlue'] });
      },
        (error: HttpErrorResponse) => {                       //Error callback
          console.error('error caught in component')
          this.snackBar.open('Qualcosa è andato storto... Controlla la TARGA inserita ', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
        });
    }
  }
}
