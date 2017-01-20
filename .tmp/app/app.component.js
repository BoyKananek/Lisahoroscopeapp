import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen, GoogleAnalytics } from 'ionic-native';
import { Push } from '@ionic/cloud-angular';
import { LoginPage } from '../pages/login/login';
export var MyApp = (function () {
    function MyApp(platform, push, alertCtr) {
        var _this = this;
        this.push = push;
        this.alertCtr = alertCtr;
        this.rootPage = LoginPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.initGoogleAnalytics();
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
        this.push.register().then(function (t) {
            return _this.push.saveToken(t);
        }).then(function (t) {
            console.log('Token saved:', t.token);
        });
        this.push.rx.notification()
            .subscribe(function (msg) {
            GoogleAnalytics.trackEvent("User", "Come with notification");
            var alert = _this.alertCtr.create({
                title: msg.title,
                subTitle: msg.text,
                buttons: ["Close"]
            });
            alert.present();
        });
    }
    MyApp.prototype.initGoogleAnalytics = function () {
        var trackingID = 'UA-1947597-21';
        GoogleAnalytics.startTrackerWithId(trackingID).then(function () {
            console.log('Google analytics is ready now');
            GoogleAnalytics.trackView("Start app");
        })
            .catch(function (e) { return console.log("Error starting google analytics"); });
    };
    MyApp.decorators = [
        { type: Component, args: [{
                    template: "<ion-nav [root]=\"rootPage\"></ion-nav>"
                },] },
    ];
    /** @nocollapse */
    MyApp.ctorParameters = [
        { type: Platform, },
        { type: Push, },
        { type: AlertController, },
    ];
    return MyApp;
}());
//# sourceMappingURL=app.component.js.map