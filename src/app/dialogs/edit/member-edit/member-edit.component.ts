  
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { ServiceSocioService } from 'src/app/service-socio.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-baza.dialog',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent {

  memberForm = this.fb.group({
    tessera_socio: [{value : null, disable : true }],
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
              privateserviceSocio:ServiceSocioService,
              private fb: FormBuilder ) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
   
console.log(this.memberForm.value);

  }
}