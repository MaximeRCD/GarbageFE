import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component} from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {LoginServiceService, UserLogged} from "../services/login-service.service";
import {Router} from "@angular/router";
import { ApiGarbageService } from '../services/api-garbage.service';

@Component({
  selector: 'app-scan-photo',
  templateUrl: './scan-photo.component.html',
  styleUrls: ['./scan-photo.component.css']
})
export class ScanPhotoComponent {

  user!: UserLogged;
    popup:boolean = false;
    availableResult:boolean = false;
    private trigger = new Subject();
    public webcamImage!: WebcamImage;
    private nextWebcam = new Subject();
    captureImage  = '';
    result : model_result = {
      image:"string",
      class: "string",
      score: 0
    };
  ResultPredicted: resutTosave = {
      user_id : 1,
      predicted_class : "string",
      score : 0
    };

  constructor (private http: HttpClient,
               private ls: LoginServiceService,
               private router: Router,
               private apiSerivce:ApiGarbageService){}

    ngOnInit() {
      this.user = this.ls.getUserLogged();
      console.log(this.user)
    }

    /*------------------------------------------
    --------------------------------------------
    triggerSnapshot()
    --------------------------------------------
    --------------------------------------------*/
    public triggerSnapshot(): void {
        this.trigger.next(void 0);
    }

    /*------------------------------------------
    --------------------------------------------
    handle Image and call saveImg methode
    --------------------------------------------
    --------------------------------------------*/
    public handleImage(webcamImage: WebcamImage): void {

      let photo_name = this.user.pseudo+"_"+Date.now()+".jpeg"

        this.webcamImage = webcamImage;
        this.captureImage = webcamImage!.imageAsDataUrl;
        this.saveImg(photo_name);
    }

    /*------------------------------------------
    --------------------------------------------
    triggerObservable()
    --------------------------------------------
    --------------------------------------------*/
    public get triggerObservable(): Observable<any>  {

        return this.trigger.asObservable();
    }

    /*------------------------------------------
    --------------------------------------------
    nextWebcamObservable()
    --------------------------------------------
    --------------------------------------------*/
    public get nextWebcamObservable(): Observable<any> {

        return this.nextWebcam.asObservable();
    }

    /*------------------------------------------
    --------------------------------------------
    Save image on file system
    --------------------------------------------
    --------------------------------------------*/

    public saveImg(photo_name:string): void {

     var formdata: any = new FormData();
     formdata.append('img',this.captureImage)
     formdata.append('name',photo_name);
      // put request api here
      this.apiSerivce.postSaveImg(formdata).subscribe(
        (response) => {
          console.log(response);
          this.getPredictedClass(photo_name);
        },
        (error) => console.log(error)
        ),  {headers: this.apiSerivce.headers}
    }

    public getPredictedClass(photo_name:string)
    {

      this.apiSerivce.getModelResult(photo_name).subscribe( (data: model_result) => {
      
      this.result.image = data.image;
      this.result.score = data.score;
      this.result.class = data.class;
      setTimeout(() => {this.availableResult = true}, 1500);

      this.ResultPredicted.user_id=this.user.id;
      this.ResultPredicted.predicted_class =data.class ;
      this.ResultPredicted.score = data.score;
      this.apiSerivce.putResultPredictedOnBdd(this.ResultPredicted);
    }
      ),
       {headers: this.apiSerivce.headers}
    }

    // public putResultPredicted(data : resutTosave){
    //   this.http.put<resutTosave>('http://localhost:8000/stats', data).subscribe(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => console.log(error)
    //     ),  {headers: this.headers}
    // }

}
export interface model_result{
  image:string,
  class: string,
  score: number
}

export interface resutTosave{
  user_id : number
  predicted_class : string
  score : number
}
