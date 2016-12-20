import { Component } from '@angular/core';

import { NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-horoscope',
  templateUrl: 'horoscope.html'
})
export class HoroscopePage {
  sign: any;
  imgsign: any;
  result: any;
  data: any;
  isDataAvailable: boolean = false;
  constructor(public navCtrl: NavController, public params: NavParams, public app: App, public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.sign = params.get('zodiac');
    this.data = params.get('data');
  }
  ionViewDidEnter() {
    this.http.post('http://localhost:3000/auth/userinfo', this.data)
      .subscribe(data => {
        if (data.json().success == false) {
          console.log('Pull user data error');
          var alert = this.alertCtrl.create({
            title: data.json().message,
            buttons: ["Ok"]
          });
          alert.present();
          this.app.getRootNav().setRoot(LoginPage);
        } else {
          //update data session;
          this.data = data.json();
          this.imgsign = "assets/img/" + this.sign + ".jpg";
          let loader = this.loadingCtrl.create({
            content: "Loading ...",
            duration: 4000,
            dismissOnPageChange: true
          });
          loader.present();
          this.http.post('http://localhost:3000/auth/horoscope/' + this.sign, this.data)
            .subscribe(
            response => {
              if (response.json().success == false) {
                var alert = this.alertCtrl.create({
                  title: response.json().message,
                  buttons: ["Ok"]
                });
                alert.present();
                this.app.getRootNav().setRoot(LoginPage);
              }
              this.result = response.json();
              this.isDataAvailable = true;
            },
            error => {
              console.log(error.text());
              var alert = this.alertCtrl.create({
                title: "Server down",
                message: "Please try again later",
                buttons: ["Ok"]
              });
              alert.present();
            }
            );
        }
      }, error => {
        console.log(error);
      });

  }
}
