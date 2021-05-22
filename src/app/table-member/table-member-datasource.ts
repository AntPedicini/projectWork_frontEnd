import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


// TODO: Replace this with your own data model type
export interface TableMemberItem {
  tessera: number;
  validita: number;
  nome: string;
  cognome: string;
  nato_il: string;
  codice_fiscale: string;
  indirizzo: string;
  email: string;
  consiglio: boolean;
  segretario: boolean;
}

export interface Socio {
  id_socio: number;
  validita: number;
  nome: string;
  cognome: string;
  nato_il: string;
  codiceFiscale: string;
  indirizzo: string;
  email: string;
  consiglio: boolean;
  segretario: boolean;
}

export class TableMemberItem {
  tessera!: number;
  validita!: number;
  nome!: string;
  cognome!: string;
  nato_il!: string;
  codice_fiscale!: string;
  indirizzo!: string;
  email!: string;
  consiglio!: boolean;
  segretario!: boolean;

  constructor(){}
}


export class Socio {
  id_socio!: number;
  validita!: number;
  nome!: string;
  cognome!: string;
  nato_il!: string;
  codiceFiscale!: string;
  residenza!: string;
  email!: string;
  consiglio!: boolean;
  segretario!: boolean;
  id_auto!:string;

  constructor(obj:TableMemberItem){
    this.id_socio= obj.tessera;
    this.validita=obj.validita;
    this.nome=obj.nome;
    this.cognome=obj.cognome;
    this.nato_il=obj.nato_il;
    this.codiceFiscale=obj.codice_fiscale;
    this.residenza=obj.indirizzo;
    this.email=obj.email;
    this.consiglio=obj.consiglio;
    this.segretario=obj.segretario;
    this.id_auto='';
    
  }

  toTableItem(res:any):TableMemberItem {
    let tableItem:TableMemberItem = {
      tessera: res.id_socio,
      validita: res.validita,
      nome: res.nome,
      cognome: res.cognome,
      nato_il: res.nato_il,
      codice_fiscale: res.codiceFiscale,
      indirizzo: res.residenza,
      email: res.email,
      consiglio: res.consiglio,
      segretario: res.segretario,
    };


    return tableItem;
  }


}

// TODO: replace this with real data from your application
 export const EXAMPLE_DATA: TableMemberItem[] = [
 /*  {tessera: 1, validita: 2021, nome: 'John', cognome: 'Doe', nato_il: '1986-02-15', codice_fiscale: 'XXXXXXXXXXXXXXXX', indirizzo:'VI', email: 'john.doe@anticheglorie.com', consiglio: true, segretario: true},
  {tessera: 2, validita: 2021, nome: 'Bill', cognome: 'Smith', nato_il: '1980-05-23', codice_fiscale: 'YYYYYYYYYYYYYYYY', indirizzo:'PD', email: 'bill.smith@anticheglorie.com', consiglio: true, segretario: false},
  {tessera: 3, validita: 2021, nome: 'Lucy', cognome: 'Flowers', nato_il: '1990-11-03', codice_fiscale: 'ZZZZZZZZZZZZZZZ', indirizzo:'MI', email: 'lucy.flowers@anticheglorie.com', consiglio: false, segretario: false} */

]; 

/**
 * Data source for the TableMember view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableMemberDataSource extends DataSource<TableMemberItem> {
  data: TableMemberItem[] = EXAMPLE_DATA;
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
  connect(): Observable<TableMemberItem[]> {
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
  private getPagedData(data: TableMemberItem[]): TableMemberItem[] {
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
  private getSortedData(data: TableMemberItem[]): TableMemberItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'tessera': return compare(a.tessera, b.tessera, isAsc);
        case 'nome': return compare(+a.nome, +b.nome, isAsc);
        case 'cognome': return compare(+a.cognome, +b.cognome, isAsc);
        case 'codice_fiscale': return compare(+a.codice_fiscale, +b.codice_fiscale, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
