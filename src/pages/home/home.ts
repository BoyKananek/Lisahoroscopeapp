import { Component } from '@angular/core';

import { NavController, NavParams, App, AlertController, Events, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  data: any;
  result: any;
  imgsign: any;
  constructor(public navCtrl: NavController, params: NavParams, public app: App, public alertCtrl: AlertController, public events: Events, public http: Http, public loadingCtrl: LoadingController,public storage: Storage) {
    this.data = params.get('data');

  }
  ionViewDidEnter() {
    this.storage.get('title').then((val)=>{
      console.log(val);
    })
    console.log(this.result);
    if (this.data.birthday) {
      this.imgsign = "assets/img/" + this.data.sign + ".jpg";
    } else {
      var alert = this.alertCtrl.create({
        title: "No data",
        subTitle: "Please enter your birthday in your profile",
        buttons: ["close"]
      });
      alert.present();
      this.navCtrl.parent.select(3);
    }
  }

}
