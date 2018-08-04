import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Loading, Alert, ToastController } from 'ionic-angular';
import { MetaData } from '../../services/metadata'
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';

import { ExamsubjPage } from '../examsubj/examsubj';
import { ExamClassMapData } from '../../models/appmodel';
@IonicPage()
@Component({
  selector: 'page-examcls',
  templateUrl: 'examcls.html',
})
export class ExamclsPage {
  ExaminationID: number;
  examclass: ExamClassMapData[];
  allcalssmapdata: ExamClassMapData[];
  IsData: boolean = false;
  ExamClsSearchTerm: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alrtCtrl: AlertController,
    public metadata: MetaData,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private sqlite: SQLite,
    private network: Network,
    public toastCtrl: ToastController
  ) {
    this.ExaminationID = this.navParams.get('ExamID');
    this.getExamClassMapData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamclsPage');
  }
  getExamClassMapData() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.metadata.getExamClassData(this.ExaminationID).subscribe(data => {
      this.examclass = data;
      this.allcalssmapdata = data;
      if (this.examclass.length > 0)
        this.IsData = true;
      else
        this.IsData = false;
      loading.dismiss();
    }, err => {
      const toast = this.toastCtrl.create({
        message: 'Exception occured, contact administrator.',
        duration: 3000
      });
      toast.present();
      loading.dismiss();
    });
  }
  SearchExamClass() {
    this.examclass = this.allcalssmapdata.filter(m => m.ClassName.toLowerCase().indexOf(this.ExamClsSearchTerm.toLowerCase()) > -1)
    if (this.examclass.length > 0)
      this.IsData = true;
    else
      this.IsData = false;
  }

}
