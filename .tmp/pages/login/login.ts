import { Component } from '@angular/core';
import { Facebook } from 'ionic-native';
import { NavController,AlertController,Events,LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
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
  email : any;
  password : any;
  data : any;
  birthdate : any;
  forgetEmail : any;
  private disableSubmit: boolean = false;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public http: Http,public events: Events,public loadingCtrl: LoadingController) {
    this.data = null;
  }
  ngOnInit(){
      //Wait for events login wiht Facebook
      this.events.subscribe('logined',(dataObj)=>{
          this.disableSubmit = true;
          this.data = dataObj[0];
          console.log(this.data);
          console.log("Login with facebook Successful");
          this.gotoProfile();
          this.disableSubmit = false;
        })
  }
  onPageDidLeave(){
    return this.events.unsubscribe('logined',() =>{
      console.log('Leaving page');
    });
  }
  forgotPassword(){
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
            this.forgetEmail = data.Email;
            this.requestToresetPass();
          }
        }
      ]
    });
    prompt.present();
  }
  requestToresetPass(){
        if (!this.forgetEmail){
            var alert = this.alertCtrl.create({
            title: "Sign up fail",
            subTitle: "Please enter your email",
            buttons: ["close"]
            });
            alert.present(); 
        }
        else if (!this.validateEmail(this.forgetEmail)){
            var alert = this.alertCtrl.create({
            title: "Sign up fail",
            subTitle: "Please enter your email in email format",
            buttons: ["close"]
            });
            alert.present();
        }
        else{
            var data = {
                email : this.forgetEmail
            };
            this.http.post("https://lisahoroscope.herokuapp.com/forgetPassword",data)
            .subscribe( data =>{
                var alert = this.alertCtrl.create({
                title: "Reset password proceed",
                subTitle: "Please check your email address to continue",
                buttons: ["close"]
            });
                alert.present();
            },error =>{
                var alert = this.alertCtrl.create({
                title: "Server down!",
                buttons: ["close"]
                });
                alert.present();
            });
        }
  }
  gotoProfile(){
    let loader = this.loadingCtrl.create({
                content: "Logging in ....",
                duration: 500
              });
    loader.present();
    console.log('GO to profile');
    this.http.get('https://lisahoroscope.herokuapp.com/api/userinfo/'+ this.data.email)
      .map( res => res.json())
      .subscribe( data => {
          console.log('getting info');
          console.log(data.birthdate);
          this.birthdate = data.birthdate;
          this.navCtrl.push(TabsPage,{user : this.data,date: this.birthdate});
      }, error => {
          console.log(error);
      })
    
}
  gotoSignUp(){
    this.navCtrl.push(SignupPage);
  }
  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  loginEmail(){
    this.disableSubmit = true;
    console.log(this.navCtrl.length());
    var data = {
      email : this.email,
      password : this.password
    };
    if ( !data.email || !data.password) {
      var alert = this.alertCtrl.create({
          title: "Login fail",
          subTitle: "Please enter your email and password",
          buttons: ["close"]
        });
        alert.present();
        this.disableSubmit = false;
    }else if (!this.validateEmail(data.email)){
      var alert = this.alertCtrl.create({
          title: "Login fail",
          subTitle: "Please enter your email in correct format",
          buttons: ["close"]
        });
        alert.present();
        this.disableSubmit = false;
    } else {
      console.log("Logging in with email");
      this.http.post("https://lisahoroscope.herokuapp.com/loginWithApp",data)
          .subscribe(data =>{ 
            this.data = data.json();
            if (this.data.error === true){
              var alert = this.alertCtrl.create({
                title: "Login fail",
                subTitle: this.data.message,
                buttons: ['close']
              });
              alert.present();
              console.log('Login fail because wrong email');
              this.disableSubmit = false;
            }
            else{
              
              console.log('Login Successful');
              this.disableSubmit = false;
              this.gotoProfile();
              this.email = null;
              this.password = null;
            }
          },error => {
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
        facebookConnectPlugin.login(['public_profile', 'email'], function(response) {
          console.log("Starting login with FBBBBB!")
            facebookConnectPlugin.api("me/?fields=id,email,name",["email"],
            function(result){ // Access api successful
              var id = result["id"];
              var token = result["token"];
              var email = result["email"];
              var name = result["name"];
              var dataObj:any = {
                id :  id,
                token: token,
                email : email,
                name : name,
              };
              //events.publish('logined',dataObj);//trigger the event to start
              http.post("https://lisahoroscope.herokuapp.com/api/users",dataObj)
              .subscribe(data =>{
                //this.data = data.json();
                //console.log("FBBBBBBBBB" + JSON.stringify(data));
                events.publish('logined',dataObj);//trigger the event to start
                console.log("Successful");

              },error => {
                console.log("Failure");
              });

            },function(error){ // Access API Failure 
              console.log("Error Login with facebook");
              console.log(error.message());
              var alert = this.alertCtrl.create({
              title: "Login fail",
              subTitle: "Something went wrong",
              buttons: ["close"]
            });
            alert.present();
            });
        }, function(error){
            console.log(error.message());
            console.log('Cancel!!!!!');
        });
        //this.disableSubmit = false;
 }
}
