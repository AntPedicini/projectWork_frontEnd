import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceSocioService } from 'src/app/service-socio.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './member-delete.component.html',
  styleUrls: ['./member-delete.component.css']
})
export class MemberDeleteComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<MemberDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private serviceSocio:ServiceSocioService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void{
    console.log('Eliminato');
    this.deleteSocio(this.data.tessera);
  }

  //====================
  //CANCELLAZIONE SOCIO
  //====================

  deleteSocio(id_socio: number) {
    if (id_socio == null)
      alert('Devi specificare il numero TESSERA del socio');
    else {
      var numberValue = Number(id_socio);
      console.log(numberValue);
      this.serviceSocio.deleteSocio(numberValue).subscribe((res: any) => {
        alert('Socio con TESSERA \''+ numberValue +'\' eliminato con successo dal database \n NB: Le eventuali auto associate non sono state cancellate :D');
      },
        (error: HttpErrorResponse) => {                       //Error callback
          if(error.status == 404)
            alert('Qualcosa è andato storto... :(\n Socio con TESSERA '+numberValue+' non presente in database ');
          if(error.status == 400)
            alert('Qualcosa è andato storto... :(\n Controlla idati inseriti e riprova ');
        });
    }
  }
}
