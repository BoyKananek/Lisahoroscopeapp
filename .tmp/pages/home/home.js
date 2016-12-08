import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
export var HomePage = (function () {
    function HomePage(navCtrl, app) {
        this.navCtrl = navCtrl;
        this.app = app;
        console.log("HomePage");
    }
    HomePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-home',
                    templateUrl: 'home.html',
                },] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = [
        { type: NavController, },
        { type: App, },
    ];
    return HomePage;
}());
//# sourceMappingURL=home.js.map