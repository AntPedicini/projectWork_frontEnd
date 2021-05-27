import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableMemberItem } from './table-member/table-member-datasource';


@Injectable({
  providedIn: 'root'
})


export class ServiceSocioService {

  url = 'http://localhost:8080/socio';

  constructor(private http: HttpClient) {
  }

  getAllSocio(): Observable<any> {
    return this.http.get<any>(this.url + '/getAll').pipe(map((res: any) => res));
  }

  insertSocio(newSocio: TableMemberItem): Observable<any> {

    console.log(newSocio);
    return this.http.post<any>(this.url + '/newSocio', newSocio).pipe(map((res: any) => res));
  }

  deleteSocio(id_socio: number): Observable<any> {
    return this.http.delete(this.url + '/' + id_socio).pipe(map((res: any) => res));
  }

  editSocio(socio: TableMemberItem): Observable<any> {
    return this.http.put<any>(this.url + '/' + socio.tessera, socio).pipe(map((res: any) => res));
  }

  addAuto(socio: TableMemberItem): Observable<any> {
    return this.http.put<any>(this.url + '/addNewAuto/' + socio.tessera, socio).pipe(map((res: any) => res));
  }
}
