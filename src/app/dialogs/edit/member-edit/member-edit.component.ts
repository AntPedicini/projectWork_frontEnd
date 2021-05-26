
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceSocioService } from 'src/app/service-socio.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-baza.dialog',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent {

  memberForm = this.fb.group({
    tessera: [{ value: null, disable: true }],
    validita: [null, Validators.required],
    nome: [null, Validators.required],
    cognome: [null, Validators.required],
    codice_fiscale: [null, Validators.required],
    nato_il: [null, Validators.required],
    email: [null, Validators.required],
    residenza: ['', Validators.required],
    citta: ['', Validators.required],
    provincia: ['', Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(2)])
    ],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    consiglio: false,
    segretario: false
  });


  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<MemberEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceSocio: ServiceSocioService,
    private fb: FormBuilder) { }

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

    console.log(this.memberForm.value);
    this.editSocio(this.memberForm.value);

  }

  //=======================
  //MODIFICA SOCIO
  //=======================

  editSocio(socio: any): void {

    //=============================Controlli sull'inserimento=======================================

    //converto il Codice Fiscale e la targa in maiuscolo
    if (socio.codice_fiscale != null)
      socio.codice_fiscale = socio.codice_fiscale.toUpperCase();

    //=============================CHIAMATA AL SERVIZIO=======================================

    this.serviceSocio.editSocio(socio).subscribe(res => {
      alert('Socio modificato con successo');
    },
      (error: HttpErrorResponse) => {                       //Error callback
        if (error.status == 400)
          alert('Qualcosa è andato storto... :(\n Prova a ricontrollare tutti i campi ');
        if (error.status == 404)
          alert('Qualcosa è andato storto... :(\n Prova a ricontrollare tutti i campi ');
      });

  }
}