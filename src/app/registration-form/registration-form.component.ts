import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent {
  addressForm = this.fb.group({
    nome: [null, Validators.required],
    id_evento: [null, Validators.required],
    targa: [null, Validators.required],
    posti: null,
    iscritti: [null, Validators.required]
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder) {}

  selected = null;

  onSubmit(): void {
    alert('Iscrizione avvenuta con successo');
  }
}
