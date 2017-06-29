import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, Events, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GoogleAnalytics } from 'ionic-native';
import { LoginPage } from '../login/login';
export var HomePage = (function () {
    function HomePage(navCtrl, params, app, alertCtrl, events, http, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.isDataAvailable = false;
        GoogleAnalytics.trackView("TodayPage");
        this.data = params.get('data');
        if (this.data.type != 'guest') {
            this.http.post('https://horoscope.lisaguru.com/auth/userinfo', this.data)
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
                        _this.imgsign = "assets/img/" + _this.data.sign + ".png";
                        //pull result
                        var loader = _this.loadingCtrl.create({
                            content: "Loading ...",
                            duration: 4000,
                            dismissOnPageChange: true
                        });
                        loader.present();
                        _this.http.post('https://horoscope.lisaguru.com/auth/horoscope/' + _this.data.sign, _this.data)
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
        }
    }
    HomePage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.http.post('https://horoscope.lisaguru.com/auth/userinfo', this.data)
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
                    _this.imgsign = "assets/img/" + _this.data.sign + ".png";
                    //pull result
                    var loader = _this.loadingCtrl.create({
                        content: "Loading ...",
                        duration: 4000,
                        dismissOnPageChange: true
                    });
                    loader.present();
                    _this.http.post('https://horoscope.lisaguru.com/auth/horoscope/' + _this.data.sign, _this.data)
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
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.data.type == 'guest') {
            var alert = this.alertCtrl.create({
                title: "This feature is required to login first.",
                subTitle: "Do you want to login? ",
                buttons: [
                    {
                        text: 'Yes',
                        handler: function () {
                            _this.app.getRootNav().setRoot(LoginPage);
                        }
                    },
                    {
                        text: 'No',
                        handler: function () {
                            _this.navCtrl.parent.select(1);
                        }
                    }
                ]
            });
            alert.present();
        }
        /*this.http.post('https://horoscope.lisaguru.com/auth/userinfo', this.data)
          .subscribe(data => {
            if (data.json().success == false) {
              console.log('Pull user data error');
              var alert = this.alertCtrl.create({
                title: data.json().message,
                buttons: ["Ok"]
              });
              alert.present();
              this.app.getRootNav().setRoot(LoginPage);
            } else {
              this.data = data.json();
              if (this.data.birthday) {
                this.imgsign = "assets/img/" + this.data.sign + ".png";
                //pull result
                let loader = this.loadingCtrl.create({
                  content: "Loading ...",
                  duration: 4000,
                  dismissOnPageChange: true
                });
                loader.present();
                this.http.post('https://horoscope.lisaguru.com/auth/horoscope/' + this.data.sign, this.data)
                  .subscribe(
                  response => {
                    if (response.json().success == false) {
                      var alert = this.alertCtrl.create({
                        title: response.json().message,
                        buttons: ["Ok"]
                      });
                      alert.present();
                      this.app.getRootNav().setRoot(LoginPage);
                    }
                    this.result = response.json();
                    this.isDataAvailable = true;
    
                  },
                  error => {
                    console.log(error.text());
                    var alert = this.alertCtrl.create({
                      title: "Something went wrong",
                      buttons: ["Ok"]
                    });
                    alert.present();
                  }
                  );
              }
              else {
                var alert = this.alertCtrl.create({
                  title: "No data",
                  subTitle: "Please enter your birthday in your profile",
                  buttons: ["close"]
                });
                alert.present();
                this.navCtrl.parent.select(3);
              }
            }
          }, error => {
            console.log(error);
          });*/
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