import { Component } from '@angular/core';
import { Facebook } from 'ionic-native';
import { NavController,NavParams } from 'ionic-angular';
import { HoroscopePage } from '../horoscope/horoscope';

@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html'
})
export class BrowsePage {
  data : any;
  constructor(public navCtrl: NavController, public params: NavParams) {
    this.data = params.get('data');
    
  }
  gotoAries() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'aries',data: this.data });
  }
  gotoTaurus() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'taurus',data: this.data });
  }
  gotoGemini() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'gemini',data: this.data });
  }
  gotoCancer() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'cancer',data: this.data });
  }
  gotoLeo() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'leo',data: this.data });
  }
  gotoVirgo() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'virgo',data: this.data });
  }
  gotoLibra() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'libra',data: this.data });
  }
  gotoScorpio() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'scorpio',data: this.data });
  }
  gotoSagittarius() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'sagittarius',data: this.data });
  }
  gotoCapricorn() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'capricorn',data: this.data });
  }
  gotoAquarius() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'aquarius',data: this.data });
  }
  gotoPisces() {
    this.navCtrl.push(HoroscopePage, { zodiac: 'pisces',data: this.data });
  }
}
