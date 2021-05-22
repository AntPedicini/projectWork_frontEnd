import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableAutoDataSource, TableAutoItem } from './table-auto-datasource';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { auto } from '../_models/auto.model';
//import { auto } from '../_models/auto.model';


const EXAMPLE_DATA: TableAutoItem[] = [
  {targa:'XXX111XXX', tessera_socio: 1, marca: 'Ferrari', modello: '250 GTO', anno: 1963, immatricolazione: '1970-02-20', ASI:'1111' },
  {targa:'XXX112XXX', tessera_socio: 1, marca: 'Bugatti', modello: 'Type 57SC', anno: 1936, immatricolazione: '1940-06-04', ASI:'1112' },
  {targa:'XXX222XXX', tessera_socio: 2, marca: 'Mercedes', modello: 'W196R', anno: 1954, immatricolazione: '1971-12-30', ASI:'2222' },
  {targa:'XXX333XXX', tessera_socio: 3, marca: 'Ferrari', modello: '275 GTB/4 N.A.R.T', anno: 1967, immatricolazione: '1980-07-02', ASI: '' },
  {targa:'XXX444XXX', tessera_socio: NaN, marca: 'Ferrari', modello: '275 GTB/C Speciale', anno: 1964, immatricolazione: '1975-04-13', ASI: '' }

];

@Component({
  selector: 'app-table-auto',
  templateUrl: './table-auto.component.html',
  styleUrls: ['./table-auto.component.css']
})
export class TableAutoComponent {  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableAutoItem>;
  dataSource: MatTableDataSource<TableAutoItem>;
  elenco_targhe: any[] = [];
  selected = null;
  listaAuto: auto[] = new Array(); 

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['targa', 'tessera_socio', 'marca', 'modello', 'anno','immatricolazione', 'ASI'];


  constructor(private fb: FormBuilder,private http:HttpClient) {

    this.getAuto();
    console.log()
    this.listaAuto.forEach(element => {
      //EXAMPLE_DATA.push(element);
    });
    this.dataSource = new MatTableDataSource();
  
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);

  }
  ngOnInit(): void {

    var n:any=null;
    EXAMPLE_DATA.forEach(element => {
      if(element.targa!=n){
        this.elenco_targhe.push(element.targa);
        n=element.targa;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  //=====================================
  //AUTO/GETALL
  //=====================================
  getAuto(): any{

    this.http.get<auto[]>('http://localhost:8080/auto/getAll').subscribe(res =>{ 
      //console.log(res);
      this.listaAuto = res;
      console.log(this.listaAuto);
     // this.dataSource = new MatTableDataSource(EXAMPLE_DATA);
    });
  }

  tesseraFilter(event: Event) {

    //imposta i campi di ricerca sul quale agisce il filtro
    this.dataSource.filterPredicate = (data: TableAutoItem, filter: any) => {
      return data.tessera_socio.toString()   .includes(filter);
     };

    //filtra le righe in base al criterio del filterPredicate
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  allFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableAutoItem, filter: any) => {
    return  data.targa.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.tessera_socio.toString().trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.ASI.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.anno.toString().trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.immatricolazione.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.marca.trim().toLowerCase()   .includes(filter.trim().toLowerCase()) ||
            data.modello.trim().toLowerCase()   .includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  targaFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableAutoItem, filter: any) => {
    return data.targa.trim().toLowerCase()   .includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  annoFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableAutoItem, filter: any) => {
    return data.anno.toString().trim().toLowerCase()   .includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ASIFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableAutoItem, filter: any) => {
    return data.ASI.trim().toLowerCase()   .includes(filter.trim().toLowerCase());
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

  onUpdate(): void {
    console.log("Update socio/auto");
    alert('Update avvenuto con successo');
    console.log(this.registrationForm.value);
  }

  registrationForm = this.fb.group({
    targa: [null, Validators.required],
  });

}


