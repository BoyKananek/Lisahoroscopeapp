import { Component } from '@angular/core';
import { Facebook } from 'ionic-native';
import { NavController, AlertController, Events, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
export var LoginPage = (function () {
    function LoginPage(navCtrl, alertCtrl, http, events, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.disableSubmit = false;
        this.data = null;
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        //Wait for events login wiht Facebook
        this.events.subscribe('logined', function (dataObj) {
            _this.disableSubmit = true;
            _this.data = dataObj[0];
            console.log(_this.data);
            console.log("Login with facebook Successful");
            _this.gotoProfile();
            _this.disableSubmit = false;
        });
    };
    LoginPage.prototype.onPageDidLeave = function () {
        return this.events.unsubscribe('logined', function () {
            console.log('Leaving page');
        });
    };
    LoginPage.prototype.forgotPassword = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        console.log('Saved clicked');
                        _this.forgetEmail = data.Email;
                        _this.requestToresetPass();
                    }
                }
            ]
        });
        prompt.present();
    };
    LoginPage.prototype.requestToresetPass = function () {
        var _this = this;
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
            this.http.post("https://lisahoroscope.herokuapp.com/forgetPassword", data)
                .subscribe(function (data) {
                var alert = _this.alertCtrl.create({
                    title: "Reset password proceed",
                    subTitle: "Please check your email address to continue",
                    buttons: ["close"]
                });
                alert.present();
            }, function (error) {
                var alert = _this.alertCtrl.create({
                    title: "Server down!",
                    buttons: ["close"]
                });
                alert.present();
            });
        }
    };
    LoginPage.prototype.gotoProfile = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Logging in ....",
            duration: 500
        });
        loader.present();
        console.log('GO to profile');
        this.http.get('https://lisahoroscope.herokuapp.com/api/userinfo/' + this.data.email)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log('getting info');
            console.log(data.birthdate);
            _this.birthdate = data.birthdate;
            _this.navCtrl.push(TabsPage, { user: _this.data, date: _this.birthdate });
        }, function (error) {
            console.log(error);
        });
    };
    LoginPage.prototype.gotoSignUp = function () {
        this.navCtrl.push(SignupPage);
    };
    LoginPage.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    LoginPage.prototype.loginEmail = function () {
        var _this = this;
        this.disableSubmit = true;
        console.log(this.navCtrl.length());
        var data = {
            email: this.email,
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
        }
        else if (!this.validateEmail(data.email)) {
            var alert = this.alertCtrl.create({
                title: "Login fail",
                subTitle: "Please enter your email in correct format",
                buttons: ["close"]
            });
            alert.present();
            this.disableSubmit = false;
        }
        else {
            console.log("Logging in with email");
            this.http.post("https://lisahoroscope.herokuapp.com/loginWithApp", data)
                .subscribe(function (data) {
                _this.data = data.json();
                if (_this.data.error === true) {
                    var alert = _this.alertCtrl.create({
                        title: "Login fail",
                        subTitle: _this.data.message,
                        buttons: ['close']
                    });
                    alert.present();
                    console.log('Login fail because wrong email');
                    _this.disableSubmit = false;
                }
                else {
                    console.log('Login Successful');
                    _this.disableSubmit = false;
                    _this.gotoProfile();
                    _this.email = null;
                    _this.password = null;
                }
            }, function (error) {
                var alert = _this.alertCtrl.create({
                    title: "Login fail",
                    subTitle: "Please check your networks",
                    buttons: ["close"]
                });
                alert.present();
                _this.disableSubmit = false;
            });
        }
    };
    LoginPage.prototype.loginFB = function () {
        //this.disableSubmit = true;
        var http = this.http;
        var events = this.events;
        facebookConnectPlugin.login(['public_profile', 'email'], function (response) {
            console.log("Starting login with FBBBBB!");
            facebookConnectPlugin.api("me/?fields=id,email,name", ["email"], function (result) {
                var id = result["id"];
                var token = result["token"];
                var email = result["email"];
                var name = result["name"];
                var dataObj = {
                    id: id,
                    token: token,
                    email: email,
                    name: name,
                };
                //events.publish('logined',dataObj);//trigger the event to start
                http.post("https://lisahoroscope.herokuapp.com/api/users", dataObj)
                    .subscribe(function (data) {
                    //this.data = data.json();
                    //console.log("FBBBBBBBBB" + JSON.stringify(data));
                    events.publish('logined', dataObj); //trigger the event to start
                    console.log("Successful");
                }, function (error) {
                    console.log("Failure");
                });
            }, function (error) {
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
        //this.disableSubmit = false;
    };
    LoginPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-login',
                    templateUrl: 'login.html',
                    providers: [Facebook]
                },] },
    ];
    /** @nocollapse */
    LoginPage.ctorParameters = [
        { type: NavController, },
        { type: AlertController, },
        { type: Http, },
        { type: Events, },
        { type: LoadingController, },
    ];
    return LoginPage;
}());
//# sourceMappingURL=login.js.map