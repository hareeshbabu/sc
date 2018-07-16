import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpmgrPage } from './expmgr';

@NgModule({
  declarations: [
    ExpmgrPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpmgrPage),
  ],
})
export class ExpmgrPageModule {}
