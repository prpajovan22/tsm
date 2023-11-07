import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/model/User';
import { UserFront } from 'src/app/model/UserFront';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserFront;

  constructor(private userService: UserService, private authService: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const jwt = localStorage.getItem('JWT');
    if (jwt) {
      this.userService.getLoggedInUser().subscribe(
        (data: UserFront) => {
          this.user = data;
          if (this.user.avatar) {
            this.user.sanitisedImage = this.sanitizer.bypassSecurityTrustUrl(this.user.avatar);
          }
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