import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceSocioService } from 'src/app/service-socio.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './member-delete.component.html',
  styleUrls: ['./member-delete.component.css']
})
export class MemberDeleteComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<MemberDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceSocio: ServiceSocioService,
    private snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log('Eliminato');
    this.deleteSocio(this.data.tessera);
  }

  //====================
  //CANCELLAZIONE SOCIO
  //====================

  deleteSocio(id_socio: number) {
    if (id_socio == null)
      this.snackBar.open('Devi specificare il numero TESSERA del socio', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });

    else {
      var numberValue = Number(id_socio);
      console.log(numberValue);
      this.serviceSocio.deleteSocio(numberValue).subscribe((res: any) => {
        this.snackBar.open('Socio con TESSERA \'' + numberValue + '\' eliminato con successo dal database NB: Le eventuali auto associate non sono state cancellate', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreBlue'] });

      },
        (error: HttpErrorResponse) => {                       //Error callback
          if (error.status == 404)
            this.snackBar.open('Qualcosa è andato storto... Socio con TESSERA ' + numberValue + ' non presente in database ', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
          if (error.status == 400)
            this.snackBar.open('Qualcosa è andato storto... Controlla idati inseriti e riprova', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
        });
    }
  }
}
