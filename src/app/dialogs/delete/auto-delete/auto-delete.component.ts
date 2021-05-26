import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { ServiceAutoService } from 'src/app/service-auto.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './auto-delete.component.html',
  styleUrls: ['./auto-delete.component.css']
})
export class AutoDeleteComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<AutoDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private serviceAuto :ServiceAutoService ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void{
    console.log(this.data.targa);
    this.deleteAuto(this.data.targa);
  }

  //====================
  //CANCELLAZIONE AUTO
  //====================

  deleteAuto(targa: string) {
    if (targa == null)
      alert('Devi specificare la Targa del veicolo');
    else {
      console.log(targa);
      this.serviceAuto.deleteAuto( targa ).subscribe((res: any) => {
        alert('Veicolo con TARGA \''+ targa +'\' eliminato con successo dal database \n NB: Tutte le eventuali iscrizioni del veicolo ad eventi rimosse. :D');
      },
        (error: HttpErrorResponse) => {                       //Error callback
          console.error('error caught in component')
          alert('Qualcosa è andato storto... :(\n Controlla la TARGA inserita ');
        });
    }
  }
}
