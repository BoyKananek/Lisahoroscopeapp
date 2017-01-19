import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Push, PushToken } from '@ionic/cloud-angular';
import { LoginPage } from '../pages/login/login';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, public push: Push, public alertCtr: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });

    this.push.rx.notification()
      .subscribe((msg) => {
        var alert = this.alertCtr.create({
          title: msg.title,
          subTitle: msg.text,
          buttons: ["Close"]
        })
        alert.present();
      });
  }
}
