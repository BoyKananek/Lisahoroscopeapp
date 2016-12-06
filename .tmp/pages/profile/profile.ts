import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  data : any;
  birthdate : any;
  image : any;
  constructor(public navCtrl: NavController, params: NavParams) {
    this.data = params.get('data');
    //check image which is exist or not
    if(this.data.type == 'email'){
      this.image = 'assets/img/profile.jpg';
    }else{
      this.image = this.data.picture.data.url;
    }
  }
  logout(){
    console.log("LOGOUT");
    this.navCtrl.setRoot(LoginPage);
  }
}
