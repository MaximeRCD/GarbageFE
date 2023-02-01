import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginServiceService, UserLogged} from "../../services/login-service.service";
import {Md5} from "ts-md5";
import {Router} from "@angular/router";
import { ApiGarbageService } from '../../services/api-garbage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  // Apiurl = 'http://localhost:8000/'

  // headers= new HttpHeaders()
  // .set('Content-Type', 'application/json')
  // .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
  // .set('Access-Control-Allow-Origin', '*');

/* Data come from our database */
  name!: string;
  pseudo!: string;
  email!: string;
  newPassword!: string;
  profileForm!: FormGroup;
  user!: UserLogged;

  constructor(private ls: LoginServiceService,
              private http: HttpClient,
              private router: Router,
              private apiService: ApiGarbageService){ }

  ngOnInit(){
    this.user = this.ls.getUserLogged();
    console.log(this.user);
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
    this.apiService.putResetPwd(this.user.pseudo,this.user.password,this.profileForm.value.newPassword).subscribe(
        (response) => {
          console.log(response);
          this.user.password = Md5.hashStr(this.profileForm.value.newPassword);
        },
        (error) => console.log(error)
        ),  {headers: this.apiService.headers}
    console.log(`after submit ${this.user.password}`)
    }

  Ondelete() {
    const Confirmation = confirm("Are you sure you want to do that?");
    if(Confirmation){
      this.apiService.deleteUser(this.user.pseudo,this.user.password).subscribe(
        (response) => {
          this.LogOut();
        },
        (error) => console.log(error)
        ),  {headers: this.apiService.headers}
      }
    }

  LogOut() {
    this.ls.LogOut();
  }
}
