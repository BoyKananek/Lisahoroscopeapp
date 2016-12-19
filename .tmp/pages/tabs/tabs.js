import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BrowsePage } from '../browse/browse';
import { ContactPage } from '../contact/contact';
import { ProfilePage } from '../profile/profile';
import { Http } from '@angular/http';
export var TabsPage = (function () {
    function TabsPage(navCtrl, params, alertCtrl, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.tab1Root = HomePage;
        this.tab2Root = BrowsePage;
        this.tab3Root = ContactPage;
        this.tab4Root = ProfilePage;
        this.tabIndex = 0;
        this.data = params.get('data');
    }
    TabsPage.prototype.share = function () {
        var alert = this.alertCtrl.create({
            title: "Share on social",
            buttons: ["close"]
        });
        alert.present();
    };
    TabsPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'tabs.html'
                },] },
    ];
    /** @nocollapse */
    TabsPage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: AlertController, },
        { type: Http, },
        { type: LoadingController, },
    ];
    return TabsPage;
}());
//# sourceMappingURL=tabs.js.map