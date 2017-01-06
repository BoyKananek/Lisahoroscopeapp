import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/*
  Generated class for the PrivacyPolicy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var PrivacyPolicyPage = (function () {
    function PrivacyPolicyPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    PrivacyPolicyPage.prototype.ionViewDidLoad = function () {
        console.log('Hello PrivacyPolicyPage Page');
    };
    PrivacyPolicyPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-privacy-policy',
                    templateUrl: 'privacy-policy.html'
                },] },
    ];
    /** @nocollapse */
    PrivacyPolicyPage.ctorParameters = [
        { type: NavController, },
    ];
    return PrivacyPolicyPage;
}());
//# sourceMappingURL=privacy-policy.js.map