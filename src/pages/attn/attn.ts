import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Loading, Alert } from 'ionic-angular';
import { MetaData } from '../../services/metadata'
import { ClassData, Students, ClassAttendence } from '../../models/appmodel';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';


@IonicPage()
@Component({
  selector: 'page-attn',
  templateUrl: 'attn.html',
})
export class AttnPage {
  class: ClassData[];
  students: ClassAttendence[];
  AllStudents: Students[];
  SubmitedMsg: boolean = false;
  attnclassid: number;
  attndate: Date;
  showattnsub: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alrtCtrl: AlertController,
    public metadata: MetaData,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private sqlite: SQLite,
    private network: Network
  ) {
    storage.get('class').then((val) => {
      this.class = JSON.parse(val);
      if (this.class == undefined)
        this.getclass();
    });
    storage.get('AllStudents').then((val) => {
      this.AllStudents = JSON.parse(val);
      if (this.AllStudents == undefined)
        this.getStudents();
    });
    //this.storage.set('Attn', undefined);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttnPage');
  }
  getclass() {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.metadata.getClass().subscribe(data => {
      console.log(data);
      this.class = data;
      this.storage.set('class', JSON.stringify(this.class));
      loader.dismiss();
    }, err => {
      loader.dismiss();
      let errAlert = this.alrtCtrl.create({
        title: 'Error',
        subTitle: 'Failed to get Class information, please open a support ticket.',
        buttons: ['Ok']
      });
      errAlert.present();
    });
  }
  getStudents() {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.metadata.getAllStudents().subscribe(data => {
      console.log(data);
      this.AllStudents = data;
      this.storage.set('AllStudents', JSON.stringify(this.AllStudents));
      loader.dismiss();
    }, err => {
      loader.dismiss();
    });
  }
  ClassChangeEvent() {
    this.showattnsub = false;
    this.SubmitedMsg = false;
  }
  DateChangeEvent() {
    this.showattnsub = false;
    this.SubmitedMsg = false;
  }
  getstudentlist() {
    this.showattnsub = false;
    this.SubmitedMsg = false;
    this.storage.get('AllStudents').then((val) => {
      this.AllStudents = JSON.parse(val);
      if (this.AllStudents == undefined) {
        const loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
        this.metadata.getStudentsByClass(this.attnclassid, this.attndate).subscribe(data => {
          console.log(data);
          if (!data.IsSubmitted) {
            this.students = data.Students;
            this.SubmitedMsg = false;
          } else {
            this.SubmitedMsg = true;
          }
          loader.dismiss();
          this.showattnsub = true;
        }, err => {
          loader.dismiss();
          let errAlert = this.alrtCtrl.create({
            title: 'Error',
            subTitle: 'Failed to get information, please open a support ticket.',
            buttons: ['Ok']
          });
          errAlert.present();
          this.showattnsub = false;
          this.SubmitedMsg = false;
        });
      } else {
        this.SubmitedMsg = false;
        var AttnStudent = [];
        console.log(this.AllStudents);
        var ClassStud = this.AllStudents.filter(m => m.ClassID == this.attnclassid);
        console.log(ClassStud);
        ClassStud.forEach(element => {
          var atn = new ClassAttendence();
          atn.AdmissionNumber = element.AdmissionNumber;
          atn.ClassID = element.ClassID;
          atn.FirstName = element.FirstName;
          atn.LastName = element.LastName;
          atn.IsPresent = true;
          atn.RollNumber = element.RollNumber;
          atn.StudentID = element.StudentID;
          AttnStudent.push(atn);
        });
        this.students = AttnStudent;
        this.showattnsub = true;
      }
    });

  }
  submitAttendence() {
    console.log(this.students);
    var data = [];
    this.storage.get('Attn').then((val) => {
      var attndata = JSON.parse(val);
      if (attndata != undefined) {
        attndata.forEach(element => {
          data.push(element);
        });
      }
      var classname = this.class.filter(m => m.ClassID == this.attnclassid);
      var currattn = {
        ClassID: this.attnclassid,
        ClassName: classname[0].Name,
        Date: this.attndate,
        data: this.students
      };
      data.push(currattn);
      this.storage.set('Attn', JSON.stringify(data));
    });

    let errAlert = this.alrtCtrl.create({
      title: 'Success',
      subTitle: 'Attendence has been submitted.',
      buttons: ['Ok']
    });
    errAlert.present();
    this.showattnsub = false;
    this.SubmitedMsg = false;
  }
}
