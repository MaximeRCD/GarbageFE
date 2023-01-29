import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import {LoginServiceService, UserLogged} from "../login-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

/* Data come from our database */
  name!: string;
  pseudo!: string;
  email!: string;
  newPassword!: string;

  profileForm!: FormGroup;
  isConnected = false;
  user!: UserLogged;

  constructor(private ls: LoginServiceService){ }

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
    console.log(this.profileForm.value)
    }

  LogOut() {
    this.ls.LogOut();
    this.user = this.ls.user;
    this.isConnected = this.ls.isConnected;
  }
}
