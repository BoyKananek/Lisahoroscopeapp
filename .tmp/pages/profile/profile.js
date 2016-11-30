import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
export var ProfilePage = (function () {
    function ProfilePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ProfilePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-profile',
                    templateUrl: 'profile.html'
                },] },
    ];
    /** @nocollapse */
    ProfilePage.ctorParameters = [
        { type: NavController, },
    ];
    return ProfilePage;
}());
//# sourceMappingURL=profile.js.map