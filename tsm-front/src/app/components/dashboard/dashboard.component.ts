import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message:String;

  constructor(
    private service:AuthService
  ) { }

  ngOnInit(): void {
    this.hello();
  }


  hello(){
    this.service.hello().subscribe((response)=>{
      this.message = response;
    });
  }

}
