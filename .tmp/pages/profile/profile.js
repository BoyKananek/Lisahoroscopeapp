import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, Events, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Facebook } from 'ionic-native';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
export var ProfilePage = (function () {
    function ProfilePage(navCtrl, params, app, alertCtrl, events, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.disableSubmit = false;
        this.data = params.get('data');
        this.date = this.data.birthday;
        //check image which is exist or not
        if (this.data.type == "email") {
            this.image = 'assets/img/profile.png';
        }
        else {
            this.image = this.data.picture;
        }
    }
    ProfilePage.prototype.ionViewDidEnter = function () {
        var temp = this.date.split('-');
        console.log(temp[1]);
        if (temp[1] === '01' || temp[1] === 'Jan') {
            this.month = 'Jan';
        }
        else if (temp[1] === '02' || temp[1] === 'Feb') {
            this.month = 'Feb';
        }
        else if (temp[1] === '03' || temp[1] === 'Mar') {
            this.month = 'Mar';
        }
        else if (temp[1] === '04' || temp[1] === 'Apr') {
            this.month = 'Apr';
        }
        else if (temp[1] === '05' || temp[1] === 'May') {
            this.month = 'May';
        }
        else if (temp[1] === '06' || temp[1] === 'Jun') {
            this.month = 'Jun';
        }
        else if (temp[1] === '07' || temp[1] === 'Jul') {
            this.month = 'Jul';
        }
        else if (temp[1] === '08' || temp[1] === 'Aug') {
            this.month = 'Aug';
        }
        else if (temp[1] === '09' || temp[1] === 'Sep') {
            this.month = 'Sep';
        }
        else if (temp[1] === '10' || temp[1] === 'Oct') {
            this.month = 'Oct';
        }
        else if (temp[1] === '11' || temp[1] === 'Nov') {
            this.month = 'Nov';
        }
        else if (temp[1] === '12' || temp[1] === 'Dec') {
            this.month = 'Dec';
        }
        this.year = temp[0];
        this.day = temp[2];
    };
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
    ProfilePage.prototype.dateChanged = function (date) {
        var temp = this.date.split('-');
        console.log(temp[1]);
        if (temp[1] === '01' || temp[1] === 'Jan') {
            this.month = 'Jan';
        }
        else if (temp[1] === '02' || temp[1] === 'Feb') {
            this.month = 'Feb';
        }
        else if (temp[1] === '03' || temp[1] === 'Mar') {
            this.month = 'Mar';
        }
        else if (temp[1] === '04' || temp[1] === 'Apr') {
            this.month = 'Apr';
        }
        else if (temp[1] === '05' || temp[1] === 'May') {
            this.month = 'May';
        }
        else if (temp[1] === '06' || temp[1] === 'Jun') {
            this.month = 'Jun';
        }
        else if (temp[1] === '07' || temp[1] === 'Jul') {
            this.month = 'Jul';
        }
        else if (temp[1] === '08' || temp[1] === 'Aug') {
            this.month = 'Aug';
        }
        else if (temp[1] === '09' || temp[1] === 'Sep') {
            this.month = 'Sep';
        }
        else if (temp[1] === '10' || temp[1] === 'Oct') {
            this.month = 'Oct';
        }
        else if (temp[1] === '11' || temp[1] === 'Nov') {
            this.month = 'Nov';
        }
        else if (temp[1] === '12' || temp[1] === 'Dec') {
            this.month = 'Dec';
        }
        this.year = temp[0];
        this.day = temp[2];
    };
    ;
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
            //update user data
            this.http.post('https://lisahoroscope.herokuapp.com/auth/updateUser/' + this.date, this.data)
                .subscribe(function (response) {
                var loader = _this.loadingCtrl.create({
                    content: "Loading ...",
                    duration: 500,
                    dismissOnPageChange: true
                });
                loader.present();
                if (response.json().success == true) {
                    _this.http.post('https://lisahoroscope.herokuapp.com/auth/userinfo', _this.data)
                        .subscribe(function (data) {
                        if (data.json().success == false) {
                            console.log('Pull user data error');
                        }
                        else {
                            console.log("New user data");
                            _this.data = data.json();
                        }
                        var alert = _this.alertCtrl.create({
                            title: "Profile updated",
                            subTitle: "Your profile has been successfully updated",
                            buttons: ["Ok"]
                        });
                        alert.present();
                    }, function (error) {
                        console.log(error);
                    });
                }
                else if (response.json().success == false) {
                    var alert = _this.alertCtrl.create({
                        title: response.json().message,
                        buttons: ["Ok"]
                    });
                    alert.present();
                    _this.app.getRootNav().setRoot(LoginPage);
                }
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
                            _this.http.post('https://lisahoroscope.herokuapp.com/api/logout', _this.data)
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
                            _this.http.post('https://lisahoroscope.herokuapp.com/api/logout', _this.data)
                                .subscribe(function (data) {
                                console.log('Remove session!!');
                            }, function (error) {
                                console.log(error);
                            });
                            _this.navCtrl.pop();
                            _this.app.getRootNav().setRoot(LoginPage);
                            facebookConnectPlugin.logout(function (result) {
                                console.log('Facebook logout successful');
                                var tem = {
                                    logout: true
                                };
                                events.publish('logout'); //trigger the event to start
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
        { type: LoadingController, },
    ];
    return ProfilePage;
}());
//# sourceMappingURL=profile.js.map