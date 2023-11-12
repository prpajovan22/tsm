import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const createHeader = {
  headers: new HttpHeaders({
    'method':'POST',
    'Content-Type': 'application/json',
  }),
};

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

const uploadHeader = {
  headers: new HttpHeaders({
    'method':'PUT',
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiTaskUrl= `${environment.apiUrl}task`

  constructor(private http:HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiTaskUrl,{
      headers: this.createAuthorizationHeader()
    });
  }

  createTask(tasks: any) : Observable<Task>{
    console.log(tasks);
    return this.http.post<Task>(this.apiTaskUrl + '/create', tasks,{
      headers: this.createAuthorizationHeader()
    });
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
