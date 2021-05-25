import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceSocioService } from '../service-socio.service';
import { EXAMPLE_DATA, TableMemberDataSource, TableMemberItem } from './table-member-datasource';
import {MemberEditComponent} from '../dialogs/edit/member-edit/member-edit.component';
import {MemberDeleteComponent} from '../dialogs/delete/member-delete/member-delete.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-table-member',
  templateUrl: './table-member.component.html',
  styleUrls: ['./table-member.component.css']
})

export class TableMemberComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableMemberItem>;
  dataSource: MatTableDataSource<TableMemberItem>;
  //dataSource = new MatTableDataSource(EXAMPLE_DATA);
  elenco_tessere: any[] = [];
  selected = null;
  soci: TableMemberItem[] = [];
  index:number=0;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['tessera', 'validita', 'nome', 'cognome', 'nato_il', 'codice_fiscale', 'indirizzo', 'email', 'consiglio', 'segretario', 'edit'];

  constructor(private fb: FormBuilder, private serviceSocio: ServiceSocioService, private dialog: MatDialog) {

    this.getAllSocio();
    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);

  }

  //funzione legata alle righe della tabella che prende tutte le info di un socio(comprese quelle non visualizzate provenienti dal backend)
  setActive(socio:any){
    console.log(socio);
  }

  ngOnInit(): void {

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
  getAllSocio() {
    EXAMPLE_DATA.splice(0, EXAMPLE_DATA.length); //workaround per svuotare l'array ad ogni update pagina
    this.serviceSocio.getAllSocio().subscribe((res: any) => {
      
      res.forEach((element: TableMemberItem) => {
        EXAMPLE_DATA.push(element);
        this.soci = res;
      });
      console.log(this.soci);
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

  //====================
  //CANCELLAZIONE SOCIO
  //====================

  deleteSocio(id_socio: number) {
    if (id_socio == null)
      alert('Devi specificare il numero TESSERA del socio');
    else {
      var numberValue = Number(id_socio);
      console.log(numberValue);
      this.serviceSocio.deleteSocio(numberValue).subscribe((res: any) => {
        alert('Socio con TESSERA \''+ numberValue +'\' eliminato con successo dal database \n NB: Le eventuali auto associate non sono state cancellate :D');
        this.getAllSocio();

      },
        (error: HttpErrorResponse) => {                       //Error callback
          if(error.status == 404)
            alert('Qualcosa è andato storto... :(\n Socio con TESSERA '+numberValue+' non presente in database ');
          if(error.status == 400)
            alert('Qualcosa è andato storto... :(\n Controlla idati inseriti e riprova ');
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
    this.elenco_tessere=[];
    var n: any = null;
    EXAMPLE_DATA.forEach(element => {
      if (element.tessera != n) {
        this.elenco_tessere.push(element.tessera);
        n = element.tessera;
      }
    });
  }

  //=======================FILTRI CAMPI RICERCA TABELLA========================

  allFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableMemberItem, filter: any) => {
      return data.tessera.toString().trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.validita.toString().trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.cognome.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.nome.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.nato_il.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.codice_fiscale.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.email.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.indirizzo.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tesseraFilter(event: Event) {

    //imposta i campi di ricerca sul quale agisce il filtro
    this.dataSource.filterPredicate = (data: TableMemberItem, filter: any) => {
      return data.tessera.toString().includes(filter);
    };

    //filtra le righe in base al criterio del filterPredicate
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  nomeCognomeFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableMemberItem, filter: any) => {
      return data.nome.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.cognome.trim().toLowerCase().includes(filter.trim().toLowerCase());;
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cfFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableMemberItem, filter: any) => {
      return data.codice_fiscale.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  emailFilter(event: Event) {

    this.dataSource.filterPredicate = (data: TableMemberItem, filter: any) => {
      return data.email.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  registrationForm = this.fb.group({
    tessera: [null, Validators.required],
  });

  startEdit(i: number, tessera: number, validita: number, nome: string, cognome: string, nato_il: string, codice_fiscale: string, indirizzo: string, email: string, consiglio: string, segretario: string) {
    var socio:TableMemberItem={tessera:0,validita:0,nome:'',nato_il:'', cognome:'',codice_fiscale:'',indirizzo:'',email:'',segretario:false,consiglio:false,targa:''};
    socio.tessera=tessera;
    socio.validita= validita;
    socio.nome=nome;
    socio.cognome= cognome;
    socio.nato_il= nato_il;
    socio.codice_fiscale= codice_fiscale;
    socio.indirizzo= indirizzo;
    socio.email= email;
    this.index = i;
    console.log(this.index);
    console.log(socio);
    const dialogRef = this.dialog.open(MemberEditComponent, {
      data: {validita: validita, nome: nome, nato_il: nato_il, cognome: cognome, codice_fiscale: codice_fiscale, indirizzo: indirizzo, email: email, segretario: segretario, consiglio: consiglio }
    }
  )}

   deleteItem(i: number, tessera: number) {
      this.index = i;
      console.log(this.index);
      console.log(tessera);
      const dialogRef = this.dialog.open(MemberDeleteComponent, {
       data: {tessera:tessera}
      }
    )}
}

