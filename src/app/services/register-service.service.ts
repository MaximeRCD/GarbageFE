import  { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLogged} from "./login-service.service";
import { ApiGarbageService } from './api-garbage.service';

@Injectable({
providedIn: 'root'
})
export class RegisterService {
  user!: UserLogged;
  
  constructor(private http: HttpClient,
    private apiService:ApiGarbageService) {}

  register(user: User){
    this.apiService.postRegister(user).subscribe({
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
