import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScanPhotoComponent } from './scan-photo/scan-photo.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserStatisticComponent } from './user-statistic/user-statistic.component';

@NgModule({
  declarations: [
    AppComponent,
    ScanPhotoComponent,
    ProfileComponent,
    UserStatisticComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'Profile', component: ProfileComponent},
      {path: '', component: ScanPhotoComponent},
    ]),
    AppRoutingModule,
    WebcamModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
