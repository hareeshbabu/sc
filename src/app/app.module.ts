import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DashPage } from '../pages/dash/dash';
import { LoginPage } from '../pages/login/login';
import { AttnPage } from '../pages/attn/attn';
import { LandingPage } from '../pages/landing/landing';
import { StureptPage } from '../pages/sturept/sturept';
import { OfflinePage } from '../pages/offline/offline';
import { RefreshdataPage } from '../pages/refreshdata/refreshdata';
import { FeecomponentsPage } from '../pages/feecomponents/feecomponents';
import { FeetermsPage } from '../pages/feeterms/feeterms';
import { StudentsPage } from '../pages/students/students';
import { StudentdetailsPage } from '../pages/studentdetails/studentdetails';
import { EditstudentPage } from '../pages/editstudent/editstudent';
import { ExamPage } from '../pages/exam/exam';
import { ExpmgrPage } from '../pages/expmgr/expmgr';
import { StufeePage } from '../pages/stufee/stufee';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MetaData } from '../services/metadata'
import { SCCom } from '../utilities/sccom';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DashPage,
    LoginPage,
    AttnPage,
    LandingPage,
    StureptPage,
    OfflinePage,
    RefreshdataPage,
    ProgressBarComponent,
    FeecomponentsPage,
    FeetermsPage,
    StudentsPage,
    StudentdetailsPage,
    EditstudentPage,
    ExamPage,
    ExpmgrPage,
    StufeePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,    
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DashPage,
    LoginPage,
    AttnPage,
    LandingPage,
    StureptPage,
    OfflinePage,
    RefreshdataPage,
    FeecomponentsPage,
    FeetermsPage,
    StudentsPage,
    StudentdetailsPage,
    EditstudentPage,
    ExamPage,
    ExpmgrPage,
    StufeePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MetaData,
    SCCom,
    FileTransfer,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    Network
  ]
})
export class AppModule {}
