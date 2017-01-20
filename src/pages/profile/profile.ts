import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, Events, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Facebook, GoogleAnalytics } from 'ionic-native';
import { Http, Headers } from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/map'
declare const facebookConnectPlugin: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [Facebook]
})
export class ProfilePage {
  data: any;
  date: any;

  day: any;
  month: any;
  year: any;

  //profile image
  image: any;
  disableSubmit: boolean = false;
  _logoutsub: () => void;
  constructor(public navCtrl: NavController, params: NavParams, public app: App, public alertCtrl: AlertController, public events: Events, public http: Http, public loadingCtrl: LoadingController) {
    this.data = params.get('data');
    this.date = this.data.birthday;
    GoogleAnalytics.trackView("ProfilePage");

    //check image which is exist or not
    if (this.data.type == "email") {
      this.image = 'assets/img/profile.png';
    } else {
      this.image = this.data.picture;
    }
  }
  ionViewDidEnter() {
    var temp = this.date.split('-');
    console.log(temp[1]);
    if (temp[1] === '01' || temp[1] === 'Jan') {
      this.month = 'Jan';
    } else if (temp[1] === '02'|| temp[1] === 'Feb') {
      this.month = 'Feb';
    } else if (temp[1] === '03'|| temp[1] === 'Mar') {
      this.month = 'Mar';
    } else if (temp[1] === '04'|| temp[1] === 'Apr') {
      this.month = 'Apr';
    } else if (temp[1] === '05'|| temp[1] === 'May') {
      this.month = 'May';
    } else if (temp[1] === '06'|| temp[1] === 'Jun') {
      this.month = 'Jun';
    } else if (temp[1] === '07'|| temp[1] === 'Jul') {
      this.month = 'Jul';
    } else if (temp[1] === '08'|| temp[1] === 'Aug') {
      this.month = 'Aug';
    } else if (temp[1] === '09'|| temp[1] === 'Sep') {
      this.month = 'Sep';
    } else if (temp[1] === '10'|| temp[1] === 'Oct') {
      this.month = 'Oct';
    } else if (temp[1] === '11'|| temp[1] === 'Nov') {
      this.month = 'Nov';
    } else if (temp[1] === '12' || temp[1] === 'Dec') {
      this.month = 'Dec';
    }
    this.year = temp[0];
    this.day = temp[2];
    
  }
  logoutHandler() {
    facebookConnectPlugin.getLoginStatus(function onLoginStatus(status) {
      console.log(status);
    });
    console.log("Logging out with facebook");
  }
  ngOnInit() {
    this._logoutsub = () => {
      this.logoutHandler();
    };
    this.events.subscribe('logout', this._logoutsub);
  }
  
  ionViewDidLeave() {
    console.log('Leaving this page');
    if (this._logoutsub) {
      this.events.unsubscribe('logout', this._logoutsub);
      this._logoutsub = undefined;
      console.log("clear events");
    }
  }
  dateChanged(date) {
    var temp = this.date.split('-');
    console.log(temp[1]);
    if (temp[1] === '01' || temp[1] === 'Jan') {
      this.month = 'Jan';
    } else if (temp[1] === '02'|| temp[1] === 'Feb') {
      this.month = 'Feb';
    } else if (temp[1] === '03'|| temp[1] === 'Mar') {
      this.month = 'Mar';
    } else if (temp[1] === '04'|| temp[1] === 'Apr') {
      this.month = 'Apr';
    } else if (temp[1] === '05'|| temp[1] === 'May') {
      this.month = 'May';
    } else if (temp[1] === '06'|| temp[1] === 'Jun') {
      this.month = 'Jun';
    } else if (temp[1] === '07'|| temp[1] === 'Jul') {
      this.month = 'Jul';
    } else if (temp[1] === '08'|| temp[1] === 'Aug') {
      this.month = 'Aug';
    } else if (temp[1] === '09'|| temp[1] === 'Sep') {
      this.month = 'Sep';
    } else if (temp[1] === '10'|| temp[1] === 'Oct') {
      this.month = 'Oct';
    } else if (temp[1] === '11'|| temp[1] === 'Nov') {
      this.month = 'Nov';
    } else if (temp[1] === '12' || temp[1] === 'Dec') {
      this.month = 'Dec';
    }
    this.year = temp[0];
    this.day = temp[2];
  };
  submit() {
    this.disableSubmit = true;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (this.date === null || this.date === '') {
      console.log("Enter birthdate first.....");
      var alert = this.alertCtrl.create({
        title: "Please enter your birthdate first...",
        buttons: ["Ok"]
      });
      alert.present();
    } else {
      //update user data
      
      this.http.post('https://lisahoroscope.herokuapp.com/auth/updateUser/' + this.date, this.data)
        .subscribe(
        response => {
          let loader = this.loadingCtrl.create({
            content: "Loading ...",
            duration: 500,
            dismissOnPageChange: true
          });
          loader.present();

          if (response.json().success == true) {
            this.http.post('https://lisahoroscope.herokuapp.com/auth/userinfo', this.data)
              .subscribe(data => {
                if (data.json().success == false) {
                  console.log('Pull user data error');
                } else {
                  console.log("New user data");

                  this.data = data.json();

                }
                var alert = this.alertCtrl.create({
                  title: "Profile updated",
                  subTitle: "Your profile has been successfully updated",
                  buttons: ["Ok"]
                });
                alert.present();
              }, error => {
                console.log(error);
              })

          } else if (response.json().success == false) {
            var alert = this.alertCtrl.create({
              title: response.json().message,
              buttons: ["Ok"]
            });
            alert.present();
            this.app.getRootNav().setRoot(LoginPage);
          }
          this.disableSubmit = false;

        },
        error => {
          console.log(error.text());
          var alert = this.alertCtrl.create({
            title: "Something went wrong",
            buttons: ["Ok"]
          });
          alert.present();
          this.disableSubmit = false;
        }
        );
    }
  }
  logout() {
    var events = this.events;
    var comfirm = this.alertCtrl.create({
      title: 'Logging out?',
      message: 'Do you want to log out?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            GoogleAnalytics.trackEvent("User","Logout");
            if (this.data.type === "email") {
              console.log('Logout with email');
              this.http.post('https://lisahoroscope.herokuapp.com/api/logout', this.data)
                .subscribe(data => {
                  console.log('Remove session!!');
                }, error => {
                  console.log(error);
                })

              this.app.getRootNav().setRoot(LoginPage);
            } else {
              //facebook logout
              console.log('Logout with facebook');
              this.http.post('https://lisahoroscope.herokuapp.com/api/logout', this.data)
                .subscribe(data => {
                  console.log('Remove session!!');
                }, error => {
                  console.log(error);
                })
              this.navCtrl.pop();
              this.app.getRootNav().setRoot(LoginPage);
              facebookConnectPlugin.logout(function (result) {
                console.log('Facebook logout successful');
                events.publish('logout');//trigger the event to start
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
