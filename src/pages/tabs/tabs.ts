import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BrowsePage } from '../browse/browse';
import { ContactPage } from '../contact/contact';
import { ProfilePage } from '../profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Pages
  data: any;
  date: any;
  tab1Root: any = HomePage;
  tab2Root: any = BrowsePage;
  tab3Root: any = ContactPage;
  tab4Root: any = ProfilePage;
  constructor(public navCtrl: NavController, params: NavParams, public alertCtrl: AlertController) {
    this.data = params.get('data');
    this.date = params.get('date');
  }
  share() {
    var alert = this.alertCtrl.create({
      title: "Share on social",
      buttons: ["close"]
    });
    alert.present();
  }
}
