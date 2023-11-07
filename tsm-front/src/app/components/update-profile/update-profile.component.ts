import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user:User

  constructor(private userService:UserService,private authService:AuthService,
    private router:Router) { }

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

  updateProfile(){
    const formData = new FormData();
    formData.append("name", this.user.name);
    formData.append("email", this.user.email);
    formData.append("phone", this.user.phone);
    formData.append("avatar", this.user.avatar);
    this.userService.updateProfile(this.user.id, formData).subscribe(data=>{
      console.log(data);
      this.user = new User();
      this.router.navigate(['profile']);
    }, error=>console.log(error));
  }
  onSubmit(){
    this.updateProfile();
  }

  onAvatarChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.user.avatar = event.target.files[0] as File;
    }
  }

  redirectToProfile(){
    this.router.navigate(['profile']);
  }
}