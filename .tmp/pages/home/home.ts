import { Component } from '@angular/core';

import { NavController, NavParams, App, AlertController, Events, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  data: any;
  result: any;
  imgsign: any;
  isDataAvailable: boolean = false;
  constructor(public navCtrl: NavController, public params: NavParams, public app: App, public alertCtrl: AlertController, public events: Events, public http: Http, public loadingCtrl: LoadingController) {
    this.data = params.get('data');
  }
  ionViewDidEnter() {

    this.http.post('http://localhost:3000/auth/userinfo', this.data)
      .subscribe(data => {
        if (data.json().success == false) {
          console.log('Pull user data error');
        } else {
          this.data = data.json();
          if (this.data.birthday) {
            this.imgsign = "assets/img/" + this.data.sign + ".jpg";
            //pull result
            let loader = this.loadingCtrl.create({
              content: "Loading ...",
              duration: 3500,
              dismissOnPageChange: true
            });
            loader.present();
            this.http.post('http://localhost:3000/auth/horoscope/' + this.data.sign, this.data)
              .subscribe(
              response => {
                this.result = response.json();
                this.isDataAvailable = true;
                console.log(this.result);
              },
              error => {
                console.log(error.text());
                var alert = this.alertCtrl.create({
                  title: "Something went wrong",
                  buttons: ["Ok"]
                });
                alert.present();
              }
              );
          }
          else {
            var alert = this.alertCtrl.create({
              title: "No data",
              subTitle: "Please enter your birthday in your profile",
              buttons: ["close"]
            });
            alert.present();
            this.navCtrl.parent.select(3);
          }
        }
      }, error => {
        console.log(error);
      });
  }

}
