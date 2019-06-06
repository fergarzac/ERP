import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddtrabajosaPage } from './addtrabajosa.page';

const routes: Routes = [
  {
    path: '',
    component: AddtrabajosaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddtrabajosaPage]
})
export class AddtrabajosaPageModule {}
