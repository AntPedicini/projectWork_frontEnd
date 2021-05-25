import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ServiceSocioService } from '../service-socio.service';
import { DatePipe, formatCurrency } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceAutoService } from '../service-auto.service';
import { MatTableDataSource } from '@angular/material/table';
import { EXAMPLE_DATA } from '../table-member/table-member-datasource';



@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})

export class MemberFormComponent {
  //Socio
  addressForm = this.fb.group({
    tessera_socio: [null, Validators.required],
    validita: [null, Validators.required],
    nome: [null, Validators.required],
    cognome: [null, Validators.required],
    codice_fiscale: [null, Validators.required],
    nato_il: [null, Validators.required],
    email: [null, Validators.required],
    indirizzo: ['', Validators.required],
    citta: ['', Validators.required],
    provincia: ['', Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(2)])
    ],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    consiglio: false,
    segretario: false,

    //Auto
    targa: [null, Validators.required],
    marca: [null, Validators.required],
    modello: [null, Validators.required],
    anno: [null, Validators.required],
    immatricolazione: [null, Validators.required],
    ASI: null,
    foto: null
  });

  allComplete: boolean = false;
  hasUnitNumber = false;
  elenco_tessere: any[] = [];
  selected = null;
  dataSource: any;
  
  constructor(private fb: FormBuilder,private serviceSocio:ServiceSocioService, private serviceAuto:ServiceAutoService, public datepipe: DatePipe) {
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);
    var n:any=null;
    EXAMPLE_DATA.forEach(element => {
      if(element.tessera!=n){
        this.elenco_tessere.push(element.tessera);
        n=element.tessera;
      }
    });
  }

  //Import foto
  //Import 1++ foto
  urls:any[]=[]
  selectFiles(event: any){
    if(event.target.files){
      for(var i=0;i<File.length;i++){
        var reader=new FileReader()
        reader.readAsDataURL(event.target.files[i])
        reader.onload=(event:any)=>{
          this.urls.push(event.target.result)
        }
      }
    }
  }

  //Reset import
  @ViewChild('myInput', { static: false })
  InputVar!: ElementRef;

  reset() {
    this.InputVar.nativeElement.value = "";
    while(this.urls.length!=0){
      this.urls.length--;
    }
  }
  
  //Submit
  onSubmitSocio(): void {
    console.log("Registrazione socio");
    //alert('Registrazione avvenuta con successo');
    console.log(this.addressForm.value);
    this.insertSocio(this.addressForm.value);
    this.addressForm.reset();
  }

  onSubmitAuto(): void {
    console.log("Registrazione auto");
    //alert('Registrazione auto avvenuta con successo');
    console.log(this.addressForm.value);
    this.insertAuto(this.addressForm.value);
  }

//=======================
//INSERIMENTO SOCIO/AUTO
//=======================

  insertSocio(socio:any): void {

  //=============================Controlli sull'inserimento=======================================

      //formatta le date in base alle necessità del backend
      socio.nato_il = this.datepipe.transform(socio.nato_il,'yyyy-MM-dd');
      if(socio.validita == null){
        let thisYear:Date = new Date();
        socio.validita = this.datepipe.transform(thisYear,'yyyy');
      }
      socio.validita = this.datepipe.transform(socio.validita,'yyyy');
      socio.immatricolazione = this.datepipe.transform(socio.immatricolazione,'yyyy-MM-dd');

      //memorizza l'indirizzo in un unica variabile
      if(socio.citta!=null && socio.provincia!=null)
        socio.indirizzo = socio.indirizzo +' '+ socio.citta.toUpperCase() +' '+ socio.postalCode +' '+ socio.provincia.toUpperCase();
      
      //converto il Codice Fiscale e la targa in maiuscolo
      if(socio.codice_fiscale != null)
        socio.codice_fiscale = socio.codice_fiscale.toUpperCase();
      if(socio.targa != null)
        socio.targa= socio.targa.toUpperCase();

  //=============================CHIAMATA AL SERVIZIO=======================================

    this.serviceSocio.insertSocio(socio).subscribe(res=>{
        alert('Socio inserito con successo');
      },
      (error:HttpErrorResponse) => {                       //Error callback
        console.error('error caught in component')
        alert('Qualcosa è andato storto... :(\n Prova a ricontrollare tutti i campi ');
       } );
  
  }

//=======================
//INSERIMENTO SOLO AUTO
//=======================

insertAuto(auto:any): void {

  //=============================Controlli sull'inserimento=======================================

      if(auto.targa != null)
        auto.targa = auto.targa.toUpperCase();
      if(auto.tessera_socio != null){
        var valueNumber = Number(auto.tessera_socio);
        auto.tessera_socio = valueNumber; 
      }
  //=============================CHIAMATA AL SERVIZIO=======================================

    this.serviceAuto.insertAuto( auto ).subscribe(res=>{
        alert('Veicolo inserito con successo');
      },
      (error:HttpErrorResponse) => {                       //Error callback
        console.error('error caught in component')
        alert('Qualcosa è andato storto... :(\n Prova a ricontrollare tutti i campi ');
       } );
  
  }
  
  
}

export class DatepickerOverviewExample {}
function push(result: any): never[] {
  throw new Error('Function not implemented.');
}





