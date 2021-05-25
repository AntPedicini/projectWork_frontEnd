import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ServiceEventoService } from '../service-evento.service';
import { EXAMPLE_DATA, TableEventDataSource, TableEventItem } from './table-event-datasource';
import {EventEditComponent} from '../dialogs/edit/event-edit/event-edit.component';
import { EventDeleteComponent } from '../dialogs/delete/event-delete/event-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-event',
  templateUrl: './table-event.component.html',
  styleUrls: ['./table-event.component.css']
})
export class TableEventComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableEventItem>;
  dataSource: MatTableDataSource<TableEventItem>;
  elenco_eventi: any[] = [];
  selected = null;
  eventi: TableEventItem[] = [];
  index:number=0;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cod_evento', 'nome_evento', 'data_inizio', 'data_fine', 'location', 'costo_unitario', 'posti_disponibili', 'edit'];

  constructor(private fb: FormBuilder, private serviceEvento: ServiceEventoService, private dialog: MatDialog) {
    this.getAllEventi();
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  //=================================
  //RECUPERO DATI SOCI DAL DATABASE
  //=================================

  //=======================METODO CHE RICHIAMA IL SERVIZIO========================
  getAllEventi() {
    EXAMPLE_DATA.splice(0, EXAMPLE_DATA.length); //workaround per svuotare l'array ad ogni update pagina
    this.serviceEvento.getAllEventi().subscribe((res: any) => {

      res.forEach((element: TableEventItem) => {
        EXAMPLE_DATA.push(element);
        this.eventi.push(element);
      });
      console.log(this.eventi);
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

  //====================
  //CANCELLAZIONE EVENTO
  //====================

  deleteEvento(cod_evento: number) {
    if (cod_evento == null)
      alert('Devi specificare il Codice Evento da eliminare');
    else {
      //var numberValue = Number(cod_evento);
      console.log(cod_evento);
      this.serviceEvento.deleteEvento(cod_evento).subscribe((res: any) => {
        alert('Evento con ID \''+ cod_evento +'\' eliminato con successo dal database \n NB: Le eventuali iscrizioni associate sono state cancellate :D');
        this.getAllEventi();

      },
        (error: HttpErrorResponse) => {                       //Error callback
          console.error('error caught in component')
          alert('Qualcosa è andato storto... :(\n Controlla il Codice Evento inserito ');
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

  //Metodo per refreshare la select con l' elenco degli eventi
  private refreshSelect() {
    this.elenco_eventi = [];
    var n: any = null;
    EXAMPLE_DATA.forEach(element => {
      if (element.cod_evento != n) {
        this.elenco_eventi.push(element.nome_evento);
        n = element.nome_evento;
      }
    });
  }

  //=======================FILTRI CAMPI RICERCA TABELLA========================

  allFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableEventItem, filter: any) => {
      return data.cod_evento.toString().trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.costo_unitario.toString().trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.data_inizio.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.data_fine.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.location.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.nome_evento.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.posti_disponibili.toString().trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cod_eventoFilter(event: Event) {

    //imposta i campi di ricerca sul quale agisce il filtro
    this.dataSource.filterPredicate = (data: TableEventItem, filter: any) => {
      return data.cod_evento.toString().includes(filter);
    };

    //filtra le righe in base al criterio del filterPredicate
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nome_eventoFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableEventItem, filter: any) => {
      return data.nome_evento.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  locationFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableEventItem, filter: any) => {
      return data.location.toString().trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dataFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableEventItem, filter: any) => {
      return data.data_inizio.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  registrationForm = this.fb.group({
    cod_evento: [null, Validators.required],
  });

  setActive(evento:any){
    console.log(evento);

  }

  startEdit(evento:TableEventItem) {
    
    const dialogRef = this.dialog.open(EventEditComponent, {
      data: {cod_evento: evento.cod_evento, 
             nome_evento: evento.nome_evento, 
             data_inizio: evento.data_inizio, 
             data_fine: evento.data_fine, 
             location: location, 
             costo_unitario: evento.costo_unitario, 
             posti_disponibili: evento.posti_disponibili, 
             descrizione: evento.descrizione}
    }
  )}

   deleteItem(evento:TableEventItem) {
      const dialogRef = this.dialog.open(EventDeleteComponent, {
       data: {cod_evento:evento.cod_evento}
      }
    )};

}
