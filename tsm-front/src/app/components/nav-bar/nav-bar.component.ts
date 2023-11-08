import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

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
