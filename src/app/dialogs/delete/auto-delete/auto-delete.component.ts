import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: './auto-delete.component.html',
  styleUrls: ['./auto-delete.component.css']
})
export class AutoDeleteComponent {

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<AutoDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void{
    console.log('Eliminato');
  }
}
