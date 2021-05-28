
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ServicePresenceService } from 'src/app/service-presence.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './presence-edit.component.html',
  styleUrls: ['./presence-edit.component.css']
})
export class PresenceEditComponent {

  cod_evento: number = 0;

  registrationForm = this.fb.group({
    nome_evento: [null, Validators.required],
    targa: [null, Validators.required],
    partecipanti_effettivi: null,
    partecipanti_iscritti: [null, Validators.required],
    posti_disponibili: [null]
  });

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<PresenceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private serviceIscrizione: ServicePresenceService,
    private snackBar: MatSnackBar) { }

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

    console.log(this.registrationForm.value);
    this.editIscrizione(this.registrationForm.value);
  }


  //=======================
  //INSERIMENTO ISCRIZIONE
  //=======================

  editIscrizione(iscrizione: any): void {

    //=============================Controlli sull'inserimento=======================================
    if (iscrizione.targa != null)
      iscrizione.targa = iscrizione.targa.toUpperCase();

    iscrizione.cod_evento = this.data.cod_evento;
    iscrizione.targa = this.data.targa;

    //=============================CHIAMATA AL SERVIZIO=======================================

    this.serviceIscrizione.editIscrizione(iscrizione).subscribe(res => {
      this.snackBar.open('Iscrizione modificata con successo', 'X', {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreBlue'] });
    },
      (error: HttpErrorResponse) => {                       //Error callback
        console.error('error caught in component')
        if (error.status == 404)
          this.snackBar.open('Qualcosa è andato storto... Verifica i dati inseriti', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
        if (error.status == 500)
          this.snackBar.open('Qualcosa è andato storto... Errore Sconosciuto', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
      });
  }
}