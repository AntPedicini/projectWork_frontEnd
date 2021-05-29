import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ServiceSocioService } from '../service-socio.service';
import { DatePipe, formatCurrency } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceAutoService } from '../service-auto.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})

export class MemberFormComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Socio
  memberForm = this.fb.group({
    validita: [null],
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
    targa_esistente: ['--', Validators.required],

    //Auto
    targa: [null],
    marca: [null],
    modello: [null],
    anno: [null],
    immatricolazione: [null],
    ASI: null,
    foto: null
  });

  autoForm = this.fb.group({
    tessera_socio: [null],
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
  elenco_targhe: any = [];
  selected = '--';
  ospite = 0;
  dataSource: any;

  constructor(private fb: FormBuilder, private serviceSocio: ServiceSocioService, private serviceAuto: ServiceAutoService, public datepipe: DatePipe, private snackBar: MatSnackBar) {
    this.getInfoAuto();
    this.getInfoSocio();

    console.log(this.memberForm.value);
  }

  //Import foto
  //Import 1++ foto
  urls: any[] = []
  selectFiles(event: any) {
    if (event.target.files) {
      for (var i = 0; i < File.length; i++) {
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[i])
        reader.onload = (event: any) => {
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
    while (this.urls.length != 0) {
      this.urls.length--;
    }
  }

  //Submit
  onSubmitSocio(): void {
    console.log("Registrazione socio");
    //console.log(this.addressForm.value);
    this.insertSocio(this.memberForm.value);
    //this.addressForm.reset();
  }

  onSubmitAuto(): void {
    console.log("Registrazione auto");
    //alert('Registrazione auto avvenuta con successo');
    //console.log(this.addressForm.value);
    this.insertAuto(this.autoForm.value);
  }

  click() {
    console.log(this.memberForm.get('targa_esistente').value);
  }


  //=======================
  //INSERIMENTO SOCIO/AUTO
  //=======================

  insertSocio(socio: any): void {

    //=============================Controlli sull'inserimento=======================================

    //formatta le date in base alle necessità del backend
    socio.nato_il = this.datepipe.transform(socio.nato_il, 'yyyy-MM-dd');
    if (socio.validita == null) {
      let thisYear: Date = new Date();
      socio.validita = this.datepipe.transform(thisYear, 'yyyy');
    }
    socio.validita = this.datepipe.transform(socio.validita, 'yyyy');
    socio.immatricolazione = this.datepipe.transform(socio.immatricolazione, 'yyyy-MM-dd');

    //memorizza l'indirizzo in un unica stringa
    if (socio.citta != null && socio.provincia != null)
      socio.indirizzo = socio.indirizzo + ' ' + socio.citta.toUpperCase() + ' ' + socio.postalCode + ' ' + socio.provincia.toUpperCase();

    //se è stata selezionata una targa dalla select imposto la targa giusta nel DTO da mandare al backend
    if (socio.targa_esistente != '--')
      socio.targa = socio.targa_esistente;

    //=============================CHIAMATA AL SERVIZIO=======================================

    this.serviceSocio.insertSocio(socio).subscribe(res => {
      this.snackBar.open('Socio inserito con successo', 'X', {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreBlue'] });
    },
      (error: HttpErrorResponse) => {                 
        if (error.status == 400 || error.status == 404)
          this.snackBar.open('Qualcosa è andato storto... Prova a ricontrollare tutti i campi NB:Verifica che la targa inserita non appartenente a un altro socio', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });

      });

  }

  //=======================
  //INSERIMENTO SOLO AUTO
  //=======================

  insertAuto(auto: any): void {

    //=============================Controlli sull'inserimento=======================================

    //se selezionato ospite imposto la tessera a zero, il backend fa il resto ;)
    if (auto.tessera_socio == "Ospite")
      auto.tessera_socio = 0;

    //=============================CHIAMATA AL SERVIZIO=======================================

    this.serviceAuto.insertAuto(auto).subscribe(res => {
      this.snackBar.open('Veicolo inserito con successo', 'X', {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreBlue'] });
    },
      (error: HttpErrorResponse) => {                       //Error callback
        if (error.status == 400)
        this.snackBar.open('Qualcosa è andato storto... Prova a ricontrollare tutti i campi','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});
        if (error.status == 404)
        this.snackBar.open('Qualcosa è andato storto... Socio associato inesistente','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});
      });

  }

  //=====================================
  //RECUPERO DATI AUTO DAL DATABASE
  //=====================================

  getInfoAuto(): any {
    this.serviceAuto.getAllAuto().subscribe((res: any) => {

      this.elenco_targhe = [];
      var n: any = null;
      res.forEach((element: any) => {
        if (element.targa != n) {
          this.elenco_targhe.push(element.targa);
          n = element.targa;
        }
      });
    },
      (error: HttpErrorResponse) => {
        console.log('[[' + error.name + ' || ' + error.message + ']]');
        this.snackBar.open('Nessuna auto presente in database','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});
      });
  }

  //=====================================
  //RECUPERO DATI SOCIO DAL DATABASE
  //=====================================

  getInfoSocio(): any {
    this.serviceSocio.getAllSocio().subscribe((res: any) => {

      this.elenco_tessere = [];
      var n: any = null;
      res.forEach((element: any) => {
        if (element.tessera != n) {
          this.elenco_tessere.push(element.tessera);
          n = element.tessera;
        }
      });
    },
      (error: HttpErrorResponse) => {
        console.log('[[' + error.name + ' || ' + error.message + ']]');
        this.snackBar.open('Nessun socio presente in database','X', {horizontalPosition: 'center' , verticalPosition: 'top' , panelClass: ['coloreRed']});
      });
  }

  //metodo in ascolta della select delle targhe per il controllo del pannello espandibile
  onChange(targa_selezionata: any) {
    if (targa_selezionata != '--')
      this.accordion.closeAll();
  }

  socioSelezionato(evento:any){
    console.log(evento);
  }

}

export class DatepickerOverviewExample { }
function push(result: any): never[] {
  throw new Error('Function not implemented.');
}





