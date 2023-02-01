import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserStatisticComponent} from "./components/user-statistic/user-statistic.component";
import {LogInComponent} from "./components/connection/log-in/log-in.component";
import {RegisterComponent} from "./components/connection/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {HomeComponent} from "./components/home/home.component";
import {ScanPhotoComponent} from "./components/scan-photo/scan-photo.component";
import {BaselineComponent} from "./components/baseline/baseline.component";

const routes: Routes = [
  {path: '', component:BaselineComponent,
  children:[
    {path: 'home', component: HomeComponent},
    {path: 'userstat', component: UserStatisticComponent},
    {path: 'scanner', component: ScanPhotoComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'login', component: LogInComponent},
    {path: 'register', component: RegisterComponent },
  ]}
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
