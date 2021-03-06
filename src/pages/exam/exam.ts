import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Loading, Alert, ToastController } from 'ionic-angular';
import { MetaData } from '../../services/metadata'
import { ExaminationData } from '../../models/appmodel';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';

import { ExamclsPage } from '../examcls/examcls';
import { ExamsubjPage } from '../examsubj/examsubj';

@IonicPage()
@Component({
  selector: 'page-exam',
  templateUrl: 'exam.html',
})
export class ExamPage {
  exams: ExaminationData[];
  AllExams: ExaminationData[];
  ExamSearchTerm: string;
  IsData: boolean = false;

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
    this.getExaminations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamPage');
  }
  getExaminations() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.metadata.getExaminations().subscribe(data => {
      this.exams = data;
      this.AllExams = data;
      if (this.exams.length > 0)
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
  SearchExamination() {
    this.exams = this.AllExams.filter(m => m.Name.toLowerCase().indexOf(this.ExamSearchTerm.toLowerCase()) > -1)
    if (this.exams.length > 0)
      this.IsData = true;
    else
      this.IsData = false;
  }
  gotoExamClsMapping(e) {
    this.navCtrl.push(ExamclsPage, { ExamID: e.ExaminationID });
  }
  CreateExam() {
    this.navCtrl.push(ExamclsPage);
  }
}
