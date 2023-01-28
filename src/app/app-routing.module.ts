import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserStatisticComponent} from "./user-statistic/user-statistic.component";

const routes: Routes = [
  {path:'userStat', component:UserStatisticComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
