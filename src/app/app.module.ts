import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScanPhotoComponent } from './scan-photo/scan-photo.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    LogInComponent,
    RegisterComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: 'Profile', component: ProfileComponent},
      {path: '', component: ScanPhotoComponent},
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
