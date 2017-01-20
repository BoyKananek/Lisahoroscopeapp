import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HoroscopePage } from '../horoscope/horoscope';
import { GoogleAnalytics } from 'ionic-native';
export var BrowsePage = (function () {
    function BrowsePage(navCtrl, params) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.data = params.get('data');
        GoogleAnalytics.trackView("BrowsePage");
    }
    BrowsePage.prototype.gotoAries = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'aries', data: this.data });
    };
    BrowsePage.prototype.gotoTaurus = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'taurus', data: this.data });
    };
    BrowsePage.prototype.gotoGemini = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'gemini', data: this.data });
    };
    BrowsePage.prototype.gotoCancer = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'cancer', data: this.data });
    };
    BrowsePage.prototype.gotoLeo = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'leo', data: this.data });
    };
    BrowsePage.prototype.gotoVirgo = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'virgo', data: this.data });
    };
    BrowsePage.prototype.gotoLibra = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'libra', data: this.data });
    };
    BrowsePage.prototype.gotoScorpio = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'scorpio', data: this.data });
    };
    BrowsePage.prototype.gotoSagittarius = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'sagittarius', data: this.data });
    };
    BrowsePage.prototype.gotoCapricorn = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'capricorn', data: this.data });
    };
    BrowsePage.prototype.gotoAquarius = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'aquarius', data: this.data });
    };
    BrowsePage.prototype.gotoPisces = function () {
        this.navCtrl.push(HoroscopePage, { zodiac: 'pisces', data: this.data });
    };
    BrowsePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-browse',
                    templateUrl: 'browse.html'
                },] },
    ];
    /** @nocollapse */
    BrowsePage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
    ];
    return BrowsePage;
}());
//# sourceMappingURL=browse.js.map