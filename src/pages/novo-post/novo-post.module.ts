import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoPostPage } from './novo-post';

@NgModule({
  declarations: [
    NovoPostPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoPostPage),
  ],
})
export class NovoPostPageModule {}
