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
  elenco_nomi: String[] = [];
  selected = null;

  constructor(private fb: FormBuilder) {
    
  }

  

  onSubmit(): void {
    alert('Iscrizione avvenuta con successo');
  }
}
