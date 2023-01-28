import { Component } from '@angular/core';
import { UserStatistiqueService, Stat, UserTest } from "../user-statistique.service";
import {Chart} from "chart.js";

@Component({
  selector: 'app-user-statistic',
  templateUrl: './user-statistic.component.html',
  styleUrls: ['./user-statistic.component.css']
})
export class UserStatisticComponent {
  user!: UserTest;
  statsList: Stat[] = [];
  lineChart!: Chart;
  pieChart!: Chart;


  constructor(private userStatService : UserStatistiqueService) {
  }

  userStatSubscriber = {
    next: (_statsList: Stat[]) =>{
      _statsList.forEach((sl:Stat) => {
        this.statsList.push(sl);
        console.log(_statsList);
      })

      // this.lineChart = new Chart("lineChart", {
      //   type: "line",
      //   data: {
      //     labels: _statsList.map(x=>x.beginTime.slice(0,10)),
      //     datasets: [
      //       {
      //         label: 'Number of like per Course',
      //         data: _statsList.map(x=>x.like),
      //         pointBackgroundColor : ["#B3F02F"],
      //         borderColor: "#B3F02F",
      //         backgroundColor : "#B3F02F",
      //       },
      //       {
      //         label: 'Number of Dislike per Course',
      //         data: _statsList.map(x=>x.dislike),
      //         pointBackgroundColor : ["#EF2700"],
      //         borderColor: "#EF2700",
      //         backgroundColor : "#EF2700",
      //       }
      //     ]
      //   }
      // });
      /*this.pieChart = new Chart("pieChart", {
        type: "pie",
        data: {
          labels: ['Like', 'Dislike',],
          datasets: [{
            data: [_statsList.map(x=>x.like).reduce((x,y)=>x+y), _statsList.map(x=>x.dislike).reduce((x,y)=>x+y)],
            backgroundColor: [
              '#B3F02F',
              '#EF2700',
            ],
            hoverOffset: 4
          }]
        },
        options:{
          responsive:true
        }
      });*/
    },
    error: (err: any) => console.error(err),
    complete: () => console.log("Everything is ok")
  }

  ngOnInit(): void {
    this.user = new UserTest("Max", 1, "ma@gmzil.com");
    this.userStatService.getUserStats(this.user.user_id).subscribe(this.userStatSubscriber);
  }

}
