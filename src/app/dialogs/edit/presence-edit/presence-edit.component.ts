  
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: './presence-edit.component.html',
  styleUrls: ['./presence-edit.component.css']
})
export class PresenceEditComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<PresenceEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    console.log("Editato");
  }
}