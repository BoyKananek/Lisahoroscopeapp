import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
export var BrowsePage = (function () {
    function BrowsePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    BrowsePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-browse',
                    templateUrl: 'browse.html'
                },] },
    ];
    /** @nocollapse */
    BrowsePage.ctorParameters = [
        { type: NavController, },
    ];
    return BrowsePage;
}());
//# sourceMappingURL=browse.js.map