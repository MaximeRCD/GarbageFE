import { Component } from '@angular/core';
import { UserStatistiqueService, Stat, UserTest } from "../../services/user-statistique.service";
import { Chart } from "chart.js/auto";
import {LoginServiceService, UserLogged} from "../../services/login-service.service";
import {Router} from "@angular/router";
import { ApiGarbageService } from '../../services/api-garbage.service';
import * as pluginsDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: 'app-user-statistic',
  templateUrl: './user-statistic.component.html',
  styleUrls: ['./user-statistic.component.css']
})
export class UserStatisticComponent {
  statsList: Stat[] = [];
  lineChart!: Chart;
  barChart!: Chart;
  pieChart!: Chart;
  user!: UserLogged;

  total_prediction! : number;
  prediction_avg_score! : number;


  constructor(private userStatService : UserStatistiqueService,
              private ls: LoginServiceService,
              private router: Router,
              private apiService: ApiGarbageService) {
  }

  userStatSubscriber = {
    next: (_statsList: Stat[]) =>{
      _statsList.forEach((sl:Stat) => {
        this.statsList.push(sl);

      })

      function SetToList(_set: Set<string>): string[]{
        let arrayFromString: string[] = [];
        for (let s of _set.values()) {
          arrayFromString.push(s);
        }
        return arrayFromString;
      }

      this.lineChart = new Chart("lineChart", {
        type: "line",
        data: {
          labels: SetToList(new Set(_statsList.map(x=>x.date.slice(0,10)))),
          datasets: [
            {
              label: "Counts",
              data: SetToList(new Set(_statsList.map(x=>x.date.slice(0,10)))).map(x => _statsList.filter(y => y.date.slice(0,10) === x ).length),
              pointBackgroundColor : ["#000000"],
              borderColor: "#000000",
              backgroundColor : "#000000",
            }
          ]
        }
      });

      this.barChart = new Chart("barChart", {
        type: "bar",
        data: {
          labels: ["G&M", "Other", "Organic", "Plastic", "Paper"],
          datasets: [{
            label: "Count Per Type",
            barPercentage: 0.5,
            // barThickness: 6,
            // maxBarThickness: 8,
            minBarLength: 2,
            data: [
              _statsList.filter(x=>x.predicted_class === "G&M").length,
              _statsList.filter(x=>x.predicted_class === "Other").length,
              _statsList.filter(x=>x.predicted_class === "Organic").length,
              _statsList.filter(x=>x.predicted_class === "Plastic").length,
              _statsList.filter(x=>x.predicted_class === "Paper").length,
            ],
            backgroundColor: [ '#B3FFA4', '#add8e6', '#FFA4A4', '#FFF4A4', '#EAA4FF', ],
          }]
        },
        options:{
          responsive:true,
        }
      });

      this.pieChart = new Chart("pieChart", {
        type: "pie",
        data: {
          labels: ["G&M", "Other", "Organic", "Plastic", "Paper"],
          datasets: [{
            label: 'Percentage of scanned garbage per Type',
            data:[
              _statsList.filter(x=>x.predicted_class === "G&M").length,
              _statsList.filter(x=>x.predicted_class === "Other").length,
              _statsList.filter(x=>x.predicted_class === "Organic").length,
              _statsList.filter(x=>x.predicted_class === "Plastic").length,
              _statsList.filter(x=>x.predicted_class === "Paper").length,
            ],
            backgroundColor: [ '#B3FFA4', '#add8e6', '#FFA4A4', '#FFF4A4', '#EAA4FF', ],
          }]
        },
        options:{
          responsive:true,
          plugins: {
            legend: {
              display: true,
            }
          }
        },
      });
      this.total_prediction = _statsList.length;
      this.prediction_avg_score = _statsList.map(x=> x.score).reduce((x,y)=> x+y) / this.total_prediction * 100
    },
    error: (err: any) => console.error(err),
    complete: () => console.log("Everything is ok")
  }

  ngOnInit(): void {
    this.user = this.ls.getUserLogged();
    this.apiService.getUserStats(this.user.id).subscribe(this.userStatSubscriber),{headers: this.apiService.headers};

  }
}
