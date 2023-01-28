import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(){ }

  // Inherit attributes from the parent component
  @Input() dashboardIndex = 0;
  @Input() toolbar = 'hidden';
  @Input() vizUrl = 'https://public.tableau.com/views/GarbageFE/Tableaudebord1?:language=fr-FR&publish=yes&:display_count=n&:origin=viz_share_link';

  // Dashboard properties
  public VizIndex = 'Tableau-Viz-' + this.dashboardIndex;

  ngOnInit(): void {
  }
}
