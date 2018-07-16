import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Alert } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';
import { ClassData, Students, ClassAttendence } from '../../models/appmodel';


declare var navigator: any;
declare var Connection: any;

@IonicPage()
@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html',
})
export class OfflinePage {
  attn: any[];
  AttnToSub: ClassAttendence[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private sqlite: SQLite,
    private network: Network,
    private platform: Platform
  ) {
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
      }
      this.attn = attnoffdata;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflinePage');
  }

}
