import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  data : any;
  birthdate : any;
  constructor(public navCtrl: NavController, params: NavParams) {
    this.data = params.data;
    console.log("profile:::"+JSON.parse(this.data));
  }
  logout(){
    console.log(this.navCtrl.length);
    this.navCtrl.pop();
  }
}
