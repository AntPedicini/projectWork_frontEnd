import { Component } from '@angular/core';
import { User } from './_models';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vecchie Glorie';

  currentUser: User;
  

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x); //questo scrive robe sul current user?
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
