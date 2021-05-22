import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';
import { Socio, TableMemberItem } from './table-member/table-member-datasource';


@Injectable({
  providedIn: 'root'
})


export class ServiceSocioService {

  url = 'http://localhost:8080/socio';

  constructor(private http: HttpClient) {
  }

  socioGetAll(): Observable<any> {
     return this.http.get<any>(this.url + '/getAll').pipe(map((res: any) => {

      const data = res.map((obj: Socio ) => ({

      //mappo la response secondo le mie esigenze rinominando i campi come i nomi delle colonne delle tabelle
        tessera: obj.id_socio,
        validita: obj.validita,
        nome: obj.nome,
        cognome: obj.cognome,
        nato_il: obj.nato_il,
        codice_fiscale: obj.codiceFiscale,
        indirizzo: obj.residenza,
        email: obj.email,
        consiglio: obj.consiglio,
        segretario: obj.segretario 
      }));
      return data;
    }));
  }

   insertSocio(socio:TableMemberItem): Observable<any> {

    let newSocio = new Socio(socio);
    console.log(newSocio);
    return this.http.post<any>('http://localhost:8080/socio/newSocio', newSocio).pipe(map((res: any) => res));
  
  } 
}
