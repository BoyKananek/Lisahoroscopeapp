import { Component } from '@angular/core';
import { Facebook } from 'ionic-native';
import { NavController, AlertController, Events, LoadingController, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Storage } from '@ionic/storage';

declare const facebookConnectPlugin: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Facebook]
})
export class LoginPage {
  email: any;
  password: any;
  data: any;
  birthdate: any;
  forgetEmail: any;
  disableSubmit: boolean = false;
  _loginsub: (dataObj: any) => void;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public events: Events, public loadingCtrl: LoadingController, public app: App, public storage: Storage) {
    this.data = null;
  }
  loginHandler(dataObj) {
    this.data = dataObj[0];
    console.log(this.data);
    console.log("Login with facebook Successful");
    this.gotoProfile();
    this.data = null;
  }
  ngOnInit() {
    //Wait for events login wiht Facebook
    this._loginsub = (dataObj) => {
      this.loginHandler(dataObj);
    };
    this.events.subscribe('logined', this._loginsub);
  }
  ionViewDidLeave() {
    console.log('Leaving this page');
    if (this._loginsub) {
      this.events.unsubscribe('logined', this._loginsub);
      this._loginsub = undefined;
      console.log("clear events");
    }
  }

  forgotPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Forget your password',
      message: "Enter your email address",
      inputs: [
        {
          name: 'Email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            this.forgetEmail = data.Email.toLowerCase();
            this.requestToresetPass();
          }
        }
      ]
    });
    prompt.present();
  }
  requestToresetPass() {
    if (!this.forgetEmail) {
      var alert = this.alertCtrl.create({
        title: "Sign up fail",
        subTitle: "Please enter your email",
        buttons: ["close"]
      });
      alert.present();
    }
    else if (!this.validateEmail(this.forgetEmail)) {
      var alert = this.alertCtrl.create({
        title: "Sign up fail",
        subTitle: "Please enter your email in email format",
        buttons: ["close"]
      });
      alert.present();
    }
    else {
      var data = {
        email: this.forgetEmail
      };
      this.http.post("http://localhost:3000/api/forgotPassword", data)
        .subscribe(data => {
          if (data.json().success == false) {
            var alert = this.alertCtrl.create({
              title: "Error",
              subTitle: data.json().message,
              buttons: ["close"]
            });
            alert.present();
          } else {
            var alert = this.alertCtrl.create({
              title: "Reset password proceed",
              subTitle: data.json().message,
              buttons: ["close"]
            });
            alert.present();
          }
        }, error => {
          var alert = this.alertCtrl.create({
            title: "Server down!",
            buttons: ["close"]
          });
          alert.present();
        });
    }
  }
  gotoProfile() {
    console.log('GO to profile');
    this.http.post('http://localhost:3000/auth/userinfo', this.data)
      .subscribe(data => {
        console.log(data.json());
        if (data.json().success == false) {
          var alert = this.alertCtrl.create({
            title: "Login Fail",
            subTitle: this.data.message,
            buttons: ['close']
          });
          alert.present();
        } else {
          console.log('GOTO NEXT PAGE');
          this.storage.set('data',data.json());
          this.app.getRootNav().setRoot(TabsPage, { data: data.json(), tabIndex: 1 });
          //this.navCtrl.push(TabsPage, { data: data.json() });
        }
      }, error => {
        console.log(error);
      })
    let loader = this.loadingCtrl.create({
      content: "Logging in ....",
      duration: 500
    });
    loader.present();
  }
  gotoSignUp() {
    this.navCtrl.push(SignupPage);
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  loginEmail() {
    this.disableSubmit = true;
    var data = {
      email: this.email.toLowerCase(),
      password: this.password
    };
    if (!data.email || !data.password) {
      var alert = this.alertCtrl.create({
        title: "Login fail",
        subTitle: "Please enter your email and password",
        buttons: ["close"]
      });
      alert.present();
      this.disableSubmit = false;
    } else if (!this.validateEmail(data.email)) {
      var alert = this.alertCtrl.create({
        title: "Login fail",
        subTitle: "Please enter your email in correct format",
        buttons: ["close"]
      });
      alert.present();
      this.disableSubmit = false;
    } else {
      console.log("Logging in with email");
      this.http.post("http://localhost:3000/api/login", data)
        .subscribe(data => {
          this.data = data.json();
          if (this.data.error === true) {
            var alert = this.alertCtrl.create({
              title: "Login fail",
              subTitle: this.data.message,
              buttons: ['close']
            });
            alert.present();
            this.disableSubmit = false;
          }
          else {
            console.log('Login Successful');
            this.disableSubmit = false;
            this.gotoProfile();
            this.email = null;
            this.password = null;
          }
        }, error => {
          var alert = this.alertCtrl.create({
            title: "Login fail",
            subTitle: "Please check your networks",
            buttons: ["close"]
          });
          alert.present();
          this.disableSubmit = false;
        });
    }
  }
  loginFB() {
    //this.disableSubmit = true;
    var http = this.http;
    var events = this.events;
    facebookConnectPlugin.login(['public_profile', 'email'], function (response) {
      console.log("Starting login with FBBBBB!")
      facebookConnectPlugin.api("me/?fields=id,email,name,picture.type(large)", ["email"],
        function (result) { // Access api successful
          var id = result["id"];
          var email = result["email"];
          var name = result["name"];
          var picture = result["picture"];
          var dataObj: any = {
            id: id,
            email: email,
            name: name,
            picture: picture
          };
          http.post("http://localhost:3000/api/loginfb", dataObj)
            .subscribe(data => {
              events.publish('logined', data.json());//trigger the event to start
              console.log("Successful");
            }, error => {
              console.log(error);
              console.log("Failure");
            });

        }, function (error) { // Access API Failure 
          console.log("Error Login with facebook");
          console.log(error.message());
          var alert = this.alertCtrl.create({
            title: "Login fail",
            subTitle: "Something went wrong",
            buttons: ["close"]
          });
          alert.present();
        });
    }, function (error) {
      console.log(error.message());
      console.log('Cancel!!!!!');
    });
  }
}
