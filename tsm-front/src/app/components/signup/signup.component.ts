import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;

  constructor(
    private auhtService: AuthService,
    private fb:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      username:['',[Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['']
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(fg:FormGroup){
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    if(password != confirmPassword){
      fg.get("confirmPassword")?.setErrors({passwordMatchValidator:true})
    }else{
      fg.get('confirmPassword')?.setErrors(null);
    }
  }

  signup(){
    console.log(this.signupForm.value)
    this.auhtService.signup(this.signupForm.value).subscribe((response)=>{
      console.log(response)
      this.router.navigate(['login'])
    })
  }

  emailValidator(control) {
    const email = control.value;
    if (email.endsWith('@gmail.com')) {
      return null; 
    } else {
      return { invalidEmail: true };
    }
  }
}
