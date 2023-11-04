import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/model/Categorie';
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
export class CategorieService {

  private apiCategorieUrl= `${environment.apiUrl}categorie`

  constructor(private http:HttpClient) { }

  getCategories(): Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.apiCategorieUrl + '/all',{
      headers: this.createAuthorizationHeader()
    });
  }

  createCategorie(communitys: any) : Observable<Categorie>{
    console.log(communitys);
    return this.http.post<Categorie>(this.apiCategorieUrl + '/create', communitys,{
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
