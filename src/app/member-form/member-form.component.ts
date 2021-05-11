import { Component, NgModule } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
  
})

export class MemberFormComponent {
  //Socio
  addressForm = this.fb.group({
    id_tessera: [null, Validators.required],
    scadenza: [null, Validators.required],
    nome: [null, Validators.required],
    cognome: [null, Validators.required],
    CF: [null, Validators.required],
    data_nascita: [null, Validators.required],
    email: [null, Validators.required],
    indirizzo: [null, Validators.required],
    citta: [null, Validators.required],
    provincia: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(2)])
    ],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    consiglio: null,
    segretario: null,

    //Auto
    targa: [null, Validators.required],
    marca: [null, Validators.required],
    modello: [null, Validators.required],
    anno: [null, Validators.required],
    immatricolazione: [null, Validators.required],
    asi: null
  });

  allComplete: boolean = false;

  hasUnitNumber = false;

  constructor(private fb: FormBuilder) {}

  //Import foto
  onFileSelected(event: any){
    console.log(event);
  }

  //Submit
  onSubmit(): void {
    alert('Socio iscritto con successo');
  }
}

export class DatepickerOverviewExample {}
