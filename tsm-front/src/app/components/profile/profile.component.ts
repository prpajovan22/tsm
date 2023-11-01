import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User

  constructor(private userService:UserService,private authService:AuthService) { }

  ngOnInit() {
    const jwt = localStorage.getItem('JWT');
    if (jwt) {
      this.userService.getLoggedInUser().subscribe(
        (data: any) => {
          this.user = data;
        },
        (error: any) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } else {
      console.log('JWT token is not found in local storage. Please log in.');
    }
  }
}
