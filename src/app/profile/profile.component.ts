import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginServiceService, UserLogged} from "../login-service.service";
import {Md5} from "ts-md5";
import {Router} from "@angular/router";

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

  constructor(private ls: LoginServiceService,
              private http: HttpClient,
              private router: Router,){ }

  ngOnInit(){
    this.user = this.ls.user;
    this.isConnected = this.ls.isConnected;
    console.log(this.user);
    console.log(this.isConnected);
    this.profileForm = new FormGroup({
      name: new FormControl(this.user.pseudo),
      pseudo: new FormControl(this.user.pseudo),
      email: new FormControl(this.user.email),
      newPassword: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    })
  }

  onSubmit() {
    this.http.put(`${this.Apiurl}users/${this.user.pseudo}/reset_pwd?pwd=${this.user.password}&new_pwd=${Md5.hashStr(this.profileForm.value.newPassword)}`, 0).subscribe(
        (response) => {
          console.log(response);
          this.user.password = Md5.hashStr(this.profileForm.value.newPassword);
        },
        (error) => console.log(error)
        ),  {headers: this.headers}
    console.log(`after submit ${this.user.password}`)
    }

  Ondelete() {

    this.http.delete(`${this.Apiurl}users/${this.user.pseudo}?pseudo=${this.user.pseudo}&pwd=${this.user.password}`).subscribe(
      (response) => {
        console.log(response);
        this.ls.isConnected = false;
        this.router.navigate(['/']);
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
