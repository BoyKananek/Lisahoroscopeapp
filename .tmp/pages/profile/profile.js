import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Facebook } from 'ionic-native';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
export var ProfilePage = (function () {
    function ProfilePage(navCtrl, params, app, alertCtrl, events, http) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.http = http;
        this.disableSubmit = false;
        this.data = params.get('data');
        this.date = this.data.birthday;
        //check image which is exist or not
        if (this.data.type == "email") {
            this.image = 'assets/img/profile.jpg';
        }
        else {
            this.image = this.data.picture;
        }
    }
    ProfilePage.prototype.logoutHandler = function () {
        facebookConnectPlugin.getLoginStatus(function onLoginStatus(status) {
            console.log(status);
        });
        console.log("Logging out with facebook");
    };
    ProfilePage.prototype.ngOnInit = function () {
        var _this = this;
        this._logoutsub = function () {
            _this.logoutHandler();
        };
        this.events.subscribe('logout', this._logoutsub);
    };
    ProfilePage.prototype.ionViewDidLeave = function () {
        console.log('Leaving this page');
        if (this._logoutsub) {
            this.events.unsubscribe('logout', this._logoutsub);
            this._logoutsub = undefined;
            console.log("clear events");
        }
    };
    ProfilePage.prototype.submit = function () {
        var _this = this;
        this.disableSubmit = true;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if (this.date === null || this.date === '') {
            console.log("Enter birthdate first.....");
            var alert = this.alertCtrl.create({
                title: "Please enter your birthdate first...",
                buttons: ["Ok"]
            });
            alert.present();
        }
        else {
            this.http.put('https://lisahoroscope.herokuapp.com/api/updateUser/' + this.data.email + '/' + this.date, null, { headers: headers })
                .subscribe(function (response) {
                console.log(response.text());
                var alert = _this.alertCtrl.create({
                    title: "Already update profile",
                    buttons: ["Ok"]
                });
                alert.present();
                _this.disableSubmit = false;
            }, function (error) {
                console.log(error.text());
                var alert = _this.alertCtrl.create({
                    title: "Something went wrong",
                    buttons: ["Ok"]
                });
                alert.present();
                _this.disableSubmit = false;
            });
        }
    };
    ProfilePage.prototype.logout = function () {
        var _this = this;
        var events = this.events;
        var comfirm = this.alertCtrl.create({
            title: 'Logging out?',
            message: 'Do you want to log out?',
            buttons: [
                {
                    text: 'Yes',
                    handler: function () {
                        if (_this.data.type === "email") {
                            console.log('Logout with email');
                            _this.http.post('http://localhost:3000/api/logout', _this.data)
                                .subscribe(function (data) {
                                console.log('Remove session!!');
                            }, function (error) {
                                console.log(error);
                            });
                            _this.app.getRootNav().setRoot(LoginPage);
                        }
                        else {
                            //facebook logout
                            console.log('Logout with facebook');
                            _this.http.post('http://localhost:3000/api/logout', _this.data)
                                .subscribe(function (data) {
                                console.log('Remove session!!');
                            }, function (error) {
                                console.log(error);
                            });
                            _this.app.getRootNav().setRoot(LoginPage);
                            facebookConnectPlugin.logout(function (result) {
                                console.log('Facebook logout successful');
                                var tem = {
                                    logout: true
                                };
                                events.publish('logout', tem); //trigger the event to start
                            }, function (err) {
                                console.log(err);
                            });
                        }
                    }
                },
                {
                    text: 'No',
                    handler: function () {
                        console.log('Nothing');
                    }
                }
            ]
        });
        comfirm.present();
    };
    ProfilePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-profile',
                    templateUrl: 'profile.html',
                    providers: [Facebook]
                },] },
    ];
    /** @nocollapse */
    ProfilePage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: App, },
        { type: AlertController, },
        { type: Events, },
        { type: Http, },
    ];
    return ProfilePage;
}());
//# sourceMappingURL=profile.js.map