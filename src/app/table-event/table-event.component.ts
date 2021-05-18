import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableEventDataSource, TableEventItem } from './table-event-datasource';

const EXAMPLE_DATA: TableEventItem[] = [
  { cod_evento: 1, nome_evento: 'GIORNATA NAZIONALE VEICOLI D EPOCA', data_inizio: '2021-09-26', data_fine: '2021-09-27', location: 'Reggio Calabria',descrizione: 'I saloni "Milano AutoClassica" e "Modena Motor Gallery" nello stesso weekend.', costo_unitario: 35.7 , posti_disponibili: 100},
  { cod_evento: 2, nome_evento: 'ASI SOLIDALE: RALLY THERAPY', data_inizio: '2021-09-26', data_fine: '2021-09-26', location: 'Bolzano',descrizione: 'Rally Passato e Presente,dalle vetture d epoca alle vetture moderne.', costo_unitario: 32.9 , posti_disponibili: 200},
  { cod_evento: 3, nome_evento: 'XXIII RONDE DELLE ZOLFARE', data_inizio: '2021-05-07', data_fine: '2021-05-09', location: 'Caltanissetta',descrizione: 'Manifestazione turistica con rilevamenti di passaggio di autostoriche.', costo_unitario: 54.5 , posti_disponibili: 300}

];

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cod_evento', 'nome_evento', 'data_inizio', 'data_fine', 'location', 'costo_unitario', 'posti_disponibili'];

  constructor(private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);
    var n:any=null;
    EXAMPLE_DATA.forEach(element => {
      if(element.cod_evento!=n){
        this.elenco_eventi.push(element.cod_evento);
        n=element.cod_evento;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  allFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableEventItem, filter: any) => {
    return  data.cod_evento.toString().trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.costo_unitario.toString().trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.data_inizio.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.data_fine.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.location.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.nome_evento.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.posti_disponibili.toString().trim().toLowerCase()   .includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cod_eventoFilter(event: Event) {

    //imposta i campi di ricerca sul quale agisce il filtro
    this.dataSource.filterPredicate = (data: TableEventItem, filter: any) => {
      return data.cod_evento.toString()   .includes(filter);
     };

    //filtra le righe in base al criterio del filterPredicate
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nome_eventoFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableEventItem, filter: any) => {
    return data.nome_evento.trim().toLowerCase()   .includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  locationFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableEventItem, filter: any) => {
    return data.location.toString().trim().toLowerCase()   .includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dataFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableEventItem, filter: any) => {
    return data.data_inizio.trim().toLowerCase()   .includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete() {
    // TODO: Use EventEmitter with form value
    console.log("Funzione cancellazione");
    console.log(this.registrationForm.value);
    alert('Delete');
  }

  registrationForm = this.fb.group({
    cod_evento: [null, Validators.required],
  });

}
