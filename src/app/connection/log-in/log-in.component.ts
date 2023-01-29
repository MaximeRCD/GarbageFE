import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginServiceService, UserLogged} from "../../login-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
   submitted = false;
   loginForm!: FormGroup;
   identifiant!: string;
   pwd!: string;
   isValidUser!: boolean;

   constructor(private loginService:LoginServiceService,
               private fb:FormBuilder,
               private router:Router,
)
 { }

  ngOnInit(): void
  {
    this.loginForm = this.fb.group({
      userName:[''],
      passWord:[''],
    })
  }


  OnSubmit() {
    this.submitted = true;
    if(this.loginForm.valid){
      this.identifiant = this.loginForm.get('userName')?.value;
      this.pwd = this.loginForm.get('passWord')?.value;
      this.login(this.identifiant, this.pwd);
    }
  }


  login(identifiant: string, pwd: string) {
    function clear(lf: FormGroup){
      lf.patchValue({
        userName:'',
        passWord:''
      });
    }
    function redirect(userLogged: UserLogged, router: Router, loginForm: FormGroup) : boolean {
      // console.log(userLogged.pseudo)
      // console.log(loginForm.get('userName')?.value)
      // console.log(userLogged.password)
      // console.log(loginForm.get('passWord')?.value)

      if ((userLogged.pseudo == loginForm.get('userName')?.value) && (userLogged.password == loginForm.get("passWord")?.value)){
        console.log("User Signed in")
        router.navigate(["/"]);
        return true;
      }
      console.log("User not Signed in")
        return false;
       }

     this.loginService.getLoginResponse(identifiant).subscribe(result =>{
      this.loginService.user = result;
      this.loginService.isConnected = true;
      this.loginService.setUserLogged(this.loginService.user);
      console.log("ussr : ", this.loginService.getUserLogged())
       this.isValidUser = redirect(this.loginService.getUserLogged(),this.router,  this.loginForm)
      },err=>{
      console.log("Something went wrong")
    })
  }
}
