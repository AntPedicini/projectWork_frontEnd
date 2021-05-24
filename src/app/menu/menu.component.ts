import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit(): void {

  }

  logout(){
    console.log("ho premuto esci");
    this.app.logout();
  }
}
