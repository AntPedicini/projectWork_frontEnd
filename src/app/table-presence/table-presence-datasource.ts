import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


// TODO: Replace this with your own data model type
export interface TablePresenceItem {
  cod_evento: number;
  nome_evento: string;
  targa: string;
  costo_unitario: number;
  posti_disponibili: number;
  partecipanti_iscritti: number;
  partecipanti_effettivi: number;

}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TablePresenceItem[] = [
  { cod_evento: 1, nome_evento: 'GIORNATA NAZIONALE VEICOLI D EPOCA', targa: 'XXX111XXX', costo_unitario: 35.7, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: 3},
  { cod_evento: 1, nome_evento: 'GIORNATA NAZIONALE VEICOLI D EPOCA', targa: 'XXX222XXX', costo_unitario: 35.7, posti_disponibili: 1, partecipanti_iscritti: 2, partecipanti_effettivi: 2},
  { cod_evento: 1, nome_evento: 'GIORNATA NAZIONALE VEICOLI D EPOCA', targa: 'XXX333XXX', costo_unitario: 35.7, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: NaN},
  { cod_evento: 1, nome_evento: 'GIORNATA NAZIONALE VEICOLI D EPOCA', targa: 'XXX444XXX', costo_unitario: 35.7, posti_disponibili: 1, partecipanti_iscritti: 1, partecipanti_effettivi: 1},
  { cod_evento: 2, nome_evento: 'ASI SOLIDALE: RALLY THERAPY', targa: 'XXX111XXX', costo_unitario: 32.9, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: 3},
  { cod_evento: 2, nome_evento: 'ASI SOLIDALE: RALLY THERAPY', targa: 'XXX222XXX', costo_unitario: 32.9, posti_disponibili: 1, partecipanti_iscritti: 2, partecipanti_effettivi: 2},
  { cod_evento: 2, nome_evento: 'ASI SOLIDALE: RALLY THERAPY', targa: 'XXX333XXX', costo_unitario: 32.9, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: NaN},
  { cod_evento: 2, nome_evento: 'ASI SOLIDALE: RALLY THERAPY', targa: 'XXX444XXX', costo_unitario: 32.9, posti_disponibili: 1, partecipanti_iscritti: 1, partecipanti_effettivi: 1},
  { cod_evento: 3, nome_evento: 'XXIII RONDE DELLE ZOLFARE', targa: 'XXX111XXX', costo_unitario: 54.5, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: 3},
  { cod_evento: 3, nome_evento: 'XXIII RONDE DELLE ZOLFARE', targa: 'XXX222XXX', costo_unitario: 54.5, posti_disponibili: 1, partecipanti_iscritti: 3, partecipanti_effettivi: 2},
  { cod_evento: 3, nome_evento: 'XXIII RONDE DELLE ZOLFARE', targa: 'XXX333XXX', costo_unitario: 54.5, posti_disponibili: 1, partecipanti_iscritti: 4, partecipanti_effettivi: NaN},
  { cod_evento: 3, nome_evento: 'XXIII RONDE DELLE ZOLFARE', targa: 'XXX444XXX', costo_unitario: 54.5, posti_disponibili: 1, partecipanti_iscritti: 1, partecipanti_effettivi: 1},
];

function postiDisponibili(){
  var tot: number = 0;
 EXAMPLE_DATA.forEach(element => {
   element.posti_disponibili = Math.random() * 10;
 });
}

/**
 * Data source for the TablePresence view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TablePresenceDataSource extends DataSource<TablePresenceItem> {
  data: TablePresenceItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TablePresenceItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TablePresenceItem[]): TablePresenceItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TablePresenceItem[]): TablePresenceItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'cod_evento': return compare(a.cod_evento, b.cod_evento, isAsc);
        case 'nomeEvento': return compare(+a.nome_evento, b.nome_evento, isAsc);
        case 'targa': return compare(+a.targa, b.targa, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
