import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TablePresenceDataSource, TablePresenceItem } from './table-presence-datasource';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {PresenceEditComponent} from '../dialogs/edit/presence-edit/presence-edit.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';
import { MatDialog } from '@angular/material/dialog';

export const EXAMPLE_DATA: TablePresenceItem[] = [
  { cod_evento: 1, nome_evento: 'GIORNATA NAZIONALE VEICOLI D EPOCA', targa: 'XXX111XXX', costo_unitario: 35.7, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: 3 },
  { cod_evento: 1, nome_evento: 'GIORNATA NAZIONALE VEICOLI D EPOCA', targa: 'XXX222XXX', costo_unitario: 35.7, posti_disponibili: 1, partecipanti_iscritti: 2, partecipanti_effettivi: 2 },
  { cod_evento: 1, nome_evento: 'GIORNATA NAZIONALE VEICOLI D EPOCA', targa: 'XXX333XXX', costo_unitario: 35.7, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: NaN },
  { cod_evento: 1, nome_evento: 'GIORNATA NAZIONALE VEICOLI D EPOCA', targa: 'XXX444XXX', costo_unitario: 35.7, posti_disponibili: 1, partecipanti_iscritti: 1, partecipanti_effettivi: 1 },
  { cod_evento: 2, nome_evento: 'ASI SOLIDALE: RALLY THERAPY', targa: 'XXX111XXX', costo_unitario: 32.9, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: 3 },
  { cod_evento: 2, nome_evento: 'ASI SOLIDALE: RALLY THERAPY', targa: 'XXX222XXX', costo_unitario: 32.9, posti_disponibili: 1, partecipanti_iscritti: 2, partecipanti_effettivi: 2 },
  { cod_evento: 2, nome_evento: 'ASI SOLIDALE: RALLY THERAPY', targa: 'XXX333XXX', costo_unitario: 32.9, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: NaN },
  { cod_evento: 2, nome_evento: 'ASI SOLIDALE: RALLY THERAPY', targa: 'XXX444XXX', costo_unitario: 32.9, posti_disponibili: 1, partecipanti_iscritti: 1, partecipanti_effettivi: 1 },
  { cod_evento: 3, nome_evento: 'XXIII RONDE DELLE ZOLFARE', targa: 'XXX111XXX', costo_unitario: 54.5, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: 3 },
  { cod_evento: 3, nome_evento: 'XXIII RONDE DELLE ZOLFARE', targa: 'XXX222XXX', costo_unitario: 54.5, posti_disponibili: 1, partecipanti_iscritti: 3, partecipanti_effettivi: 2 },
  { cod_evento: 3, nome_evento: 'XXIII RONDE DELLE ZOLFARE', targa: 'XXX333XXX', costo_unitario: 54.5, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: NaN },
  { cod_evento: 3, nome_evento: 'XXIII RONDE DELLE ZOLFARE', targa: 'XXX444XXX', costo_unitario: 54.5, posti_disponibili: 1, partecipanti_iscritti: 1, partecipanti_effettivi: 1 },
];

@Component({
  selector: 'app-table-presence',
  templateUrl: './table-presence.component.html',
  styleUrls: ['./table-presence.component.css']

})
export class TablePresenceComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TablePresenceItem>;
  dataSource: MatTableDataSource<TablePresenceItem>;
  elenco_nomi: String[] = [];
  selected = null;
  presenze: TablePresenceItem[] = [];
  index:number=0;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cod_evento', 'nome_evento', 'targa', 'costo_unitario', 'posti_disponibili', 'partecipanti_iscritti', 'partecipanti_effettivi', 'edit'];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);
    var n:any=null;
    EXAMPLE_DATA.forEach(element => {
      if(element.nome_evento!=n){
        this.elenco_nomi.push(element.nome_evento);
        n=element.nome_evento;
      }
    });
  }
 
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    postiDisponibili();
  }
  //======================================================================
  //Metodi per impostare i filtri nella ricerca
  //======================================================================
  allFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TablePresenceItem, filter: any) => {
      return data.nome_evento.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.cod_evento.toString().trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.targa.trim().toLowerCase().includes(filter.trim().toLowerCase())
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cod_eventoFilter(event: Event) {

    //imposta i campi di ricerca sul quale agisce il filtro
    this.dataSource.filterPredicate = (data: TablePresenceItem, filter: any) => {
      return data.cod_evento.toString().includes(filter);
    };

    //filtra le righe in base al criterio del filterPredicate
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  targaFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TablePresenceItem, filter: any) => {
      return data.targa.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  nome_eventoFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TablePresenceItem, filter: any) => {
      return data.nome_evento.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //======================================================================

  //ReactiveForm
  registrationForm = this.fb.group({
    cod_evento: [null, Validators.required],
    targa: [null, Validators.required],
    partecipanti: [null, Validators.required],
    costo: null
  });

  //======================================================================
  //Metodo per calcolare in tempo reale la quota da pagare per partecipare
  //======================================================================
  setCosto(): string {
    var costoTot: number = 0;
    this.dataSource.data.forEach(element => {
      if (element.cod_evento == this.registrationForm.value.cod_evento)
        costoTot = element.costo_unitario * this.registrationForm.value.partecipanti;
    });
    //console.log(this.registrationForm.value.partecipanti)
    return costoTot.toFixed(2); //Number.toFixed(n:number):string -> converte il numero in una stringa considerando n cifre dopo la virgola
  }
  //======================================================================

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("Funzione registrazione");
    console.log(this.registrationForm.value);
    alert('Submit');
  }

  startEdit(i:number, cod_evento: number, nome_evento: string, targa: string, costo_unitario: number, posti_disponibili: number, partecipanti_iscritti: number, partecipanti_effettivi: number) {
    var presenze:TablePresenceItem={cod_evento: 0, nome_evento: '', targa: '', costo_unitario: 0, posti_disponibili: 0, partecipanti_iscritti: 0, partecipanti_effettivi: 0};
    presenze.cod_evento=cod_evento;
    presenze.nome_evento=nome_evento;
    presenze.targa= targa;
    presenze.costo_unitario= costo_unitario;
    presenze.posti_disponibili= posti_disponibili;
    presenze.partecipanti_iscritti= partecipanti_iscritti;
    presenze.partecipanti_effettivi= partecipanti_effettivi;
    this.index = i;
    console.log(this.index);
    console.log(presenze);
    const dialogRef = this.dialog.open(PresenceEditComponent, {
      data: {cod_evento: cod_evento, nome_evento: nome_evento, targa: targa, costo_unitario: costo_unitario, posti_disponibili: posti_disponibili, partecipanti_iscritti: partecipanti_iscritti, partecipanti_effettivi: partecipanti_effettivi}
    }
  )}

   deleteItem(i: number, cod_evento: number) {
      this.index = i;
      console.log(this.index);
      console.log(cod_evento);
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
       data: {cod_evento:cod_evento}
      }
    )};

}

//======================================================================
//Funzione per calcolare i posti rimanenti in base alle prenotazioni
//======================================================================
function postiDisponibili() {
  //per ogni elemento dei dati in ingresso prendi il numero massimo di partecipanti, sottrai la somma dei partecipanti iscritti
  var tot: number = 0;
  EXAMPLE_DATA.forEach(element => {
    if (element.cod_evento == 1) {
      element.posti_disponibili = 150;
    }
    if (element.cod_evento == 2) {
      element.posti_disponibili = 62;
    }
    if (element.cod_evento == 3) {
      element.posti_disponibili = 132;
    }
  });

}
//======================================================================

