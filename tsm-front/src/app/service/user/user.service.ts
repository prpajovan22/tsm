import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { UserFront } from 'src/app/model/UserFront';
import { environment } from 'src/environments/environment';

const BASE_URL = ['http://localhost:8080/user']

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUserUrl= `${environment.apiUrl}user`

  constructor(private http: HttpClient) { }

  getLoggedInUser(): Observable<UserFront> {
    return this.http.get<UserFront>(BASE_URL + '/profile',{
      headers: this.createAuthorizationHeader()
    })
  }


  updateProfile(id:number,formData: FormData) : Observable<User>{
    return this.http.put<User>(`${this.apiUserUrl}/update`, formData,{
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
