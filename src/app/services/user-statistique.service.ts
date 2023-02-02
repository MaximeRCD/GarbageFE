import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserStatistiqueService {



  constructor(
    private http: HttpClient
  ) { }


}

export class Stat {
  constructor(
    public user_id: number,
    public predicted_class: string,
    public date: string,
    public score: number
  ) {}
}

export class UserTest {
  constructor(
    public pseudo: string,
    public user_id: number,
    public email: string,
  ) {}
}
