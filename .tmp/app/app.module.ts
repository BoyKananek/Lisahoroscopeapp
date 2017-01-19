import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowsePage } from '../pages/browse/browse';
import { HoroscopePage } from '../pages/horoscope/horoscope';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermsOfServicesPage } from '../pages/terms-of-services/terms-of-services';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'e1187cb0',
  },
  'push': {
    'sender_id': '397348636938',
    'pluginConfig': {
      'ios': {
        'alert': true,
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
}; 

@NgModule({
  declarations: [
    MyApp,
    BrowsePage,
    HoroscopePage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    PrivacyPolicyPage,
    TermsOfServicesPage,
    TutorialPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BrowsePage,
    HoroscopePage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    PrivacyPolicyPage,
    TermsOfServicesPage,
    TutorialPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
