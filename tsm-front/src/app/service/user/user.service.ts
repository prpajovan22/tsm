import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';

const BASE_URL = ['http://localhost:8080/user']

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(BASE_URL + '/profile',{
      headers: this.createAuthorizationHeader()
    })
  }


  private createAuthorizationHeader(){
    const jwt = localStorage.getItem('JWT');
    if(jwt){
      return new HttpHeaders().set(
        'Authorization','Bearer ' + jwt
      )
    }else{
      console.log("JWT token is not found in the Local Storage")
    }
    return null;
  }
}
