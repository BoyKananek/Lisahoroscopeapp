import { Component } from '@angular/core';

import { NavController, NavParams, App, AlertController, Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  data: any;
  constructor(public navCtrl: NavController, params: NavParams, public app: App, public alertCtrl: AlertController, public events: Events,public http: Http) {
    this.data = params.get('data');
    console.log(this.data);
  }
  ngOnInit(){
    console.log("Initailize Home Page");
  }

}
