import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, Events, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
export var HomePage = (function () {
    function HomePage(navCtrl, params, app, alertCtrl, events, http, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.data = params.get('data');
    }
    HomePage.prototype.ionViewDidEnter = function () {
        this.storage.get('title').then(function (val) {
            console.log(val);
        });
        console.log(this.result);
        if (this.data.birthday) {
            this.imgsign = "assets/img/" + this.data.sign + ".jpg";
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
        { type: Storage, },
    ];
    return HomePage;
}());
//# sourceMappingURL=home.js.map