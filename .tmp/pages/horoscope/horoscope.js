import { Component } from '@angular/core';
import { NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { GoogleAnalytics } from 'ionic-native';
export var HoroscopePage = (function () {
    function HoroscopePage(navCtrl, params, app, http, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.app = app;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.isDataAvailable = false;
        this.sign = params.get('zodiac');
        this.data = params.get('data');
        GoogleAnalytics.trackView("HoroscopePage");
    }
    HoroscopePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.http.post('https://lisahoroscope.herokuapp.com/auth/userinfo', this.data)
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
                //update data session;
                _this.data = data.json();
                _this.imgsign = "assets/img/" + _this.sign + ".png";
                var loader = _this.loadingCtrl.create({
                    content: "Loading ...",
                    duration: 4000,
                    dismissOnPageChange: true
                });
                loader.present();
                _this.http.post('https://lisahoroscope.herokuapp.com/auth/horoscope/' + _this.sign, _this.data)
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
                        title: "Server down",
                        message: "Please try again later",
                        buttons: ["Ok"]
                    });
                    alert.present();
                });
            }
        }, function (error) {
            console.log(error);
        });
    };
    HoroscopePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-horoscope',
                    templateUrl: 'horoscope.html'
                },] },
    ];
    /** @nocollapse */
    HoroscopePage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: App, },
        { type: Http, },
        { type: LoadingController, },
        { type: AlertController, },
    ];
    return HoroscopePage;
}());
//# sourceMappingURL=horoscope.js.map