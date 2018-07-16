import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StufeePage } from './stufee';

@NgModule({
  declarations: [
    StufeePage,
  ],
  imports: [
    IonicPageModule.forChild(StufeePage),
  ],
})
export class StufeePageModule {}
