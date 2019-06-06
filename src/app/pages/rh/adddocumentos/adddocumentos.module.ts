import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdddocumentosPage } from './adddocumentos.page';

const routes: Routes = [
  {
    path: '',
    component: AdddocumentosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdddocumentosPage]
})
export class AdddocumentosPageModule {}
