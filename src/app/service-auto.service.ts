import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableAutoItem } from './table-auto/table-auto-datasource';


@Injectable({
  providedIn: 'root'
})
export class ServiceAutoService {

  url = 'http://localhost:8080/auto';

  constructor(private http:HttpClient) { 
  }

  getAllAuto(): Observable<any>{
    return this.http.get<any>(this.url+'/getAll').pipe(map((res:any)=> res));
  }

  insertAuto( newAuto:TableAutoItem): Observable<any> {

    console.log(newAuto);
    return this.http.post<any>(this.url+'/newAuto', newAuto).pipe(map((res: any) => res));
  } 

  deleteAuto(targa:string):Observable<any>{
    return this.http.delete(this.url +'/'+ targa).pipe(map((res: any)=> res));
  }

}
