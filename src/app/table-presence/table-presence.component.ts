import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DATA as PRESENCE_DATA, TablePresenceItem } from './table-presence-datasource';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ServicePresenceService } from '../service-presence.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceEventoService } from '../service-evento.service';
import { ServiceAutoService } from '../service-auto.service';
import { TableEventItem } from '../table-event/table-event-datasource';
import { PresenceEditComponent } from '../dialogs/edit/presence-edit/presence-edit.component';
import { PresenceDeleteComponent } from '../dialogs/delete/presence-delete/presence-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';





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
 
 //campi di utility a popolare le select con i relativi dati
  elenco_iscrizioni: TablePresenceItem[] = [];
  elenco_eventi: TableEventItem[] = [];
  elenco_nomi: String[] = [];
  elenco_targhe: any = [];
  elenco_targhe_evento: any = [];
  selected = null;
  presenze: TablePresenceItem[] = [];
  select: any;
  isWait: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cod_evento', 'nome_evento', 'targa', 'costo_unitario', 'posti_disponibili', 'partecipanti_iscritti', 'partecipanti_effettivi', 'edit'];

  //ReactiveForm
  registrationForm = this.fb.group({
    nome_evento: [null, Validators.required],
    targa: [null, Validators.required],
    partecipanti: [null, Validators.required],
    costo: null
  });

  constructor(private fb: FormBuilder,
    private servicePresence: ServicePresenceService,
    private serviceEvento: ServiceEventoService,
    private serviceAuto: ServiceAutoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

    this.getAllIscrizioni();
    this.refreshSelect();
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
      this.getInfoAuto();
      this.refreshTable();
      this.refreshSelect();
    },

      (error: HttpErrorResponse) => {
        console.log('[[' + error.name + ' || ' + error.message + ']]');
        this.snackBar.open('Nessun Socio presente in database', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
        this.refreshTable();
        this.refreshSelect();
      }
    );
  }

  //==================================
  //RECUPERO DATI EVENTI DAL DATABASE
  //==================================

  //Metodo per recuperare tutti i dati relativi a un evento e popolare così la tabella iscrizioni
  getInfoEventi() {
    this.elenco_eventi = [];
    this.serviceEvento.getAllEventi().subscribe((res: any) => {

      res.forEach((element: any) => {

        this.elenco_eventi.push(element);
        PRESENCE_DATA.forEach(el => {
          if (el.cod_evento == element.cod_evento) {
            //recupero il nome dell'evento da visualizzare
            el.nome_evento = element.nome_evento;
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
        this.snackBar.open('Nessun Evento presente in database', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
        this.refreshTable();
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
      res.forEach((element: any) => {
        if (element.targa != n) {
          this.elenco_targhe.push(element.targa);
          n = element.targa;
        }
      });
    },
      (error: HttpErrorResponse) => {
        console.log('[[' + error.name + ' || ' + error.message + ']]');
        this.snackBar.open('Nessuna auto presente in database', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
      });
  }

  //==================================
  //METODO PER FINALIZZARE IL CHECKOUT
  //==================================

  onSubmit() {
    console.log("Funzione registrazione");
    this.registrationForm.value.partecipanti_effettivi = this.registrationForm.value.partecipanti;
    this.elenco_eventi.forEach(element => {
      if (element.nome_evento == this.registrationForm.value.nome_evento)
        this.registrationForm.value.cod_evento = element.cod_evento;
    });
    this.checkout(this.registrationForm.value);

  }

  //======================================================================
  //METODO CHECKOUT
  //======================================================================

  checkout(iscrizione: any) {

    iscrizione.partecipanti_effettivi = iscrizione.partecipanti;
    console.log(iscrizione);
    this.servicePresence.checkout(iscrizione).subscribe((res: any) => {
      this.snackBar.open('Pagamento effettuato con successo', 'X', {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreBlue'] });


      this.getAllIscrizioni();
      this.isWait = true;
      setTimeout(() => {
        this.onChange(this.select);
      }, 100);
      this.isWait = false;
    },
      (error: HttpErrorResponse) => {              
        if (error.status == 400)
          this.snackBar.open('Qualcosa è andato storto... Controlla i dati inseriti', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
        if (error.status == 404)
          this.snackBar.open('Qualcosa è andato storto... \n Iscrizione non presente in Database', 'X', { horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['coloreRed'] });
      });

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
    this.elenco_eventi.forEach(element => {
      this.elenco_nomi.push(element.nome_evento);
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

  //==========================================================
  //METODI CHE RICHIAMANO I DIALOG DI MODIFICA/CANCELLAZIONE
  //==========================================================

  startEdit(iscrizione: TablePresenceItem) {


    const dialogRef = this.dialog.open(PresenceEditComponent, {
      data: {
        cod_evento: iscrizione.cod_evento,
        nome_evento: iscrizione.nome_evento,
        targa: iscrizione.targa,
        costo_unitario: iscrizione.costo_unitario,
        posti_disponibili: iscrizione.posti_disponibili,
        partecipanti_iscritti: iscrizione.partecipanti_iscritti,
        partecipanti_effettivi: iscrizione.partecipanti_effettivi
      }
    });
    dialogRef.afterClosed().subscribe(res => {

      this.isWait = true;
      this.getAllIscrizioni();
      //ritardo per recupero dati dal database
      setTimeout(() => {
        this.onChange(this.select);
      }, 50);
      this.isWait = false;
    });
  }

  deleteItem(iscrizione: TablePresenceItem) {

    const dialogRef = this.dialog.open(PresenceDeleteComponent, {
      data: {
        cod_evento: iscrizione.cod_evento,
        nome_evento: iscrizione.nome_evento,
        targa: iscrizione.targa,
        costo_unitario: iscrizione.costo_unitario,
        posti_disponibili: iscrizione.posti_disponibili,
        partecipanti_iscritti: iscrizione.partecipanti_iscritti,
        partecipanti_effettivi: iscrizione.partecipanti_effettivi
      }
    });

    dialogRef.afterClosed().subscribe(res => {

      this.isWait = true;
      this.getAllIscrizioni();
      setTimeout(() => {
        this.onChange(this.select);
      }, 50);
      this.isWait = false;
    });
  };

  //refresh select nomi eventi
  onChange(nome_evento: any) {
    this.dataSource.filter = '';
    this.dataSource.filter = nome_evento;

    this.elenco_targhe_evento = [];
    PRESENCE_DATA.forEach(element => {
      if (element.nome_evento == this.select)
        this.elenco_targhe_evento.push(element.targa)
    });

    console.log(this.select);
  }

  //metodo per recuperare le info di una riga
    setActive(iscrizione: any) {
    console.log(iscrizione);
    this.onChange(this.select);
  }

}


