import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController,AlertController,LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  name : any;
  email : any;
  password : any;
  repassword : any;
  disableSubmit :boolean = false;
  constructor(public navCtrl: NavController,private http: Http,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {

  }
  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  signUpEmail(){
    this.disableSubmit = true;
    var data = {
        name : this.name,
        email : this.email,
        password : this.password,
        repassword : this.repassword
      };
    if (!this.name || !this.email || !this.password || !this.repassword) {
      var alert = this.alertCtrl.create({
          title: "Sign up fail",
          subTitle: "Please fill in the information above!",
          buttons: ["close"]
        });
        alert.present();
        this.disableSubmit = false;
    }else if (!this.validateEmail(this.email)){
      var alert = this.alertCtrl.create({
          title: "Sign up fail",
          subTitle: "Please enter your email in email format",
          buttons: ["close"]
        });
        alert.present();
        this.disableSubmit = false;
    } else if (this.password != this.repassword){
      var alert = this.alertCtrl.create({
          title: "Sign up fail",
          subTitle: "Password and Re password must be the same!",
          buttons: ["close"]
        });
        alert.present();
        this.disableSubmit = false;
    } else if (this.password.length < 8){
      var alert = this.alertCtrl.create({
        title: "Sign up fail",
        subTitle: "Password length should equal to 8 character or more than",
        buttons : ["close"]
      })
      alert.present();
      console.log('Password is too short');
      this.disableSubmit = false ;
    }
    else{
      this.http.post("https://lisahoroscope.herokuapp.com/api/signup",data)
        .subscribe(data =>{
          var alert = this.alertCtrl.create({
            title: data.json().title,
            subTitle: data.json().message,
            buttons: ["close"]
          });
        alert.present();
        this.disableSubmit = false;
        this.navCtrl.pop();
        },error => {
          var alert = this.alertCtrl.create({
            title: "Sign up fail",
            subTitle: "The email are already existing",
            buttons: ["close"]
          });
          alert.present();
          this.disableSubmit = false;
        });
      }
    
    
  }
}
