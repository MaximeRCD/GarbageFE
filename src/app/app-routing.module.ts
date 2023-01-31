import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserStatisticComponent} from "./user-statistic/user-statistic.component";
import {LogInComponent} from "./connection/log-in/log-in.component";
import {RegisterComponent} from "./connection/register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {HomeComponent} from "./home/home.component";
import {ScanPhotoComponent} from "./scan-photo/scan-photo.component";
import {BaselineComponent} from "./baseline/baseline.component";

const routes: Routes = [
  {path: '', component:BaselineComponent,
  children:[
    {path: 'home', component: HomeComponent},
    {path: 'userstat', component: UserStatisticComponent},
    {path: 'scanner', component: ScanPhotoComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'login', component: LogInComponent },
    {path: 'register', component: RegisterComponent },
  ]}
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
