import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './auto-edit.component.html',
  styleUrls: ['./auto-edit.component.css']
})
export class AutoEditComponent {

  autoForm = this.fb.group({
    //Auto
    tessera_socio: [null, Validators.required],
    targa: [null, Validators.required],
    marca: [null, Validators.required],
    modello: [null, Validators.required],
    anno: [null, Validators.required],
    immatricolazione: [null, Validators.required],
    asi: null,
    foto: null
  });

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<AutoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder ) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo richiesto' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    console.log(this.autoForm.value);
  }

}
