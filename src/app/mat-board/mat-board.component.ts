import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { OnInit } from '@angular/core';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { ServiceAutoService } from '../service-auto.service';
import { ServiceSocioService } from '../service-socio.service';
import { ServiceEventoService } from '../service-evento.service';

@Component({
  selector: 'app-mat-board',
  templateUrl: './mat-board.component.html',
  styleUrls: ['./mat-board.component.css']
})

export class MatBoardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Vecchie Glorie', cols: 2, rows: 1 },
          /*{ title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 }*/
        ];
      }

      return [
        { title: 'Vecchie Glorie', cols: 2, rows: 1 },
        /*{ title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 }*/ 
      ];
    })
  );

  carte = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Soci', cols: 2, rows: 1 },
        ];
      }

      return [
        { title: 'Soci', cols: 2, rows: 1 },
      ];
    })
  );

  carte2 = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Eventi', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Eventi', cols: 2, rows: 1 } 
      ];
    })
  );

  contAuto : number = 0;
  contSoci: number = 0;
  contEventi: number = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private servizioAuto: ServiceAutoService,
    private ServizioSoci: ServiceSocioService,
    private ServizioEventi: ServiceEventoService
    ) {
      this.getNumAuto();   
      this.getNumSoci();   
      this.getNumEventi();
    }

  displayedColumns: string[] = ['position', 'name', 'campo'];
  //soci = VIS_SOCI;
  eventi = VIS_EVENTI;

  ngOnInit(): void {




  }

  getNumAuto() {
    this.servizioAuto.getAllAuto().subscribe((res: any) => {

      this.contAuto=0;
      res.forEach((element: any) => {
        this.contAuto++;
      });
  })
}

getNumSoci() {
  this.ServizioSoci.getAllSocio().subscribe((res: any) => {

    this.contSoci=0;
    res.forEach((element: any) => {
      this.contSoci++;
    });
})
}

getNumEventi() {
  this.ServizioEventi.getAllEventi().subscribe((res: any) => {

    this.contEventi=0;
    res.forEach((element: any) => {
      this.contEventi++;
    });
})
}




}

/*export interface Costruttore_soci {
  name: string;
  position: number;
  campo: string;
}*/

export interface Costruttore_eventi {
  name: string;
  position: number;
  campo: string;
}

/*const VIS_SOCI: Costruttore_soci[] = [
  {position: 1, name: 'Socio1', campo: '?'},
  {position: 2, name: 'Socio2', campo: '?'},
  {position: 3, name: 'Socio3', campo: '?'},
  {position: 4, name: 'Socio4', campo: '?'},
  {position: 5, name: 'Socio5', campo: '?'},
  {position: 6, name: 'Socio6', campo: '?'},
  {position: 7, name: 'Socio7', campo: '?'},
  {position: 8, name: 'Socio8', campo: '?'},
  {position: 9, name: 'Socio9', campo: '?'},
  {position: 10, name: 'Socio10', campo: '?'},
];*/

const VIS_EVENTI: Costruttore_eventi[] = [
  {position: 1, name: 'Evento1', campo: '?'},
  {position: 2, name: 'Evento2', campo: '?'},
  {position: 3, name: 'Evento3', campo: '?'},
  {position: 4, name: 'Evento4', campo: '?'},
  {position: 5, name: 'Evento5', campo: '?'},
  {position: 6, name: 'Evento6', campo: '?'},
  {position: 7, name: 'Evento7', campo: '?'},
  {position: 8, name: 'Evento8', campo: '?'},
  {position: 9, name: 'Evento9', campo: '?'},
  {position: 10, name: 'Evento10', campo: '?'},
];

