import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
export var TutorialPage = (function () {
    function TutorialPage(navCtrl, params) {
        this.navCtrl = navCtrl;
        this.data = params.get('data');
        console.log(this.data);
    }
    TutorialPage.prototype.ionViewDidLoad = function () {
    };
    TutorialPage.prototype.nextPage = function () {
        this.navCtrl.push(TabsPage, { data: this.data });
    };
    TutorialPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-tutorial',
                    templateUrl: 'tutorial.html'
                },] },
    ];
    /** @nocollapse */
    TutorialPage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
    ];
    return TutorialPage;
}());
//# sourceMappingURL=tutorial.js.map