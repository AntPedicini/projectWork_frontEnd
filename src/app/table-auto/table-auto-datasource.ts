import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';

// TODO: Replace this with your own data model type
export interface TableAutoItem {
  targa: string;
  tessera_socio: number;
  marca: string;
  modello: string;
  anno: number;
  immatricolazione : string;
  ASI: string;
  //foto: Blob;
}

export class TableAutoItem{
  targa!: string;
  tessera_socio!: number;
  marca!: string;
  modello!: string;
  anno!: number;
  immatricolazione!: string;
  ASI!: string;
  //foto: Blob;

  constructor(){}
}



// TODO: replace this with real data from your application
export const EXAMPLE_DATA: TableAutoItem[] = [
/*   {targa:'XXX111XXX', tessera_socio: 1, marca: 'Ferrari', modello: '250 GTO', anno: 1963, immatricolazione: '1970-02-20', ASI:'1111' },
  {targa:'XXX112XXX', tessera_socio: 1, marca: 'Bugatti', modello: 'Type 57SC', anno: 1936, immatricolazione: '1940-06-04', ASI:'1112' },
  {targa:'XXX222XXX', tessera_socio: 2, marca: 'Mercedes', modello: 'W196R', anno: 1954, immatricolazione: '1971-12-30', ASI:'2222' },
  {targa:'XXX333XXX', tessera_socio: 3, marca: 'Ferrari', modello: '275 GTB/4 N.A.R.T', anno: 1967, immatricolazione: '1980-07-02', ASI: '' },
  {targa:'XXX444XXX', tessera_socio: NaN, marca: 'Ferrari', modello: '275 GTB/C Speciale', anno: 1964, immatricolazione: '1975-04-13', ASI: '' } */

];



/**
 * Data source for the TableAuto view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableAutoDataSource extends DataSource<TableAutoItem> {
  data: TableAutoItem[] = EXAMPLE_DATA;
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
  connect(): Observable<TableAutoItem[]> {
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
  private getPagedData(data: TableAutoItem[]): TableAutoItem[] {
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
  private getSortedData(data: TableAutoItem[]): TableAutoItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'targa': return compare(a.targa, b.targa, isAsc);
        case 'tessera_socio': return compare(+a.tessera_socio, +b.tessera_socio, isAsc);
        case 'anno': return compare(+a.anno, +b.anno, isAsc);
        case 'marca': return compare(+a.marca, +b.marca, isAsc);
        case 'immatricolazione': return compare(+a.immatricolazione, +b.immatricolazione, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


function getData(): TableAutoItem[]
{
  return EXAMPLE_DATA;
}