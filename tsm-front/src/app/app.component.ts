import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn : boolean;

  title = 'tsm-front';

  constructor(private router:Router){
    this.isLoggedIn = this.checkAuthenticationStatus();
  }

  private checkAuthenticationStatus():boolean{
    const jwt = localStorage.getItem('JWT');
    return !!jwt;
  }

  logout() {
    this.router.navigateByUrl('login');
    localStorage.removeItem('JWT'); 
    this.isLoggedIn = false; 
  }
}
