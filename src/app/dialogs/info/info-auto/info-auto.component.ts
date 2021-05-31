import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ServiceAutoService } from 'src/app/service-auto.service';
import { InfoAutoDataSource, InfoAutoItem } from './info-auto-datasource';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-auto',
  templateUrl: './info-auto.component.html',
  styleUrls: ['./info-auto.component.css']
})
export class InfoAutoComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<InfoAutoItem>;

 
  base64Data: any;
  foto: string;



  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<InfoAutoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceAuto: ServiceAutoService,
    private snackBar: MatSnackBar) {


      this.base64Data = data.foto;
      this.foto = 'data:image/jpg;base64,' + this.base64Data;

  }

  ngAfterViewInit(): void {

  }



  //=====================================
  //RECUPERO FOTO AUTO DAL DATABASE
  //=====================================
   
/*     getPhoto(): any {
      console.log(this.data.targa)
      this.serviceAuto.getPhoto(this.data.targa).subscribe((res: any) => {
  
        console.log(res);
          this.base64Data = res.foto;
          this.foto = 'data:image/jpeg;base64,' + this.base64Data;
        
      },
        (error: HttpErrorResponse) => {
          console.log('[[' + error.name + ' || ' + error.message + ']]');
          this.snackBar.open('Nessuna foto presente in Database', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
        });
    }  */
}
