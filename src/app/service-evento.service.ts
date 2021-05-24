import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableEventItem } from './table-event/table-event-datasource';

@Injectable({
  providedIn: 'root'
})
export class ServiceEventoService {

  url = 'http://localhost:8080/raduno';

  constructor(private http: HttpClient) { }

  getAllEventi(): Observable<any> {
    return this.http.get<any>(this.url + '/getAll').pipe(map((res: any) => res));
 }

 insertEvento( newEvent:TableEventItem): Observable<any> {

  console.log(newEvent);
  return this.http.post<any>(this.url+'/newRaduno', newEvent).pipe(map((res: any) => res));
} 

deleteEvento(id_evento:number):Observable<any>{
  return this.http.delete(this.url +'/'+ id_evento).pipe(map((res: any)=> res));
}

}
