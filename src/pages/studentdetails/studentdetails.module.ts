import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentdetailsPage } from './studentdetails';

@NgModule({
  declarations: [
    StudentdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentdetailsPage),
  ],
})
export class StudentdetailsPageModule {}
