import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import 'rxjs/add/operator/map';

/**
 * Pages
 */
import { HomePage } from '../pages/home/home';
import { NovoPostPage } from '../pages/novo-post/novo-post';
import { FeedPage } from '../pages/feed/feed';

/**
 * Providers
 */
import { PostServiceProvider } from '../providers/post-service/post-service';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NovoPostPage,
    FeedPage
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
    FeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    HTTP,
    PostServiceProvider,
    GeolocationProvider
  ]
})
export class AppModule {}
