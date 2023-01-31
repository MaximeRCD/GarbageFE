import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
   apiUrl="http://localhost:7999/users";
   user!: UserLogged;
   isConnected = false;

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');



  constructor(private http: HttpClient,
              private router: Router)
 { }


  getLoginResponse(identifiant: string): Observable<UserLogged> {
    return this.http.get<UserLogged>(`${this.apiUrl}/${identifiant}`,
      {headers: this.headers});
  }

  public setUserLogged(value: UserLogged){
    localStorage.setItem('user', JSON.stringify(value));
  }

  public resetUserLogged(){
    localStorage.removeItem("user");
  }

  public getUserLogged(): UserLogged{
    return JSON.parse(localStorage.getItem("user")?? '');
  }


  LogOut() {
    this.isConnected = false;
    this.router.navigate(["/"])
  }
}


export class UserLogged {
   constructor(
     public id: number,
     public pseudo: string,
     public email: string,
     public password: string,
     public last_updated: string,
   ) { }
}
