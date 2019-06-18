import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { ConstantesService } from 'src/app/constantes.service';

const TOKEN_KEY = 'ACCESS_TOKEN';
const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.page.html',
  styleUrls: ['./incidencias.page.scss'],
})
export class IncidenciasPage implements OnInit {
  listaIncidencias = [];
  constructor(public alertController: AlertController,private constService: ConstantesService,private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,) { }
  id: string = "";
  ngOnInit() {
    
  }

  async confirmacion(id) {
    const alert = await this.alertController.create({
      header: 'Registrarse',
      message: '¿ Estás seguro de eliminar este trabajo ?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        handler: () => {
          this.eliminar(id);
        }
      }]
    });

    await alert.present();
  }

  async error() {
    const alert = await this.alertController.create({
      header: 'Registrarse',
      message: 'Ha ocurrido un error.',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async success() {
    const alert = await this.alertController.create({
      header: 'Registrarse',
      message: 'Eliminado Exitosamente.',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.buscar();
        }
      }]
    });

    await alert.present();
  }

  ionViewDidEnter() {
    this.buscar();
  }

  buscar(){
    this.listaIncidencias = [];
    this.id = this.ptf.getQueryParam("id");
    this.storage.get(TOKEN_KEY).then((val) => {
      this.httpClient.get(this.constService.getApi() + '/usuarios//obtener-incidencias-usuario?usuario='+this.id).subscribe(data => {
        for (var clave in data) {
          if (data.hasOwnProperty(clave)) {
            this.listaIncidencias.push(data[clave]);
          }
        }
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }
  eliminar(id) {
    this.storage.get(TOKEN_KEY).then((val) => {
      this.httpClient.get(this.constService.getApi() + '/usuarios/eliminar-trabajo-anterior?idTrabajo='+id).subscribe(data => {
        if(data["status"]=="1"){
          this.success();
        }else{
          this.error();
        }
      }, err => {
        console.log(err);
      });
    });
  }
  add(){
    this.router.navigateByUrl('menu/menu/rh/addincidencias?id='+this.id);
  }
  atras(){
    this.router.navigateByUrl('menu/menu/rh/perfil?id='+this.id);
  }
}
