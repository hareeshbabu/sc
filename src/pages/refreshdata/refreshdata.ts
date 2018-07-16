import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Loading, Alert } from 'ionic-angular';
import { MetaData } from '../../services/metadata'
import {
  ClassData, Students, ClassAttendence,
  FeeComponentData, FeeTermsData, ExpenseType
} from '../../models/appmodel';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';
import { DashPage } from '../dash/dash';

@IonicPage()
@Component({
  selector: 'page-refreshdata',
  templateUrl: 'refreshdata.html',
})
export class RefreshdataPage {
  loadProgress: any = 0;
  LoadingMessage: string = "Class Data...";
  slides = [
    {
      title: "Do you know?",
      question: "What is the largest railway station in the world?",
      description: "<strong>Answer </strong>: Grand Central Terminal, Park Avenue, New York ",
      image: "../../assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "Do you know?",
      question: "Which of the following is the national animal of India?",
      description: "A) Lion B) Tiger C)  Cat  D) Elephant <strong>Answer </strong>: B) Tiger",
      image: "../../assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "Do you know?",
      question: "How many colours are there in India's National Flag?",
      description: " <strong>Answer </strong>:  Three",
      image: "../../assets/img/ica-slidebox-img-3.png",
    }
  ];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alrtCtrl: AlertController,
    public metadata: MetaData,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private sqlite: SQLite,
    private network: Network
  ) {
    // storage.get('class').then((val) => {
    //   if (val == undefined)
    //     this.getclass();
    // });
    this.getclass();
    //this.navCtrl.setRoot(DashPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefreshdataPage');
  }
  getclass() {

    this.metadata.getClass().subscribe(data => {
      this.storage.set('class', JSON.stringify(data));
      // this.storage.get('AllStudents').then((val) => {
      //   if (val == undefined)
      //     this.getStudents();
      // });
      this.loadProgress = 10;
      this.getStudents();
    }, err => {
      let errAlert = this.alrtCtrl.create({
        title: 'Error',
        subTitle: 'Failed to get Class information, please open a support ticket.',
        buttons: ['Ok']
      });
      errAlert.present();
    });
  }
  getStudents() {
    this.LoadingMessage = "Students Data...";
    this.metadata.getAllStudents().subscribe(data => {
      this.storage.set('AllStudents', JSON.stringify(data));
      this.loadProgress = 50;
      this.getfeecomponents();
    }, err => {

    });
  }
  getfeecomponents() {
    this.LoadingMessage = "Meta Data...";
    this.metadata.getFeeComponents().subscribe(data => {
      this.storage.set('FeeComponents', JSON.stringify(data));
      this.loadProgress = 65;
      this.getfeeTerms();
    }, err => {

    });
  }
  getfeeTerms() {
    this.LoadingMessage = "Meta Data...";
    this.metadata.getFeeTerms().subscribe(data => {
      this.storage.set('FeeTerms', JSON.stringify(data));
      this.loadProgress = 75;
      this.getExpenseTypes();
    }, err => {

    });
  }
  getExpenseTypes() {
    this.LoadingMessage = "Almost done....";
    this.metadata.getExpenseTypes().subscribe(data => {
      this.storage.set('ExpenseTypes', JSON.stringify(data));
      this.loadProgress = 85;
      setTimeout(() => {
        this.LoadingMessage = "Almost done....";
        this.loadProgress = 100;
        this.navCtrl.setRoot(DashPage);
      }, 3000);
    }, err => {

    });
  }
}
