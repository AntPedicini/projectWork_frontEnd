import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ServiceSocioService {

  url = 'http://localhost:8080/socio';

  constructor(private http: HttpClient ) {
    }

    socioGetAll(): Observable<any> {
      return this.http.get(this.url + '/getAll').pipe (map((res: any) => {

        const data = res.map((obj: { id_socio: number; validita: number; nome: string; cognome: string; nato_il: string; codiceFiscale: string; residenza: string; email: string; consiglio: boolean; segretario: boolean; }) => ({
          tessera: obj.id_socio,
          validita: obj.validita,
          nome: obj.nome,
          cognome: obj.cognome,
          nato_il: obj.nato_il,
          codice_fiscale: obj.codiceFiscale,
          indirizzo: obj.residenza,
          email : obj.email,
          consiglio: obj.consiglio,
          segretario: obj.segretario
        }));
        return data;
        
        
       // if (res) {
      //    return res;
      //  }
      //  return null;
     //});
      }));
    
    }
  
}
