import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
export var ProfilePage = (function () {
    function ProfilePage(navCtrl, params) {
        this.navCtrl = navCtrl;
        this.data = params.get('data');
        //check image which is exist or not
        if (this.data.type == 'email') {
            this.image = 'assets/img/profile.jpg';
        }
        else {
            this.image = this.data.picture.data.url;
        }
    }
    ProfilePage.prototype.logout = function () {
        console.log("LOGOUT");
        this.navCtrl.setRoot(LoginPage);
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