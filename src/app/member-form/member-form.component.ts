import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})

export class MemberFormComponent {
  //Socio
  addressForm = this.fb.group({
    id_tessera: [null, Validators.required],
    scadenza: [null, Validators.required],
    nome: [null, Validators.required],
    cognome: [null, Validators.required],
    CF: [null, Validators.required],
    data_nascita: [null, Validators.required],
    email: [null, Validators.required],
    indirizzo: [null, Validators.required],
    citta: [null, Validators.required],
    provincia: [null, Validators.compose([
      Validators.required, Validators.minLength(2), Validators.maxLength(2)])
    ],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    consiglio: null,
    segretario: null,

    //Auto
    targa: [null, Validators.required],
    marca: [null, Validators.required],
    modello: [null, Validators.required],
    anno: [null, Validators.required],
    immatricolazione: [null, Validators.required],
    asi: null,
    foto: null
  });

  allComplete: boolean = false;

  hasUnitNumber = false;

  constructor(private fb: FormBuilder) {}

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
    alert('Registrazione avvenuta con successo');
    console.log(this.addressForm.value);
  }

  onSubmitAuto(): void {
    console.log("Registrazione auto");
    alert('Registrazione auto avvenuta con successo');
    console.log(this.addressForm.value);
  }
  
}

export class DatepickerOverviewExample {}
function push(result: any): never[] {
  throw new Error('Function not implemented.');
}

