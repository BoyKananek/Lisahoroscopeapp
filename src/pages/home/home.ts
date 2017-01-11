import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, Events, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login';

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
    this.http.post('https://lisahoroscope.herokuapp.com/auth/userinfo', this.data)
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
          this.data = data.json();
          if (this.data.birthday) {
            this.imgsign = "assets/img/" + this.data.sign + ".png";
            //pull result
            let loader = this.loadingCtrl.create({
              content: "Loading ...",
              duration: 4000,
              dismissOnPageChange: true
            });
            loader.present();
            this.http.post('https://lisahoroscope.herokuapp.com/auth/horoscope/' + this.data.sign, this.data)
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
  doRefresh(refresher) {
    this.http.post('https://lisahoroscope.herokuapp.com/auth/userinfo', this.data)
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
          this.data = data.json();
          if (this.data.birthday) {
            this.imgsign = "assets/img/" + this.data.sign + ".png";
            //pull result
            let loader = this.loadingCtrl.create({
              content: "Loading ...",
              duration: 4000,
              dismissOnPageChange: true
            });
            loader.present();
            this.http.post('https://lisahoroscope.herokuapp.com/auth/horoscope/' + this.data.sign, this.data)
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

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  ionViewDidEnter() {
    /*this.http.post('https://lisahoroscope.herokuapp.com/auth/userinfo', this.data)
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
          this.data = data.json();
          if (this.data.birthday) {
            this.imgsign = "assets/img/" + this.data.sign + ".png";
            //pull result
            let loader = this.loadingCtrl.create({
              content: "Loading ...",
              duration: 4000,
              dismissOnPageChange: true
            });
            loader.present();
            this.http.post('https://lisahoroscope.herokuapp.com/auth/horoscope/' + this.data.sign, this.data)
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
      });*/
  }

}
