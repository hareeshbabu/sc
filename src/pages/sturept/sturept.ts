import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Loading, Alert } from 'ionic-angular';
import { MetaData } from '../../services/metadata';
import { ClassData, Students } from '../../models/appmodel';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-sturept',
  templateUrl: 'sturept.html',
})
export class StureptPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alrtCtrl: AlertController,
    public metadata: MetaData,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private transfer: FileTransfer,
    private file: File
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StureptPage');
  }
  generatestudentreport() {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.metadata.getClass().subscribe(data => {
      console.log(data);
      loader.dismiss();
    }, err => {
      loader.dismiss();
      let errAlert = this.alrtCtrl.create({
        title: 'Error',
        subTitle: 'Failed to generate report, please open a support ticket.',
        buttons: ['Ok']
      });
      errAlert.present();
    });
  }
  download() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'http://schoolconn.org/Documents/StudentHistoryReport07082018113243.pdf';
    fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      let errAlert = this.alrtCtrl.create({
        title: 'Error',
        subTitle: 'Failed to generate report, please open a support ticket.',
        buttons: ['Ok']
      });
      errAlert.present();
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }
}
