import { Component,OnDestroy } from '@angular/core';
import { NavController,NavParams,App,AlertController,Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Facebook } from 'ionic-native';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
declare const facebookConnectPlugin: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [Facebook]
})
export class ProfilePage implements OnDestroy{
  data : any;
  date : any;
  image : any;
  constructor(public navCtrl: NavController, params: NavParams,public app: App,public alertCtrl: AlertController, public events: Events) {
    this.data = params.get('data');
    this.date = params.get('date');
    //check image which is exist or not
    if(this.data.type == 'email'){
      this.image = 'assets/img/profile.jpg';
    }else{
      this.image = this.data.picture.data.url;
    }
  }
  ngOnInit() {
        this.events.subscribe('logout', (data) => {
            facebookConnectPlugin.getLoginStatus(function onLoginStatus(status) {
                console.log(status);
            });
            console.log("Logging out with facebook");
            /*this.events.unsubscribe('logout', () => {
                console.log('unsubscribed logout');
            });*/
        });
    }
  ngOnDestroy(){
    this.events.unsubscribe('logout', () => {
                console.log('unsubscribed logout');
    });
  }
  logout(){
        var events = this.events;
        var comfirm = this.alertCtrl.create({
            title: 'Logging out?',
            message: 'Do you want to log out?',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        if (this.data.type === "email") {
                            console.log('Logout with email');
                            this.app.getRootNav().setRoot(LoginPage);

                        } else {
                            //facebook logout
                            console.log('Logout with facebook');
                            this.app.getRootNav().setRoot(LoginPage);
                            facebookConnectPlugin.logout(function (result) {
                                console.log('Facebook logout successful');
                                var tem: any = {
                                    logout: true
                                };
                                events.publish('logout', tem);//trigger the event to start
                            }, function (err) {
                                console.log(err);
                            });
                        }
                    }
                },
                {
                    text: 'No',
                    handler: () => {
                        console.log('Nothing');
                    }
                }
            ]
        })
        comfirm.present();
  }
}
