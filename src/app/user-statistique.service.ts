import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserStatistiqueService {

  apiUrl="http://localhost:7999/scans";
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(
    private http: HttpClient
  ) { }

  getUserStats(user_id: number): Observable<Stat[]>{
    return this.http.get<Stat[]>(`${this.apiUrl}?user_id=${user_id}`,
      {headers: this.headers});
  }

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
