import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableEventDataSource, TableEventItem } from './table-event-datasource';

import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-table-event',
  templateUrl: './table-event.component.html',
  styleUrls: ['./table-event.component.css']
})
export class TableEventComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableEventItem>;
  dataSource: TableEventDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cod_evento', 'nome_evento', 'data_inizio', 'data_fine', 'location', 'costo_unitario', 'posti_disponibili'];

  constructor() {
    this.dataSource = new TableEventDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
