import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  addressForm = this.fb.group({
    id_evento: [null, Validators.required],
    nome: [null, Validators.required],
    data: [null, Validators.required],
    costo: [null, Validators.required],
    posti: [null, Validators.required],
    indirizzo: [null, Validators.required],
    citta: [null, Validators.required],
    provincia: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(2)])
    ],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    descrizione: [null, Validators.required]
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    console.log("Registrazione evento");
    alert('Evento registrato con successo');
    console.log(this.addressForm.value);
  }

  onUpdate(): void {
    console.log("Update evento");
    alert('Update avvenuto con successo');
    console.log(this.addressForm.value);
  }
}
