import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ProfilePage } from '../profile/profile';
export var TabsPage = (function () {
    function TabsPage(navCtrl, params, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.tab1Root = HomePage;
        this.tab2Root = AboutPage;
        this.tab3Root = ContactPage;
        this.tab4Root = ProfilePage;
        this.data = params.get('data');
        this.date = params.get('date');
        console.log("TABS:::::" + JSON.stringify(this.data));
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
    ];
    return TabsPage;
}());
//# sourceMappingURL=tabs.js.map