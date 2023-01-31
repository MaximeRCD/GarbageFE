import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import {LoginServiceService, UserLogged} from "../login-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  Apiurl = 'http://localhost:8000/'

  headers= new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
  .set('Access-Control-Allow-Origin', '*');

/* Data come from our database */
  name!: string;
  pseudo!: string;
  email!: string;
  newPassword!: string;

  profileForm!: FormGroup;
  isConnected = false;
  user!: UserLogged;

  constructor(private ls: LoginServiceService, private http: HttpClient){ }

  ngOnInit(){
    this.user = this.ls.user;
    this.isConnected = this.ls.isConnected;
    console.log(this.user);
    console.log(this.isConnected);
    this.profileForm = new FormGroup({
      name: new FormControl(this.user.pseudo),
      pseudo: new FormControl(this.user.pseudo),
      email: new FormControl(this.user.email),
      newPassword: new FormControl('')
    });
  }


  onSubmit() {
    console.log(this.profileForm.value.newPassword)

    this.http.put(`${this.Apiurl}users/${this.user.pseudo}/reset_pwd?pwd=${this.user.password}&new_pwd=${this.profileForm.value.newPassword}`, 0).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => console.log(error)
        ),  {headers: this.headers}
    }

  Ondelete() {
    
    this.http.delete(`${this.Apiurl}users/${this.user.pseudo}?pseudo=${this.user.pseudo}&pwd=${this.user.password}`).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
      ),  {headers: this.headers}
  }

  LogOut() {
    this.ls.LogOut();
    this.user = this.ls.user;
    this.isConnected = this.ls.isConnected;
  }
}
