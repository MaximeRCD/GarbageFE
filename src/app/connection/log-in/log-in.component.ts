import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginServiceService, UserLogged} from "../../services/login-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Md5} from "ts-md5";
import { ApiGarbageService } from 'src/app/services/api-garbage.service';


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
   isValidUser = true;
   is_valid_form = true;
   showPassword = false;

   constructor(private loginService:LoginServiceService,
               private fb:FormBuilder,
               private router:Router,
               private apiService: ApiGarbageService,
)
 { }

  ngOnInit(): void
  {
    this.loginForm = this.fb.group({
      userName:'',
      passWord:['',[Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]]
    })
  }
  
  OnSubmit() {
    this.submitted = true;
    if(this.loginForm.valid){
      this.identifiant = this.loginForm.get('userName')?.value;
      this.pwd = Md5.hashStr(this.loginForm.get('passWord')?.value);
      this.login(this.identifiant, this.pwd);
    }
    else{
      this.is_valid_form = false;
    }
  }


  login(identifiant: string, pwd: string) {
    function clear(lf: FormGroup){
      lf.patchValue({
        userName:'',
        passWord:'',
      });
    }
    function redirect(userLogged: UserLogged, router: Router, loginForm: FormGroup) : boolean {
      // console.log(userLogged.pseudo)
      // console.log(loginForm.get('userName')?.value)
      // console.log(userLogged.password)
      // console.log(loginForm.get('passWord')?.value)

      if ((userLogged.pseudo == identifiant) && (userLogged.password == pwd)){
        console.log("User Signed in")
        router.navigate(["/"]);
        clear(loginForm);
        loginForm.disable();
        return true;
      }
      console.log("User not Signed in")
      clear(loginForm);
      return false;
       }

     this.apiService.getLoginResponse(identifiant).subscribe(result =>{
      this.loginService.user = result;
      this.loginService.isConnected = true;
      this.loginService.setUserLogged(this.loginService.user);
      console.log("ussr : ", this.loginService.getUserLogged())
       this.isValidUser = redirect(this.loginService.getUserLogged(),this.router,  this.loginForm)
      },err=>{
      console.log("Something went wrong")
    }),{headers: this.apiService.headers}
  }
}
