import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DashPage } from '../pages/dash/dash';
import { LoginPage } from '../pages/login/login';
import { AttnPage } from '../pages/attn/attn';
import { StureptPage } from '../pages/sturept/sturept';
import { OfflinePage } from '../pages/offline/offline';
import { RefreshdataPage } from '../pages/refreshdata/refreshdata';
import { StudentsPage } from '../pages/students/students';
import { StudentdetailsPage } from '../pages/studentdetails/studentdetails';
import { ExamPage } from '../pages/exam/exam';
import { ExpmgrPage } from '../pages/expmgr/expmgr';
import { StufeePage } from '../pages/stufee/stufee';

import { AuthResponse } from '../models/appmodel';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  activePage = new Subject();
  pages: Array<{ title: string, component: any, active: boolean, icon: string, showcount: boolean }>;
  rightMenuItems: Array<{ icon: string, active: boolean }>;
  state: any;
  user: AuthResponse = new AuthResponse();
  OfflineCount: number = 0;


  // appPages: PageInterface[] = [
  //   { title: 'Dashboard', name: 'DashboardPage', component: DashPage, icon: 'analytics' },
  //   { title: 'Students', name: 'StudentsPage', component: StudentsPage, icon: 'contacts' },
  //   { title: 'Attendence', name: 'AttnPage', component: AttnPage, icon: 'information-circle' },
  //   { title: 'Offline', name: 'OfflinePage', component: OfflinePage, icon: 'cloud-upload' },
  //   { title: 'Student Report', name: 'StureptPage', component: StureptPage, icon: 'document' }
  // ];
  // loggedInPages: PageInterface[] = [
  //   { title: 'Support', name: 'SupportPage', component: HomePage, icon: 'help' },
  //   { title: 'Logout', name: 'LogoutPage', component: HomePage, icon: 'log-out', logsOut: true }
  // ];
  // loggedOutPages: PageInterface[] = [
  //   { title: 'Logout', name: 'LogoutPage', component: HomePage, icon: 'log-out' },
  //   { title: 'Support', name: 'SupportPage', component: HomePage, icon: 'help' },
  // ];
  rootPage: any;


  //pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    private storage: Storage,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
    storage.get('AuthResp').then((val) => {
      if (val){
        this.user = JSON.parse(val);
        this.rootPage = RefreshdataPage;
      }
      else {
        this.user.FirstName = "";
        this.user.LastName = "";
        this.rootPage = LoginPage;
      }
    });
    storage.get('Attn').then((val) => {
      var data = JSON.parse(val);
      console.log(data);
      var attnoffdata = [];
      if (data != undefined) {
        data.forEach(element => {
          var present = element.data.filter(m => m.IsPresent == true).length;
          var absent = element.data.filter(m => m.IsPresent == false).length;
          var elem = {
            ClassID: element.ClassID,
            ClassName: element.ClassName,
            Date: element.Date,
            present: present,
            absent: absent
          };
          attnoffdata.push(elem);
        });
        this.OfflineCount = attnoffdata.length;
      } else {
        this.OfflineCount = 0;
      }
    });
    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];
    this.rightMenuItems = [
      { icon: 'home', active: true },
      { icon: 'contacts', active: false },
      { icon: 'analytics', active: false },
      { icon: 'archive', active: false },
      { icon: 'basket', active: false },
      { icon: 'body', active: false },
      { icon: 'bookmarks', active: false },
      { icon: 'camera', active: false },
      { icon: 'beer', active: false },
      { icon: 'power', active: false },
    ];

    this.pages = [
      { title: 'Dashboard', component: DashPage, active: true, icon: 'home', showcount: false },
      { title: 'Students', component: StudentsPage, active: false, icon: 'contacts', showcount: false },
      { title: 'Attendence', component: AttnPage, active: false, icon: 'analytics', showcount: false },
      { title: 'Offline', component: OfflinePage, active: false, icon: 'cloud-upload', showcount: true },
      { title: 'Examinations', component: ExamPage, active: false, icon: 'laptop', showcount: false },
      { title: 'Expense Manager', component: ExpmgrPage, active: false, icon: 'cash', showcount: false },
      { title: 'Need Help', component: HomePage, active: false, icon: 'bookmarks', showcount: false },
      { title: 'Rate Us', component: HomePage, active: false, icon: 'book', showcount: false },
      { title: 'Settings', component: HomePage, active: false, icon: 'map', showcount: false },
      { title: 'Logout', component: HomePage, active: false, icon: 'log-out', showcount: false }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title != "Logout") {
      this.nav.setRoot(page.component);
    }
    else {
      this.storage.ready().then(
        () => {
          this.storage.remove("AuthResp");
        });
      //this.storage.set('AuthResp', undefined);
      this.nav.setRoot(LoginPage);
    }
    this.storage.get('Attn').then((val) => {
      var data = JSON.parse(val);
      console.log(data);
      var attnoffdata = [];
      if (data != undefined) {
        data.forEach(element => {
          var present = element.data.filter(m => m.IsPresent == true).length;
          var absent = element.data.filter(m => m.IsPresent == false).length;
          var elem = {
            ClassID: element.ClassID,
            ClassName: element.ClassName,
            Date: element.Date,
            present: present,
            absent: absent
          };
          attnoffdata.push(elem);
        });
        this.OfflineCount = attnoffdata.length;
      } else {
        this.OfflineCount = 0;
      }
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
