import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ProfilePage } from '../profile/profile';
export var TabsPage = (function () {
    function TabsPage(navCtrl, params) {
        this.navCtrl = navCtrl;
        this.tab1Root = HomePage;
        this.tab2Root = AboutPage;
        this.tab3Root = ContactPage;
        this.tab4Root = ProfilePage;
        this.data = params.get("data");
    }
    TabsPage.prototype.share = function () {
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
    ];
    return TabsPage;
}());
//# sourceMappingURL=tabs.js.map