import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginServiceService, UserLogged} from "../../login-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Md5} from "ts-md5";


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
               // private route: ActivatedRoute
)
 {}

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

    function redirect(ls: LoginServiceService, router: Router,  loginForm: FormGroup) : boolean {

      if ((ls.user.pseudo == identifiant) && (ls.user.password == pwd)){
        ls.isConnected = true;
        ls.setUserLogged(ls.user);
        console.log("ussr : ", ls.getUserLogged());
        router.navigate(['']) .then(() => {
          window.location.reload();
        });
        clear(loginForm);
        loginForm.disable();
        console.log("User Signed in")
        return true;
      }
      console.log("User not Signed in")
      clear(loginForm);
      return false;
       }

     this.loginService.getLoginResponse(identifiant).subscribe(result =>{
       this.loginService.user = result;
      this.isValidUser = redirect(this.loginService,this.router,  this.loginForm)
      },err=>{
      console.log("Something went wrong")
    })
  }
}
