import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

/**
 * Pages
 */
import { HomePage } from '../pages/home/home';
import { NovoPostPage } from '../pages/novo-post/novo-post';
import { LerPostPage } from '../pages/ler-post/ler-post';

/**
 * Providers
 */
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { DaoProvider } from '../providers/dao/dao';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NovoPostPage,
    LerPostPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NovoPostPage,
    LerPostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    GeolocationProvider,
    GoogleMaps,
    DaoProvider
  ]
})
export class AppModule {}
