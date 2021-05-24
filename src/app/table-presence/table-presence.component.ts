import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DATA as PRESENCE_DATA, TablePresenceDataSource, TablePresenceItem } from './table-presence-datasource';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { element, EventEmitter } from 'protractor';
import { ServicePresenceService } from '../service-presence.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceEventoService } from '../service-evento.service';




@Component({
  selector: 'app-table-presence',
  templateUrl: './table-presence.component.html',
  styleUrls: ['./table-presence.component.css']

})
export class TablePresenceComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TablePresenceItem>;
  dataSource: MatTableDataSource<TablePresenceItem>;
  elenco_nomi: String[] = [];
  selected = null;
  presenze: TablePresenceItem[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cod_evento', 'nome_evento', 'targa', 'costo_unitario', 'posti_disponibili', 'partecipanti_iscritti', 'partecipanti_effettivi'];

  constructor(private fb: FormBuilder, private servicePresence: ServicePresenceService, private serviceEvento: ServiceEventoService) {

    this.getAllIscrizioni();
    this.dataSource = new MatTableDataSource(PRESENCE_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  //======================================
  //RECUPERO DATI ISCRIZIONE DAL DATABASE
  //======================================

  getAllIscrizioni() {
    PRESENCE_DATA.splice(0, PRESENCE_DATA.length); //workaround per svuotare l'array ad ogni update pagina
    this.servicePresence.getAllIscrizioni().subscribe((res: any) => {
      
      res.forEach((element: TablePresenceItem) => {
        PRESENCE_DATA.push(element);
        this.presenze = res;
      });
      console.log(PRESENCE_DATA);

      //recupero i dati relativi all'evento e refresh tabella e select eventi
      this.getInfoEventi();
      this.refreshTable();
      this.refreshSelect();
    },

      (error: HttpErrorResponse) => {
        console.log('[[' + error.name + ' || ' + error.message + ']]');
        alert('Nessun Socio presente in database');
        this.refreshTable();
      }
    );
  }

  //==================================
  //RECUPERO DATI EVENTI DAL DATABASE
  //==================================

  //Metodo per recuperare tutti i dati relativi a un evento e popolare così la tabella iscrizioni
  getInfoEventi() {
    this.serviceEvento.getAllEventi().subscribe((res: any) => {

      res.forEach((element: any) => {

        PRESENCE_DATA.forEach(el => {
          if(el.cod_evento == element.cod_evento){
            //recupero il nome dell'evento da visualizzare
            el.nome_evento=element.nome_evento;
            //recupero il costo unitario
            el.costo_unitario = element.costo_unitario;
            //recupero il calcolo dei posti rimanenti
            el.posti_disponibili = element.posti_rimanenti;
/*             if(el.partecipanti_effettivi == null)
              el.partecipanti_effettivi=0; */
          }
        });
      });
      this.refreshTable();
      this.refreshSelect();
    },

      (error: HttpErrorResponse) => {
        console.log('[[' + error.name + ' || ' + error.message + ']]');
        alert('Nessun Evento presente in database');
        this.refreshTable();
      }
    );
  }

  //=========================
  //CANCELLAZIONE ISCRIZIONE
  //=========================

  deleteIscrizione(nome_evento : string, targa:string) {
    if (nome_evento == null || targa == null)
      alert('Devi specificare il NOME dell\'evento e la TARGA del veicolo iscritto');
    else {
      var cod_evento : number = 0;
      PRESENCE_DATA.forEach(element => {
        if(element.nome_evento == nome_evento)
          cod_evento=element.cod_evento;
      });
       this.servicePresence.deleteIscrizione(cod_evento,targa).subscribe((res: any) => {
        alert('L\'Iscrizione del veicolo con TARGA '+ targa +' dall\'evento '+ nome_evento +' è stata cancellata con successo :D');
        this.getAllIscrizioni();

      },
        (error: HttpErrorResponse) => {                       //Error callback
          console.error('error caught in component')
          alert('Qualcosa è andato storto... :(\n Controlla l\'evento e la targa inserita ');
        }); 
    }
  }

  //metodo per refreshare la tabella
  private refreshTable() {
    // if there's nothing in filter
    if (this.dataSource.filter === '') {
      this.dataSource.filter = ' ';
      this.dataSource.filter = '';
    } else {
      // if there's something, we make a simple change and then put back old value
      this.dataSource.filter = '';
      this.dataSource.filter = this.dataSource.filter.valueOf();
    }
  }
  //metodo per refreshare la select per selezionare la tessera
  private refreshSelect() {
    this.elenco_nomi = [];
    var n: any = null;
    PRESENCE_DATA.forEach(element => {
      if (element.nome_evento != n) {
        this.elenco_nomi.push(element.nome_evento);
        n = element.nome_evento;
      }
    });
  }
  //======================================================================
  //Metodi per impostare i filtri nella ricerca
  //======================================================================
  allFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TablePresenceItem, filter: any) => {
      return data.nome_evento.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.cod_evento.toString().trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.targa.trim().toLowerCase().includes(filter.trim().toLowerCase())
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cod_eventoFilter(event: Event) {

    //imposta i campi di ricerca sul quale agisce il filtro
    this.dataSource.filterPredicate = (data: TablePresenceItem, filter: any) => {
      return data.cod_evento.toString().includes(filter);
    };

    //filtra le righe in base al criterio del filterPredicate
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  targaFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TablePresenceItem, filter: any) => {
      return data.targa.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  nome_eventoFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TablePresenceItem, filter: any) => {
      return data.nome_evento.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //======================================================================

  //ReactiveForm
  registrationForm = this.fb.group({
    nome_evento: [null, Validators.required],
    targa: [null, Validators.required],
    partecipanti: [null, Validators.required],
    costo: null
  });

  //======================================================================
  //Metodo per calcolare in tempo reale la quota da pagare per partecipare
  //======================================================================
  setCosto(): string {
    var costoTot: number = 0;
    PRESENCE_DATA.forEach(element => {
      if (element.nome_evento == this.registrationForm.value.nome_evento)
        costoTot = element.costo_unitario * this.registrationForm.value.partecipanti;
    });
    //console.log(this.registrationForm.value.partecipanti)
    return costoTot.toFixed(2); //Number.toFixed(n:number):string -> converte il numero in una stringa considerando n cifre dopo la virgola
  }
  //======================================================================

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("Funzione registrazione");
    console.log(this.registrationForm.value);
    alert('Submit');
  }

  onDelete() {
    // TODO: Use EventEmitter with form value
    console.log("Funzione cancellazione");
    console.log(this.registrationForm.value);
    this.deleteIscrizione(this.registrationForm.value.nome_evento,this.registrationForm.value.targa);
    this.registrationForm.reset();
  }

  onUpdate(): void {
    console.log("Update iscrizione");
    alert('Update avvenuto con successo');
    console.log(this.registrationForm.value);
  }

}



