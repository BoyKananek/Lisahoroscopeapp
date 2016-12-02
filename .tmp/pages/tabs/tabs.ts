import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ProfilePage } from '../profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Pages
  data : any;
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = ProfilePage;
  constructor(public navCtrl: NavController, params: NavParams) {
    this.data = params.get("data");
  }
  share(){
    
  }
}
