import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserStatisticComponent} from "./user-statistic/user-statistic.component";
import {LogInComponent} from "./connection/log-in/log-in.component";
import {RegisterComponent} from "./connection/register/register.component";

const routes: Routes = [
  {path:'userStat', component:UserStatisticComponent},
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
