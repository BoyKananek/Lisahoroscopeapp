import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
/*
  Generated class for the TermsOfServices page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var TermsOfServicesPage = (function () {
    function TermsOfServicesPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    TermsOfServicesPage.prototype.ionViewDidLoad = function () {
        console.log('Hello TermsOfServicesPage Page');
    };
    TermsOfServicesPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-terms-of-services',
                    templateUrl: 'terms-of-services.html'
                },] },
    ];
    /** @nocollapse */
    TermsOfServicesPage.ctorParameters = [
        { type: NavController, },
    ];
    return TermsOfServicesPage;
}());
//# sourceMappingURL=terms-of-services.js.map