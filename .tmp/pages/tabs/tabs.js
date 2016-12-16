import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BrowsePage } from '../browse/browse';
import { ContactPage } from '../contact/contact';
import { ProfilePage } from '../profile/profile';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
export var TabsPage = (function () {
    function TabsPage(navCtrl, params, alertCtrl, http, loadingCtrl, storage) {
        var _this = this;
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
        var tabIndex = params.get('tabIndex');
        if (tabIndex) {
            this.tabIndex = tabIndex;
        }
        if (this.data.sign) {
            this.http.post('http://localhost:3000/auth/horoscope/' + this.data.sign, this.data)
                .subscribe(function (response) {
                _this.result = response.json();
                storage.set('title', _this.result.title);
                storage.set('work', _this.result.work);
                storage.set('finance', _this.result.finance);
                storage.set('love', _this.result.love);
                storage.set('healthy', _this.result.healthy);
                storage.set('luck', _this.result.luck);
            }, function (error) {
                console.log(error.text());
                var alert = _this.alertCtrl.create({
                    title: "Something went wrong",
                    buttons: ["Ok"]
                });
                alert.present();
            });
            var loader = this.loadingCtrl.create({
                content: "Loading ...",
                duration: 2000
            });
            loader.present();
        }
        else {
            var alert = this.alertCtrl.create({
                title: "No data",
                message: "You do not have a birthday please enter your birthday",
                buttons: ["Ok"]
            });
            alert.present();
        }
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
        { type: Storage, },
    ];
    return TabsPage;
}());
//# sourceMappingURL=tabs.js.map