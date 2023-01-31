import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterService, User} from "../../register-service.service";
import {Router} from "@angular/router";
import {LoginServiceService} from "../../login-service.service";
import {LogInComponent} from "../log-in/log-in.component";

@Component({
selector: 'app-register',
templateUrl: './register.component.html',
styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: User = new User("",  "", "", "2023-01-28T16:15:40.430186");
  submitted = false;
  registerForm!: FormGroup;
  loginComp!: LogInComponent;

  constructor(private rs: RegisterService,
              private fb:FormBuilder,
              private router: Router,
              private ls: LoginServiceService) {
    this.loginComp = new LogInComponent(this.ls, this.fb, this.router)
  }

  ngOnInit(): void
  {
    this.registerForm = this.fb.group({
      userName:[''],
      passWord:[''],
      email:[''],
    })
    this.user.email = "";
    this.user.pseudo = "";
    this.user.password = "";
  }

  OnSubmit() {
    this.submitted = true;
    if(this.registerForm.valid){
      this.user.email = this.registerForm.get('email')?.value;
      this.user.pseudo = this.registerForm.get('userName')?.value;
      this.user.password = this.registerForm.get('passWord')?.value;
      this.rs.register(this.user);
      //this.router.navigate(['/'])
    }
  }

  Login(){
    this.loginComp.login(this.user.pseudo, this.user.password);
  }

}







