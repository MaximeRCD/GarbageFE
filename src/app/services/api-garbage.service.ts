import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogged } from './login-service.service';
import {Observable} from "rxjs";
import { User } from './register-service.service';
import { Stat } from './user-statistique.service';
import { Md5 } from 'ts-md5';
import { model_result, resutTosave } from '../components/scan-photo/scan-photo.component';

@Injectable({
  providedIn: 'root'
})
export class ApiGarbageService {

  apiUrl="http://localhost:8000";
  headers= new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
  .set('Access-Control-Allow-Origin', "*");

    constructor(private http: HttpClient,
      private router: Router)
{ }

getLoginResponse(identifiant: string): Observable<UserLogged> {
  return this.http.get<UserLogged>(`${this.apiUrl}/users/${identifiant}`,
    {headers: this.headers});
}

getUserStats(user_id: number): Observable<Stat[]>{
  return this.http.get<Stat[]>(`${this.apiUrl}/scans?user_id=${user_id}`,
    {headers: this.headers});
}

getModelResult(photo_name:string){

  return this.http.get<model_result>(`${this.apiUrl}/model/?imageUrl=./img/${photo_name}`)
}

postSaveImg(img: FormData){
  return this.http.post(`${this.apiUrl}/scans/images`, img)
}

postUserCreated(user: User){
  return this.http.post<UserLogged>(`${this.apiUrl}/users/`, user, {headers: this.headers})
}

postRegister(user: User){
  return  this.http.post<UserLogged>(`${this.apiUrl}/users/`, user, {headers: this.headers})
}

putResetPwd(pseudo: string, oldPwd: string, newPwd: string){
  return this.http.put(`${this.apiUrl}/users/${pseudo}/reset_pwd?pwd=${oldPwd}&new_pwd=${Md5.hashStr(newPwd)}`, 0)
}

putResultPredictedOnBdd(data : resutTosave){
  return  this.http.put<resutTosave>(`${this.apiUrl}/stats`, data).subscribe(
    (response) => {

    },

    ),  {headers: this.headers}
}
deleteUser(pseudo: string, pwd: string){
  return this.http.delete(`${this.apiUrl}/users/${pseudo}?pwd=${pwd}`)
}

}
