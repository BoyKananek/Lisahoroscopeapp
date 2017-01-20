import { Component } from '@angular/core';
import { Facebook, GoogleAnalytics } from 'ionic-native';
import { NavController, AlertController, Events, LoadingController, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { TermsOfServicesPage } from '../terms-of-services/terms-of-services';
import { TutorialPage } from '../tutorial/tutorial';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
export var LoginPage = (function () {
    function LoginPage(navCtrl, alertCtrl, http, events, loadingCtrl, app) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.PrivacyPolicyPage = PrivacyPolicyPage;
        this.TermsOfServicesPage = TermsOfServicesPage;
        this.disableSubmit = false;
        this.data = null;
        GoogleAnalytics.trackView('LoginPage');
    }
    LoginPage.prototype.loginHandler = function (dataObj) {
        this.data = dataObj[0];
        console.log("Login with facebook Successful");
        this.gotoProfile();
        //this.data = null;
    };
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        //Wait for events login wiht Facebook
        this._loginsub = function (dataObj) {
            _this.loginHandler(dataObj);
        };
        this.events.subscribe('logined', this._loginsub);
    };
    LoginPage.prototype.ionViewDidLeave = function () {
        console.log('Leaving this page');
        if (this._loginsub) {
            this.events.unsubscribe('logined', this._loginsub);
            this._loginsub = undefined;
            console.log("clear events");
        }
    };
    LoginPage.prototype.forgotPassword = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Let’s find your account',
            message: "Please enter your email address",
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
                    text: 'Submit',
                    handler: function (data) {
                        console.log('submit clicked');
                        _this.forgetEmail = data.Email.toLowerCase();
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
                title: "Sign up failed",
                subTitle: "Please enter your email",
                buttons: ["Close"]
            });
            alert.present();
        }
        else if (!this.validateEmail(this.forgetEmail)) {
            var alert = this.alertCtrl.create({
                title: "Sign up failed",
                subTitle: "Please enter your email in email format",
                buttons: ["Close"]
            });
            alert.present();
        }
        else {
            GoogleAnalytics.trackEvent("User", "Request new password");
            var data = {
                email: this.forgetEmail
            };
            this.http.post("https://horoscope.lisaguru.com/api/forgotPassword", data)
                .subscribe(function (data) {
                if (data.json().success == false) {
                    var alert = _this.alertCtrl.create({
                        title: "Error",
                        subTitle: data.json().message,
                        buttons: ["Close"]
                    });
                    alert.present();
                }
                else {
                    var alert = _this.alertCtrl.create({
                        title: "We just emailed you a link",
                        subTitle: "Please check your email address to continue.",
                        buttons: ["Close"]
                    });
                    alert.present();
                }
            }, function (error) {
                var alert = _this.alertCtrl.create({
                    title: "Connection failed",
                    subTitle: "Apologies for the inconvenience. Please try again later.",
                    buttons: ["Close"]
                });
                alert.present();
            });
        }
    };
    LoginPage.prototype.gotoProfile = function () {
        var _this = this;
        console.log('GO to profile');
        this.http.post('https://horoscope.lisaguru.com/auth/userinfo', this.data)
            .subscribe(function (data) {
            if (data.json().success == false) {
                var alert = _this.alertCtrl.create({
                    title: "Login Failed",
                    subTitle: _this.data.message,
                    buttons: ['Close']
                });
                alert.present();
            }
            else {
                if (_this.data.isNewUser === true) {
                    _this.navCtrl.push(TutorialPage, { data: data.json() });
                    _this.data = null;
                }
                else {
                    _this.app.getRootNav().setRoot(TabsPage, { data: data.json() });
                    _this.data = null;
                }
            }
        }, function (error) {
            console.log(error);
        });
        var loader = this.loadingCtrl.create({
            content: "Logging in ....",
            duration: 500,
            dismissOnPageChange: true
        });
        loader.present();
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
        if (this.email === undefined || this.password === undefined || this.email === null || this.password === null) {
            var alert = this.alertCtrl.create({
                title: "Login failed",
                subTitle: "Please enter your email and password",
                buttons: ["Close"]
            });
            alert.present();
            this.disableSubmit = false;
        }
        else {
            var data = {
                email: this.email.toLowerCase(),
                password: this.password
            };
            if (!this.email || !this.password) {
                var alert = this.alertCtrl.create({
                    title: "Login failed",
                    subTitle: "Please enter your email and password",
                    buttons: ["Close"]
                });
                alert.present();
                this.disableSubmit = false;
            }
            else if (!this.validateEmail(data.email)) {
                var alert = this.alertCtrl.create({
                    title: "Login failed",
                    subTitle: "Please make sure that you type in your email address correctly.",
                    buttons: ["Close"]
                });
                alert.present();
                this.disableSubmit = false;
            }
            else {
                GoogleAnalytics.trackEvent("User", "login with email");
                console.log("Logging in with email");
                this.http.post("https://horoscope.lisaguru.com/api/login", data)
                    .subscribe(function (data) {
                    _this.data = data.json();
                    if (_this.data.success === false) {
                        var alert = _this.alertCtrl.create({
                            title: "Login failed",
                            subTitle: _this.data.message,
                            buttons: ['Close']
                        });
                        alert.present();
                        _this.email = null;
                        _this.password = null;
                        _this.disableSubmit = false;
                    }
                    else if (_this.data.option == true) {
                        var alert = _this.alertCtrl.create({
                            title: "Login failed",
                            subTitle: _this.data.message,
                            buttons: [
                                {
                                    text: 'Resend the email',
                                    handler: function (data) {
                                        console.log('resend the email clicked');
                                        _this.resendEmail(_this.data.email);
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    handler: function (data) {
                                        console.log('Cancel clicked');
                                    }
                                }
                            ]
                        });
                        alert.present();
                        _this.email = null;
                        _this.password = null;
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
                        title: "Login failed",
                        subTitle: "Please try again later",
                        buttons: ["Close"]
                    });
                    alert.present();
                    _this.disableSubmit = false;
                });
            }
        }
    };
    LoginPage.prototype.resendEmail = function (email) {
        var _this = this;
        var data = {
            email: email
        };
        this.http.post("https://horoscope.lisaguru.com/api/resendEmail", data)
            .subscribe(function (data) {
            console.log('resend the email');
            var alert = _this.alertCtrl.create({
                title: data.json().title,
                subTitle: data.json().message,
                buttons: ["Close"]
            });
            alert.present();
        }, function (error) {
            var errorAlert = _this.alertCtrl.create({
                title: "Resend the email failed",
                subTitle: "Please try again later",
                buttons: ["Close"]
            });
            errorAlert.present();
        });
    };
    LoginPage.prototype.loginFB = function () {
        //this.disableSubmit = true;
        var http = this.http;
        var events = this.events;
        var alert = this.alertCtrl;
        GoogleAnalytics.trackEvent("User", "Login with facebook");
        facebookConnectPlugin.login(['public_profile', 'email'], function (response) {
            console.log("Starting login with FBBBBB!");
            facebookConnectPlugin.api("me/?fields=id,email,name,picture.type(large)", ["email"], function (result) {
                var id = result["id"];
                var email = result["email"];
                var name = result["name"];
                var picture = result["picture"];
                var dataObj = {
                    id: id,
                    email: email,
                    name: name,
                    picture: picture
                };
                http.post("https://horoscope.lisaguru.com/api/loginfb", dataObj)
                    .subscribe(function (data) {
                    events.publish('logined', data.json()); //trigger the event to start
                    console.log("Successful");
                }, function (error) {
                    var errorAlert = alert.create({
                        title: "Connection failed",
                        subTitle: "Apologies for the inconvenience. Please try again later.",
                        buttons: ["Close"]
                    });
                    errorAlert.present();
                    console.log("Failure");
                });
            }, function (error) {
                console.log("Error Login with facebook");
                console.log(error.message());
                var alert = this.alertCtrl.create({
                    title: "Connection failed",
                    subTitle: "Apologies for the inconvenience. Please try again later.",
                    buttons: ["Close"]
                });
                alert.present();
            });
        }, function (error) {
            console.log(error.message());
            console.log('Cancel!!!!!');
        });
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
        { type: App, },
    ];
    return LoginPage;
}());
//# sourceMappingURL=login.js.map