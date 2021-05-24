import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TablePresenceItem } from './table-presence/table-presence-datasource';

@Injectable({
  providedIn: 'root'
})
export class ServicePresenceService {

  url = 'http://localhost:8080/iscrizioni';

  constructor(private http: HttpClient) { }

  getAllIscrizioni(): Observable<any> {
    return this.http.get<any>(this.url + '/getAll').pipe(map((res: any) => res));
  }

  insertIscrizione(newEvent: TablePresenceItem): Observable<any> {

    console.log(newEvent);
    return this.http.post<any>(this.url + '/newIscrizione', newEvent).pipe(map((res: any) => res));
  }

  deleteIscrizione(cod_evento: number, targa: string): Observable<any> {
    return this.http.delete(this.url + '/' + cod_evento + '/' + targa).pipe(map((res: any) => res));
  }

  checkout(iscrizione: TablePresenceItem): Observable<any>{
    return this.http.put( 'http://localhost:8080/checkout', iscrizione ).pipe(map((res:any) => res));

  }
}
