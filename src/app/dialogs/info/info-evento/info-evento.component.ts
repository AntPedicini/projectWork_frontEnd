import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { InfoEventoDataSource, InfoEventoItem } from './info-evento-datasource';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-evento',
  templateUrl: './info-evento.component.html',
  styleUrls: ['./info-evento.component.css']
})
export class InfoEventoComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<InfoEventoItem>;
  dataSource: InfoEventoDataSource;

  descrizione:string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<InfoEventoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource = new InfoEventoDataSource();



    console.log(data);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.table.dataSource = this.dataSource;
  }
}
