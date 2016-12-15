import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
export var HomePage = (function () {
    function HomePage(navCtrl, params, app, alertCtrl, events, http) {
        this.navCtrl = navCtrl;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.http = http;
        this.data = params.get('data');
        console.log(this.data);
    }
    HomePage.prototype.ngOnInit = function () {
        console.log("Initailize Home Page");
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
    ];
    return HomePage;
}());
//# sourceMappingURL=home.js.map