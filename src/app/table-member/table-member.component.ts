import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { TableMemberDataSource, TableMemberItem } from './table-member-datasource';

const EXAMPLE_DATA: TableMemberItem[] = [
  {tessera: 1, validita: 2021, nome: 'John', cognome: 'Doe', nato_il: '1986-02-15', codice_fiscale: 'XXXXXXXXXXXXXXXX', indirizzo:'VI', email: 'john.doe@vecchieglorie.com', consiglio: true, segretario: true},
  {tessera: 2, validita: 2021, nome: 'Bill', cognome: 'Smith', nato_il: '1980-05-23', codice_fiscale: 'YYYYYYYYYYYYYYYY', indirizzo:'PD', email: 'bill.smith@vecchieglorie.com', consiglio: true, segretario: false},
  {tessera: 3, validita: 2021, nome: 'Lucy', cognome: 'Flowers', nato_il: '1990-11-03', codice_fiscale: 'ZZZZZZZZZZZZZZZ', indirizzo:'MI', email: 'lucy.flowers@vecchieglorie.com', consiglio: false, segretario: false}

];

@Component({
  selector: 'app-table-member',
  templateUrl: './table-member.component.html',
  styleUrls: ['./table-member.component.css']
})
export class TableMemberComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableMemberItem>;
  dataSource: MatTableDataSource<TableMemberItem>;
  elenco_tessere: any[] = [];
  selected = null;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['tessera', 'validita', 'nome', 'cognome', 'nato_il','codice_fiscale', 'indirizzo', 'email', 'consiglio', 'segretario'];

  constructor(private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);
    var n:any=null;
    EXAMPLE_DATA.forEach(element => {
      if(element.tessera!=n){
        this.elenco_tessere.push(element.tessera);
        n=element.tessera;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  allFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableMemberItem, filter: any) => {
    return  data.tessera.toString().trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.validita.toString().trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.cognome.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.nome.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.nato_il.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.codice_fiscale.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.email.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.indirizzo.trim().toLowerCase()   .includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tesseraFilter(event: Event) {

    //imposta i campi di ricerca sul quale agisce il filtro
    this.dataSource.filterPredicate = (data: TableMemberItem, filter: any) => {
      return data.tessera.toString()   .includes(filter);
     };

    //filtra le righe in base al criterio del filterPredicate
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  nomeCognomeFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableMemberItem, filter: any) => {
    return  data.nome.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.cognome.trim().toLowerCase()   .includes(filter.trim().toLowerCase());;
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cfFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableMemberItem, filter: any) => {
    return data.codice_fiscale.trim().toLowerCase()   .includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  emailFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableMemberItem, filter: any) => {
    return data.email.trim().toLowerCase()   .includes(filter.trim().toLowerCase());
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
    tessera: [null, Validators.required],
  });
  
}
