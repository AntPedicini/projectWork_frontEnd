import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent {

  eventForm = this.fb.group({
    cod_evento: [null, Validators.required],
    nome_evento: [null, Validators.required],
    data_inizio: [null, Validators.required],
    data_fine: [null, Validators.required],
    costo_unitario: [null, Validators.required],
    posti_disponibili: [null, Validators.required],
    location: [null, Validators.required],
    descrizione: [null, Validators.required]
  });

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<EventEditComponent>,
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
    console.log(this.eventForm.value);
  }
}
