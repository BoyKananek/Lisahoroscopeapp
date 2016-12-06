import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Facebook } from 'ionic-native';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
export var ProfilePage = (function () {
    function ProfilePage(navCtrl, params, app, alertCtrl, events) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.data = params.get('data');
        this.date = params.get('date');
        //check image which is exist or not
        if (this.data.type == 'email') {
            this.image = 'assets/img/profile.jpg';
        }
        else {
            this.image = this.data.picture.data.url;
        }
    }
    ProfilePage.prototype.ngOnInit = function () {
        this.events.subscribe('logout', function (data) {
            facebookConnectPlugin.getLoginStatus(function onLoginStatus(status) {
                console.log(status);
            });
            console.log("Logging out with facebook");
            /*this.events.unsubscribe('logout', () => {
                console.log('unsubscribed logout');
            });*/
        });
    };
    ProfilePage.prototype.ngOnDestroy = function () {
        this.events.unsubscribe('logout', function () {
            console.log('unsubscribed logout');
        });
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
                            _this.app.getRootNav().setRoot(LoginPage);
                        }
                        else {
                            //facebook logout
                            console.log('Logout with facebook');
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
    ];
    return ProfilePage;
}());
//# sourceMappingURL=profile.js.map