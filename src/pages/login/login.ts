import { Component } from '@angular/core';
import { Facebook } from 'ionic-native';
import { NavController, AlertController, Events, LoadingController, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { TermsOfServicesPage } from '../terms-of-services/terms-of-services';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'


declare const facebookConnectPlugin: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Facebook]
})
export class LoginPage {
  PrivacyPolicyPage = PrivacyPolicyPage;
  TermsOfServicesPage = TermsOfServicesPage;

  email: any;
  password: any;
  data: any;
  birthdate: any;
  forgetEmail: any;
  disableSubmit: boolean = false;
  _loginsub: (dataObj: any) => void;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public events: Events, public loadingCtrl: LoadingController, public app: App) {
    this.data = null;
  }
  loginHandler(dataObj) {
    this.data = dataObj[0];
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
      this.http.post("https://lisahoroscope.herokuapp.com/api/forgotPassword", data)
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
    this.http.post('https://lisahoroscope.herokuapp.com/auth/userinfo', this.data)
      .subscribe(data => {
        if (data.json().success == false) {
          var alert = this.alertCtrl.create({
            title: "Login Fail",
            subTitle: this.data.message,
            buttons: ['close']
          });
          alert.present();
        } else {
          this.app.getRootNav().setRoot(TabsPage, { data: data.json() });

          //this.app.getRootNav().setRoot(TabsPage, { data: data.json(), tabIndex: 1 });
          //this.navCtrl.push(TabsPage, { tabIndex: 1});
        }
      }, error => {
        console.log(error);
      })
    let loader = this.loadingCtrl.create({
      content: "Logging in ....",
      duration: 500,
      dismissOnPageChange: true
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
      this.http.post("https://lisahoroscope.herokuapp.com/api/login", data)
        .subscribe(data => {
          this.data = data.json();
          if (this.data.success === false) {
            var alert = this.alertCtrl.create({
              title: "Login fail",
              subTitle: this.data.message,
              buttons: ['close']
            });
            alert.present();
            this.email = null;
            this.password = null;
            this.disableSubmit = false;
          }
          else if (this.data.option == true) {
            var alert = this.alertCtrl.create({
              title: "Login fail",
              subTitle: this.data.message,
              buttons: [
                {
                  text: 'Resend the email',
                  handler: data => {
                    console.log('resend the email clicked');
                    this.resendEmail(this.data.email);
                  }
                },
                {
                  text: 'Cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                  }
                }
              ]
            });
            alert.present();
            this.email = null;
            this.password = null;
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
            subTitle: "Please try again later",
            buttons: ["close"]
          });
          alert.present();
          this.disableSubmit = false;
        });
    }
  }
  resendEmail(email) {
    var data = {
      email: email
    }
    this.http.post("https://lisahoroscope.herokuapp.com/api/resendEmail", data)
      .subscribe(data => {
        console.log('resend the email');
        var alert = this.alertCtrl.create({
          title: data.json().title,
          subTitle: data.json().message,
          buttons: ["close"]
        });
        alert.present();
      }, error => {
        var errorAlert = this.alertCtrl.create({
          title: "Resend the email fail",
          subTitle: "Please try again later",
          buttons: ["close"]
        });
        errorAlert.present();
      });
  }
  loginFB() {
    //this.disableSubmit = true;
    var http = this.http;
    var events = this.events;
    var alert = this.alertCtrl;
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
          http.post("https://lisahoroscope.herokuapp.com/api/loginfb", dataObj)
            .subscribe(data => {
              events.publish('logined', data.json());//trigger the event to start
              console.log("Successful");
            }, error => {
              var errorAlert = alert.create({
                title: "Login fail",
                subTitle: "Please try again later",
                buttons: ["close"]
              });
              errorAlert.present();
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
