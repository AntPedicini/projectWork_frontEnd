import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EXAMPLE_DATA, TableAutoDataSource, TableAutoItem } from './table-auto-datasource';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { auto } from '../_models/auto.model';
import { ServiceAutoService } from '../service-auto.service';
import { AutoEditComponent } from '../dialogs/edit/auto-edit/auto-edit.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';
import { MatDialog } from '@angular/material/dialog';
//import { auto } from '../_models/auto.model';

@Component({
  selector: 'app-table-auto',
  templateUrl: './table-auto.component.html',
  styleUrls: ['./table-auto.component.css']
})
export class TableAutoComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableAutoItem>;
  dataSource: MatTableDataSource<TableAutoItem>;
  elenco_targhe: any[] = [];
  selected = null;
  auto: TableAutoItem[] = [];
  index:number=0;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['targa', 'tessera_socio', 'marca', 'modello', 'anno', 'immatricolazione', 'ASI', 'edit'];


  constructor(private fb: FormBuilder, private serviceAuto: ServiceAutoService, private dialog: MatDialog) {

    this.getAllAuto();
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  //=====================================
  //RECUPERO DATI AUTO DAL DATABASE
  //=====================================

  getAllAuto(): any {
    EXAMPLE_DATA.splice(0, EXAMPLE_DATA.length);
    this.serviceAuto.getAllAuto().subscribe((res: any) => {

      res.forEach((element: TableAutoItem) => {
        EXAMPLE_DATA.push(element);
        this.auto = res;
      });
      console.log(this.auto);
      this.refreshTable();
      this.refreshSelect();
    },
      (error: HttpErrorResponse) => {
        console.log('[[' + error.name + ' || ' + error.message + ']]');
        alert('Nessuna auto presente in database');
        this.refreshTable();
      });
  }

  //====================
  //CANCELLAZIONE AUTO
  //====================

  deleteAuto(targa: string) {
    if (targa == null)
      alert('Devi specificare la Targa del veicolo');
    else {
      console.log(targa);
      this.serviceAuto.deleteAuto( targa ).subscribe((res: any) => {
        alert('Veicolo con TARGA \''+ targa +'\' eliminato con successo dal database \n NB: Tutte le eventuali iscrizioni del veicolo ad eventi rimosse. :D');
        this.getAllAuto();

      },
        (error: HttpErrorResponse) => {                       //Error callback
          console.error('error caught in component')
          alert('Qualcosa è andato storto... :(\n Controlla la TARGA inserita ');
        });
    }
  }

  //Metodo per refreshare la tabella
  private refreshTable() {
    // if there's nothing in filter
    if (this.dataSource.filter === '') {
      this.dataSource.filter = ' ';
      this.dataSource.filter = '';
    } else {
      // if there's something, we make a simple change and then put back old value
      this.dataSource.filter = '';
      this.dataSource.filter = this.dataSource.filter.valueOf();
    }
  }
  //Metodo per refreshare la select che mostra le targhe
  refreshSelect() {
    this.elenco_targhe = [];
    var n: any = null;
    EXAMPLE_DATA.forEach(element => {
      if (element.targa != n) {
        this.elenco_targhe.push(element.targa);
        n = element.targa;
      }
    });
  }

  tesseraFilter(event: Event) {

    //imposta i campi di ricerca sul quale agisce il filtro
    this.dataSource.filterPredicate = (data: TableAutoItem, filter: any) => {
      return data.tessera_socio.toString().includes(filter);
    };

    //filtra le righe in base al criterio del filterPredicate
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  allFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableAutoItem, filter: any) => {
      return data.targa.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.tessera_socio.toString().trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.ASI.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.anno.toString().trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.immatricolazione.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.marca.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.modello.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  targaFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableAutoItem, filter: any) => {
      return data.targa.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  annoFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableAutoItem, filter: any) => {
      return data.anno.toString().trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ASIFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableAutoItem, filter: any) => {
      return data.ASI.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  registrationForm = this.fb.group({
    targa: [null, Validators.required],
  });

  setActive(auto:any){
    console.log(auto.foto);
  }

  startEdit(i:number, targa: string, tessera_socio: number, marca:string, modello: string, anno: number, immatricolazione: string, ASI: string) {
    var auto:TableAutoItem={targa: '', tessera_socio: 0, marca:'', modello: '', anno: 0, immatricolazione: '', ASI: ''};
    auto.targa=targa;
    auto.tessera_socio=tessera_socio;
    auto.marca= marca;
    auto.modello= modello;
    auto.anno= anno;
    auto.immatricolazione= immatricolazione;
    auto.ASI= ASI;
    this.index = i;
    console.log(this.index);
    console.log(auto);
    const dialogRef = this.dialog.open(AutoEditComponent, {
      data: {targa: targa, tessera_socio: tessera_socio, marca: marca, modello: modello, anno: anno, immatricolazione: immatricolazione, ASI: ASI}
    }
  )}

   deleteItem(i: number, targa: string) {
      this.index = i;
      console.log(this.index);
      console.log(targa);
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
       data: {targa:targa}
      }
    )};

}


