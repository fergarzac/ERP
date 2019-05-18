import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: IndexPage,
    children: [
      { 
        path: 'info', 
        loadChildren: '../info/info.module#InfoPageModule' 
      },
      { 
        path: 'modificar', 
        loadChildren: '../modificar/modificar.module#ModificarPageModule' 
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/info',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IndexPage]
})
export class IndexPageModule {}
