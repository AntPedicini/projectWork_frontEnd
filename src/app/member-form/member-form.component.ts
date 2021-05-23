import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ServiceSocioService } from '../service-socio.service';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})

export class MemberFormComponent {
  //Socio
  addressForm = this.fb.group({
    tessera: [null, Validators.required],
    validita: [null, Validators.required],
    nome: [null, Validators.required],
    cognome: [null, Validators.required],
    codice_fiscale: [null, Validators.required],
    nato_il: [null, Validators.required],
    email: [null, Validators.required],
    indirizzo: [null, Validators.required],
    citta: [null, Validators.required],
    provincia: [null, Validators.compose([
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
  
  constructor(private fb: FormBuilder,private serviceSocio:ServiceSocioService,public datepipe: DatePipe) {}

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
  }

  onSubmitAuto(): void {
    console.log("Registrazione auto");
    alert('Registrazione auto avvenuta con successo');
    console.log(this.addressForm.value);
  }

//===================
//INSERIMENTO SOCIO
//===================

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
  
}

export class DatepickerOverviewExample {}
function push(result: any): never[] {
  throw new Error('Function not implemented.');
}





