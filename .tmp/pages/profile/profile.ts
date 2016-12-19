import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, Events, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Facebook } from 'ionic-native';
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
  image: any;
  disableSubmit: boolean = false;
  _logoutsub: (dataObj: any) => void;
  constructor(public navCtrl: NavController, params: NavParams, public app: App, public alertCtrl: AlertController, public events: Events, public http: Http, public loadingCtrl: LoadingController) {
    this.data = params.get('data');
    this.date = this.data.birthday;
    //check image which is exist or not
    if (this.data.type == "email") {
      this.image = 'assets/img/profile.jpg';
    } else {
      this.image = this.data.picture;
    }
  }
  ionViewDidEnter() {

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
      this.http.post('http://localhost:3000/auth/updateUser/' + this.date, this.data)
        .subscribe(
        response => {
          let loader = this.loadingCtrl.create({
            content: "Loading ...",
            duration: 500,
            dismissOnPageChange: true
          });
          loader.present();
          console.log("Update user :" + response.json());
          if (response.json().success == true) {
            this.http.post('http://localhost:3000/auth/userinfo', this.data)
              .subscribe(data => {
                if (data.json().success == false) {
                  console.log('Pull user data error');
                } else {
                  console.log("New user data");
                  console.log(data.json());
                  this.data = data.json();

                }
                var alert = this.alertCtrl.create({
                  title: "Update User successful",
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
            if (this.data.type === "email") {
              console.log('Logout with email');
              this.http.post('http://localhost:3000/api/logout', this.data)
                .subscribe(data => {
                  console.log('Remove session!!');
                }, error => {
                  console.log(error);
                })
              
              this.app.getRootNav().setRoot(LoginPage);
            } else {
              //facebook logout
              console.log('Logout with facebook');
              this.http.post('http://localhost:3000/api/logout', this.data)
                .subscribe(data => {
                  console.log('Remove session!!');
                }, error => {
                  console.log(error);
                })
              
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
