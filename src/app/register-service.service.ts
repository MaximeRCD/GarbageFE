import  { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLogged} from "./login-service.service";

@Injectable({
providedIn: 'root'
})
export class RegisterService {
  apiUrl="http://localhost:7999/users/";
  user!: UserLogged;
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}

  register(user: User){
    return this.http.post<UserLogged>(this.apiUrl, user, {headers: this.headers}).subscribe({
        next: data => {
            this.user = data;
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
}
}


export class User {
constructor(
  public pseudo: string,
  public email: string,
  public password: string,
  public last_updated: string,
) {}
}
