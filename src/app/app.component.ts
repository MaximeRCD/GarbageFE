import { Component } from '@angular/core';
import {UserLogged, LoginServiceService} from "./services/login-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GarbageFE';
}
