import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Loading, Alert } from 'ionic-angular';
import { MetaData } from '../../services/metadata'
import { ClassData, Students, ClassAttendence } from '../../models/appmodel';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';
import { StudentdetailsPage } from '../studentdetails/studentdetails';

@IonicPage()
@Component({
  selector: 'page-students',
  templateUrl: 'students.html',
})
export class StudentsPage {

  AllStudents: Students[];
  StudentsByClass: Students[];
  class: ClassData[];
  ClassID: number;
  ShowStudents: boolean = false;
  StudentSearchTerm: string;
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
    });
    storage.get('AllStudents').then((val) => {
      this.AllStudents = JSON.parse(val);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentsPage');
  }
  ClassChangeEvent() {
    this.StudentSearchTerm = "";
    this.ShowStudents = false;
    this.StudentsByClass = this.AllStudents.filter(m => m.ClassID == this.ClassID);
    this.ShowStudents = true;
  }
  viewStudentProfile() {
    this.navCtrl.push(StudentdetailsPage);
  }
  SearchStudent() {
    this.StudentsByClass = this.AllStudents.filter(m => m.ClassID == this.ClassID
      && ((m.FirstName + ' ' + m.LastName).toLowerCase().indexOf(this.StudentSearchTerm.toLowerCase()) > -1
        || m.FirstName.toLowerCase().indexOf(this.StudentSearchTerm.toLowerCase()) > -1
        || m.LastName.toLowerCase().indexOf(this.StudentSearchTerm.toLowerCase()) > -1)
    );
  }
}
