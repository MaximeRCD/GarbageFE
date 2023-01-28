import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScanPhotoComponent } from './scan-photo/scan-photo.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserStatisticComponent } from './user-statistic/user-statistic.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './connection/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import {LogInComponent} from "./connection/log-in/log-in.component";
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    ScanPhotoComponent,
    ProfileComponent,
    UserStatisticComponent,
    HomeComponent,
    LogInComponent,
    RegisterComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: 'Profile', component: ProfileComponent},
      {path: 'Scan Waste', component: ScanPhotoComponent},
      {path: '', component: HomeComponent},
    ]),
    AppRoutingModule,
    WebcamModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
