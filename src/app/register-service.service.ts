import  { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
providedIn: 'root'
})
export class RegisterService {
  apiUrl="http://localhost:7999/users/";
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}

  register(user: User){
    return this.http.post<User>(this.apiUrl, user, {headers: this.headers}).subscribe({
        next: data => {
            console.log(data)
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
