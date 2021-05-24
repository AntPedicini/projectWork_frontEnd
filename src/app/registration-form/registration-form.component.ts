import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TablePresenceItem } from '../table-presence/table-presence-datasource';
import { DATA } from '../table-presence/table-presence-datasource';
 
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent {
  dataSource: MatTableDataSource<TablePresenceItem> | undefined;
  elenco_eventi: any[] = [];
  selected = null;
  hasUnitNumber = false;

  addressForm = this.fb.group({
    nome: [null, Validators.required],
    id_evento: [null, Validators.required],
    targa: [null, Validators.required],
    posti: null,
    iscritti: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource(DATA);
    var n:any=null;
    DATA.forEach(element => {
      if(element.cod_evento!=n){
        this.elenco_eventi.push(element.nome_evento);
        n=element.cod_evento;
      }
    });
  }

  onSubmit(): void {
    console.log("Registrazione iscrizione");
    alert('Evento registrato con successo');
    console.log(this.addressForm.value);
  }
}
