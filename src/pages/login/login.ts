import { Component } from '@angular/core';
import { App, AlertController, NavController, LoadingController, MenuController, Loading, ToastController, NavParams } from 'ionic-angular';
import { DashPage } from '../dash/dash';
import { HomePage } from '../home/home';
import { RefreshdataPage } from '../refreshdata/refreshdata';
import { Storage } from '@ionic/storage';

import { MetaData } from '../../services/metadata'
import { AuthResponse } from '../../models/appmodel';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: { username?: string, password?: string, logintype?: number } = {};
  submitted = false;
  Locations: Location[];
  Loading: Loading;
  IsStudentLogin: boolean = false;
  logintype: number = 1;
  name: string;
  email: string;
  createSuccess = false;
  registerCredentials = { email: '', password: '' };
  AuthResp: AuthResponse;
  ErrorMessage: string = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public metadata: MetaData,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public appCtrl: App
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  authenticate() {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.metadata.Authenticate(this.login.username, this.login.password).subscribe(data => {
      this.AuthResp = data;
      if (this.AuthResp.Status == "S") {
        this.storage.set('AuthResp', JSON.stringify(data));
        this.navCtrl.setRoot(RefreshdataPage);
      } else {
        this.ErrorMessage = this.AuthResp.Message;
      }
      loader.dismiss();
    }, err => {
      loader.dismiss();
    });
  }
  onLogInSelectChange(e) {
    if (this.logintype == 1)
      this.IsStudentLogin = false;
    else
      this.IsStudentLogin = true;
  }
}
