import { Component } from '@angular/core';
import { UserStatistiqueService, Stat, UserTest } from "../user-statistique.service";
import { Chart } from "chart.js/auto";

@Component({
  selector: 'app-user-statistic',
  templateUrl: './user-statistic.component.html',
  styleUrls: ['./user-statistic.component.css']
})
export class UserStatisticComponent {
  user!: UserTest;
  statsList: Stat[] = [];
  lineChart!: Chart;
  barChart!: Chart;
  pieChart!: Chart;


  constructor(private userStatService : UserStatistiqueService) {
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
              label: 'Number of like per Day',
              data: SetToList(new Set(_statsList.map(x=>x.date.slice(0,10)))).map(x => _statsList.filter(y => y.date.slice(0,10) === x ).length),
              pointBackgroundColor : ["#B3F02F"],
              borderColor: "#B3F02F",
              backgroundColor : "#B3F02F",
            }
          ]
        }
      });

      this.barChart = new Chart("barChart", {
        type: "bar",
        data: {
          labels: ["G&M", "Other", "Organic", "Plastic", "Paper"],
          datasets: [{
            label: 'Number of scanned garbage per Type',
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
            backgroundColor: [ '#90ee90', '#add8e6', 'red', 'green', 'blue', ],
          }]
        },
        options:{
          responsive:true
        }
      });

      this.pieChart = new Chart("pieChart", {
        type: "pie",
        data: {
          labels: ["G&M", "Other", "Organic", "Plastic", "Paper"],
          datasets: [{
            label: 'Percentage of scanned garbage per Type',
            data: [
              _statsList.filter(x=>x.predicted_class === "G&M").length,
              _statsList.filter(x=>x.predicted_class === "Other").length,
              _statsList.filter(x=>x.predicted_class === "Organic").length,
              _statsList.filter(x=>x.predicted_class === "Plastic").length,
              _statsList.filter(x=>x.predicted_class === "Paper").length,
            ],
            backgroundColor: [ '#90ee90', '#add8e6', 'red', 'green', 'blue', ],
          }]
        },
        options:{
          responsive:true,
          plugins: {
            legend: {
              display: true,}
          }
        }
      });


    },
    error: (err: any) => console.error(err),
    complete: () => console.log("Everything is ok")
  }

  ngOnInit(): void {
    this.user = new UserTest("Max", 1, "ma@gmzil.com");
    this.userStatService.getUserStats(this.user.user_id).subscribe(this.userStatSubscriber);
  }

}