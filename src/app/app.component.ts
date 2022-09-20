import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent implements OnInit {
  title = 'MesProduits';
  constructor(public authService: AuthService, private router : Router) { }
  ngOnInit() {
    let isloggedin;
    let loggedUser;
    isloggedin = localStorage.getItem('isloggedIn');
    loggedUser = localStorage.getItem('loggedUser');
    if (isloggedin != "true" || !loggedUser)
        this.router.navigate(['/login']);
    else
        this.authService.setLoggedUserFromLocalStorage(loggedUser);
  }

  onLogout() {
    this.authService.logout();
  }
}
