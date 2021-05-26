import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { ServiceAutoService } from 'src/app/service-auto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InfoSocioComponent } from '../../info/info-socio/info-socio.component';
import { TableAutoItem } from 'src/app/table-auto/table-auto-datasource';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './auto-edit.component.html',
  styleUrls: ['./auto-edit.component.css']
})
export class AutoEditComponent {

  autoForm = this.fb.group({
    //Auto
    tessera_socio: [null, Validators.required],
    targa: [null, Validators.required],
    marca: [null, Validators.required],
    modello: [null, Validators.required],
    anno: [null, Validators.required],
    immatricolazione: [null, Validators.required],
    asi: null,
    foto: null
  });

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<AutoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private serviceAuto: ServiceAutoService) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo richiesto' :
        '';
  }

  submit() {
    // emppty stuff
  }

  exit(): void {
    this.dialogRef.close();
  }

  confirmEdit(): void {
    //console.log(this.autoForm.value);
    if(this.autoForm.value.tessera_socio=="")
      this.autoForm.value.tessera_socio=null;
    this.insertAuto(this.autoForm.value);

  }

//=======================
//INSERIMENTO AUTO
//=======================

insertAuto(auto:TableAutoItem): void {

  //=============================Controlli sull'inserimento=======================================

   /*    if(auto.tessera_socio==null)
        auto.tessera_socio=0; */

  //=============================CHIAMATA AL SERVIZIO=======================================

    this.serviceAuto.editAuto( auto ).subscribe(res=>{
        alert('Il veicolo con targa '+ auto.targa +' modificato con successo :D');
      },
      (error:HttpErrorResponse) => {                       //Error callback
        if(error.status==400)
          alert('Qualcosa è andato storto... :(\n Prova a ricontrollare tutti i campi');
        if(error.status==404)
          alert('Qualcosa è andato storto... :(\n Socio associato inesistente ');
       } );
  
  } 

}
