  
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './presence-edit.component.html',
  styleUrls: ['./presence-edit.component.css']
})
export class PresenceEditComponent {

  registrationForm = this.fb.group({
    nome_evento: [null, Validators.required],
    targa: [null, Validators.required],
    partecipanti_effettivi: null,
    partecipanti_iscritti: [null, Validators.required],
    posti_disponibili: [null]
  });

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<PresenceEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) { }

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
    console.log(this.registrationForm.value);
  }
}