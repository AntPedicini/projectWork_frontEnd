import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './presence-delete.component.html',
  styleUrls: ['./presence-delete.component.css']
})
export class PresenceDeleteComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<PresenceDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void{
    console.log('Eliminato');
  }
}