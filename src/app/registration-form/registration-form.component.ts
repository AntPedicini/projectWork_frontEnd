import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceAutoService } from '../service-auto.service';
import { ServiceEventoService } from '../service-evento.service';
import { ServicePresenceService } from '../service-presence.service';
import { TableEventItem } from '../table-event/table-event-datasource';
import { TablePresenceItem } from '../table-presence/table-presence-datasource';
 
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent {
  dataSource: MatTableDataSource<TablePresenceItem> | undefined;
  elenco_eventi: any[] = [];
  elenco_targhe:any[] = [];
  selected = null;
  hasUnitNumber = false;

  eventi:TableEventItem[]=[];

  addressForm = this.fb.group({
    nome_evento: [null, Validators.required],
    targa: [null, Validators.required],
    posti: null,
    partecipanti_iscritti: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, 
              private serviceEvento: ServiceEventoService,
              private serviceAuto:ServiceAutoService,
              private serviceIscrizione:ServicePresenceService,
              private snackBar:MatSnackBar) {
    
    //this.dataSource = new MatTableDataSource(DATA);
    this.getInfoEventi();
    this.getInfoAuto();
    
  }

  onSubmit(): void {
    console.log("Registrazione iscrizione");
    console.log(this.addressForm.value);
    this.insertIscrizione(this.addressForm.value);

  }

  //==================================
  //RECUPERO DATI EVENTI DAL DATABASE (per la select)
  //==================================

  //Metodo per recuperare tutti i dati relativi a un evento e popolare così la tabella iscrizioni
  getInfoEventi() {
    this.serviceEvento.getAllEventi().subscribe((res: any) => {

        this.elenco_eventi = [];
        var n: any = null;
        res.forEach((element : any) => {
          if(element.cod_evento!=n){
            this.elenco_eventi.push(element.nome_evento);
            //sostituisco le informazioni relative ai posti totali con quelle relative ai posti rimanenti fornite dal backend
            element.posti_disponibili=element.posti_rimanenti;
            this.eventi.push(element);
            n=element.cod_evento;
          }
        });
    },
      (error: HttpErrorResponse) => {
        console.log('[[' + error.name + ' || ' + error.message + ']]');
        this.snackBar.open('Nessun Evento presente in database','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});
      }
    );
  }

  //=====================================
  //RECUPERO DATI AUTO DAL DATABASE
  //=====================================

  getInfoAuto(): any {
    this.serviceAuto.getAllAuto().subscribe((res: any) => {

        this.elenco_targhe = [];
        var n: any = null;
        res.forEach((element : any) => {
          if(element.targa!=n){
            this.elenco_targhe.push(element.targa);
            n=element.targa;
          }
        });
    },
      (error: HttpErrorResponse) => {
        console.log('[[' + error.name + ' || ' + error.message + ']]');
        this.snackBar.open('Nessun Auto presente in database','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});
      });
  }

//=======================
//INSERIMENTO ISCRIZIONE
//=======================

insertIscrizione(iscrizione:any): void {

  //=============================Controlli sull'inserimento=======================================

      if(iscrizione.targa != null)
        iscrizione.targa = iscrizione.targa.toUpperCase();
      if(iscrizione.nome_evento != null){

      this.eventi.forEach(element => {
        if(element.nome_evento == iscrizione.nome_evento)
          iscrizione.cod_evento = element.cod_evento;
      });

      iscrizione.partecipanti_effettivi = 0;

      }
  //=============================CHIAMATA AL SERVIZIO=======================================

    this.serviceIscrizione.insertIscrizione( iscrizione ).subscribe(res=>{
        this.snackBar.open('Iscrizione inserita con successo','X', {duration: 5000, horizontalPosition: 'center' ,verticalPosition: 'top' , panelClass: ['coloreBlue']});
        this.addressForm.reset();
        this.getInfoEventi();
        this.getInfoAuto();
      },
      (error:HttpErrorResponse) => {                       //Error callback
        console.error('error caught in component')
        if(error.status==400)
        this.snackBar.open('Qualcosa è andato storto... Iscrizione già presente in database','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});
        if(error.status==404)
        this.snackBar.open('Qualcosa è andato storto... Verifica i dati inseriti','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});
        if(error.status==500)
        this.snackBar.open('Qualcosa è andato storto... Errore Sconosciuto','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});

       } );
  
  }
  
  


  

  //funzione per mostrare i posti liberi rimanenti
  setPostiRimanenti():number{
    let posti_disponibili:number=0;
    this.eventi.forEach(element => {
      
      if(element.nome_evento == this.addressForm.value.nome_evento)
        posti_disponibili = element.posti_disponibili;
    });
    return posti_disponibili;
  }
}
