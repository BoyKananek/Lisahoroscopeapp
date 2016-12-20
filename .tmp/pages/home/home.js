import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, Events, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
export var HomePage = (function () {
    function HomePage(navCtrl, params, app, alertCtrl, events, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.isDataAvailable = false;
        this.data = params.get('data');
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.http.post('http://localhost:3000/auth/userinfo', this.data)
            .subscribe(function (data) {
            if (data.json().success == false) {
                console.log('Pull user data error');
                var alert = _this.alertCtrl.create({
                    title: data.json().message,
                    buttons: ["Ok"]
                });
                alert.present();
                _this.app.getRootNav().setRoot(LoginPage);
            }
            else {
                _this.data = data.json();
                if (_this.data.birthday) {
                    _this.imgsign = "assets/img/" + _this.data.sign + ".jpg";
                    //pull result
                    var loader = _this.loadingCtrl.create({
                        content: "Loading ...",
                        duration: 4000,
                        dismissOnPageChange: true
                    });
                    loader.present();
                    _this.http.post('http://localhost:3000/auth/horoscope/' + _this.data.sign, _this.data)
                        .subscribe(function (response) {
                        if (response.json().success == false) {
                            var alert = _this.alertCtrl.create({
                                title: response.json().message,
                                buttons: ["Ok"]
                            });
                            alert.present();
                            _this.app.getRootNav().setRoot(LoginPage);
                        }
                        _this.result = response.json();
                        _this.isDataAvailable = true;
                    }, function (error) {
                        console.log(error.text());
                        var alert = _this.alertCtrl.create({
                            title: "Something went wrong",
                            buttons: ["Ok"]
                        });
                        alert.present();
                    });
                }
                else {
                    var alert = _this.alertCtrl.create({
                        title: "No data",
                        subTitle: "Please enter your birthday in your profile",
                        buttons: ["close"]
                    });
                    alert.present();
                    _this.navCtrl.parent.select(3);
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    HomePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-home',
                    templateUrl: 'home.html',
                },] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: App, },
        { type: AlertController, },
        { type: Events, },
        { type: Http, },
        { type: LoadingController, },
    ];
    return HomePage;
}());
//# sourceMappingURL=home.js.map