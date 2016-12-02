import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
export var ProfilePage = (function () {
    function ProfilePage(navCtrl, params) {
        this.navCtrl = navCtrl;
        this.data = params.data;
        console.log("profile:::" + JSON.stringify(this.data));
    }
    ProfilePage.prototype.logout = function () {
        console.log(this.navCtrl.length);
    };
    ProfilePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-profile',
                    templateUrl: 'profile.html'
                },] },
    ];
    /** @nocollapse */
    ProfilePage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
    ];
    return ProfilePage;
}());
//# sourceMappingURL=profile.js.map