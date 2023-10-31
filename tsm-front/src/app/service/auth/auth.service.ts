import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'

const BASE_URL = ['http://localhost:8080/']

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  signup(signupRequest:any): Observable<any>{
    return this.http.post(BASE_URL + "register",signupRequest)
  }

  login(loginRequest:any): Observable<any>{
    return this.http.post(BASE_URL + "authentication",loginRequest)
  }

  hello():Observable<any>{
    return this.http.get(BASE_URL + "api/hello",{
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
