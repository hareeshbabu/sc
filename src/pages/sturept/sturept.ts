import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, AlertController, LoadingController, Loading, Alert } from 'ionic-angular';
import { MetaData } from '../../services/metadata';
import { ClassData, Students } from '../../models/appmodel';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

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
    private file: File, 
    private platform: Platform, 
    private document: DocumentViewer
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
    let path = null;
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }
    const transfer = this.transfer.create();
    transfer.download('https://devdactic.com/html/5-simple-hacks-LBT.pdf', path + 'myfile.pdf').then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
    });
  }
}
