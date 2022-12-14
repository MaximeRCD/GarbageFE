import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-scan-photo',
  templateUrl: './scan-photo.component.html',
  styleUrls: ['./scan-photo.component.css']
})
export class ScanPhotoComponent {

  headers= new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    .set('Access-Control-Allow-Origin', '*');


    private trigger = new Subject();
    public webcamImage!: WebcamImage;
    private nextWebcam = new Subject();
    captureImage  = '';



  constructor (private http: HttpClient){}

    ngOnInit() {}

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

        const user_name = "issa"
        let photo_name = user_name+"_"+Date.now()+".jpeg"

        this.webcamImage = webcamImage;
        this.captureImage = webcamImage!.imageAsDataUrl;
        //console.info('received webcam image', this.captureImage);
        this.saveImg(photo_name);
        //this.getPredictedClass(photo_name)
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
   /*  for (var pair of formdata.entries())
        {
        console.log(pair[0]+ ', '+ pair[1]);
        }
*/
      // put request api here
      this.http.post('http://localhost:8000/scans/images', formdata).subscribe(
        (response) => {
          console.log(response);
          this.getPredictedClass(photo_name);
        },
        (error) => console.log(error)
        ),  {headers: this.headers}
    }

    public getPredictedClass(photo_name:string)
    {
      this.http.get(`http://localhost:8000/model/?imageUrl=./img/${photo_name}`).subscribe( data =>
        console.log(data)
      ),  {headers: this.headers}
    }

}
