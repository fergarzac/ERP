import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      { path: 'home', loadChildren: '../home/dashboard/dashboard.module#DashboardPageModule' },
      { path: 'perfil', loadChildren: '../perfil/index/index.module#IndexPageModule' },
      { path: 'perfil-usuario', loadChildren: '../usuarios/perfil/perfil.module#PerfilPageModule' },
      { path: 'rh', loadChildren: '../rh/index/index.module#IndexPageModule' },
      { path: 'activos', loadChildren: '../activos/index/index.module#IndexPageModule' },
      { path: 'viaticos', loadChildren: '../viaticos/index/index.module#IndexPageModule' },
      { path: 'flotilla', loadChildren: '../flotilla/index/index.module#IndexPageModule' },
      { path: 'rh/agregar', loadChildren: '../rh/agregar/agregar.module#AgregarPageModule' },
      { path: 'rh/departamentos', loadChildren: '../rh/departamentos/departamentos.module#DepartamentosPageModule' },
      { path: 'rh/perfil', loadChildren: '../rh/perfil/perfil.module#PerfilPageModule' },
      { path: 'rh/documentos', loadChildren: '../rh/documentos/documentos.module#DocumentosPageModule' },
      { path: 'rh/trabajosa', loadChildren: '../rh/trabajosa/trabajosa.module#TrabajosaPageModule' },
      { path: 'rh/salud', loadChildren: '../rh/salud/salud.module#SaludPageModule' },
      { path: 'rh/incidencias', loadChildren: '../rh/incidencias/incidencias.module#IncidenciasPageModule' },
      { path: 'rh/modificar', loadChildren: '../rh/modificar/modificar.module#ModificarPageModule' },
      { path: 'rh/addsalud', loadChildren: '../rh/addsalud/addsalud.module#AddsaludPageModule' },
      { path: 'rh/addtrabajosa', loadChildren: '../rh/addtrabajosa/addtrabajosa.module#AddtrabajosaPageModule' },
      { path: 'rh/addincidencias', loadChildren: '../rh/addincidencias/addincidencias.module#AddincidenciasPageModule' },
      { path: 'rh/adddocumentos', loadChildren: '../rh/adddocumentos/adddocumentos.module#AdddocumentosPageModule' },
      { path: 'activos/add', loadChildren: '../activos/add/add.module#AddPageModule' },
      { path: 'activos/mantenimiento', loadChildren: '../activos/mantenimiento/mantenimiento.module#MantenimientoPageModule' },
  
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
