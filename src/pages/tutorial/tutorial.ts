import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  data: any;
  constructor(public navCtrl: NavController, params: NavParams) {
    this.data = params.get('data');
    console.log(this.data);
  } 

  ionViewDidLoad() {
    
  }
  nextPage(){
    this.navCtrl.push(TabsPage,{data: this.data});
  }

}
