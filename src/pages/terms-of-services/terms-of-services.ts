import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TermsOfServices page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-terms-of-services',
  templateUrl: 'terms-of-services.html'
})
export class TermsOfServicesPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TermsOfServicesPage Page');
  }

}
