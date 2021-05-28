
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceSocioService } from 'src/app/service-socio.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    indirizzo: ['', Validators.required],
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
    private fb: FormBuilder,
    private snackBar:MatSnackBar) { }

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
      this.snackBar.open('Socio modificato con successo','X', {duration: 5000, horizontalPosition: 'center' ,verticalPosition: 'top' , panelClass: ['coloreBlue']});
    },
      (error: HttpErrorResponse) => {                       //Error callback
        if (error.status == 400 || error.status == 404)
        this.snackBar.open('Qualcosa è andato storto... Prova a ricontrollare tutti i campi','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});
      });

  }
}