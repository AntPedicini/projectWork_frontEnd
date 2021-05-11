import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TablePresenceDataSource, TablePresenceItem } from './table-presence-datasource';

const EXAMPLE_DATA: TablePresenceItem[] = [
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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cod_evento', 'nome_evento', 'targa', 'costo_unitario', 'posti_disponibili', 'partecipanti_iscritti', 'partecipanti_effettivi'];

  constructor() {
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    postiDisponibili();
  }


}

function postiDisponibili() {
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