import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BrowsePage } from '../browse/browse';
import { ContactPage } from '../contact/contact';
import { ProfilePage } from '../profile/profile';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Pages
  data: any;
  result: any;
  tab1Root: any = HomePage;
  tab2Root: any = BrowsePage;
  tab3Root: any = ContactPage;
  tab4Root: any = ProfilePage;
  public tabIndex: Number = 0;
  constructor(public navCtrl: NavController, params: NavParams, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, public storage: Storage) {
    this.data = params.get('data');
    this.storage.get('data').then((val) => {
      console.log("HELLO");
      console.log( val.token); // it is working 
    });
    let tabIndex = params.get('tabIndex');
    if (tabIndex) {
      this.tabIndex = tabIndex;
    }
    if (this.data.sign) {
      this.http.post('http://localhost:3000/auth/horoscope/' + this.data.sign, this.data)
        .subscribe(
        response => {
          this.result = response.json();
          storage.set('title', this.result.title);
          storage.set('work', this.result.work);
          storage.set('finance', this.result.finance);
          storage.set('love', this.result.love);
          storage.set('healthy', this.result.healthy);
          storage.set('luck', this.result.luck);
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
      let loader = this.loadingCtrl.create({
        content: "Loading ...",
        duration: 2000
      });
      loader.present();
    } else {
      var alert = this.alertCtrl.create({
        title: "No data",
        message: "You do not have a birthday please enter your birthday",
        buttons: ["Ok"]
      });
      alert.present();
    }
  }

  share() {
    var alert = this.alertCtrl.create({
      title: "Share on social",
      buttons: ["close"]
    });
    alert.present();
  }
}
