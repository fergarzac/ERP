import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      { path: 'home', loadChildren: '../home/dashboard/dashboard.module#DashboardPageModule' },
      { path: 'perfil', loadChildren: '../perfil/index/index.module#IndexPageModule' },
      { path: 'rh', loadChildren: '../rh/index/index.module#IndexPageModule' },
      { path: 'activos', loadChildren: '../activos/index/index.module#IndexPageModule' },
      { path: 'viaticos', loadChildren: '../viaticos/index/index.module#IndexPageModule' },
      { path: 'flotilla', loadChildren: '../flotilla/index/index.module#IndexPageModule' },
      { path: 'rh/agregar', loadChildren: '../rh/agregar/agregar.module#AgregarPageModule' },
      { path: 'rh/departamentos', loadChildren: '../rh/departamentos/departamentos.module#DepartamentosPageModule' },
      { path: 'rh/perfil', loadChildren: '../rh/perfil/perfil.module#PerfilPageModule' },
      
    ]
  },
  { path: '' , redirectTo: 'menu/perfil'}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
