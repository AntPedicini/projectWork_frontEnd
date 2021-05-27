import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EXAMPLE_DATA as DATI_TABELLA, InfoSocioDataSource, InfoSocioItem } from './info-socio-datasource';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableAutoItem } from 'src/app/table-auto/table-auto-datasource';


@Component({
  selector: 'app-info-socio',
  templateUrl: './info-socio.component.html',
  styleUrls: ['./info-socio.component.css']
})
export class InfoSocioComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<InfoSocioItem>;
  dataSource: InfoSocioDataSource;

  listaAuto: TableAutoItem[]=[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['targa', 'marca', 'modello'];

  constructor(@Inject(MatDialogRef) public dialogRef: MatDialogRef<InfoSocioComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {

    DATI_TABELLA.splice(0, DATI_TABELLA.length);
    this.listaAuto=data.listaAuto;

    this.listaAuto.forEach(element => {
      let infoSocio :InfoSocioItem = new InfoSocioItem();
      infoSocio.targa = element.targa;
      infoSocio.marca = element.marca;
      infoSocio.modello = element.modello;
      DATI_TABELLA.push(infoSocio);
    });

    this.dataSource = new InfoSocioDataSource();

  
    console.log(DATI_TABELLA);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

close(){
  this.dialogRef.close();
}

}
