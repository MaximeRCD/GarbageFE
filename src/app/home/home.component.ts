import { Component, OnInit, Input } from '@angular/core';
import {LoginServiceService, UserLogged} from "../services/login-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isConnected = false;
  user!: UserLogged;

  constructor(private ls: LoginServiceService){ }

  // Inherit attributes from the parent component
  @Input() dashboardIndex = 0;
  @Input() toolbar = 'hidden';
  @Input() vizUrl = 'https://public.tableau.com/views/GarbageFE/Tableaudebord1?:language=fr-FR&publish=yes&:display_count=n&:origin=viz_share_link';

  // Dashboard properties
  public VizIndex = 'Tableau-Viz-' + this.dashboardIndex;

  ngOnInit(){
    this.user = this.ls.user;
    this.isConnected = this.ls.isConnected;
    console.log(this.user);
    console.log(this.isConnected);
  }

  LogOut() {
    this.ls.LogOut();
    this.user = this.ls.user;
    this.isConnected = this.ls.isConnected;
  }
}
