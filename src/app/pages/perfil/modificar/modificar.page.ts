import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ConstantesService } from 'src/app/constantes.service';

const TOKEN_KEY = 'ACCESS_TOKEN';
const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  nombre_empresa: string = '';
  tipo: string = '';
  email: string = '';
  descripcion: string = '';
  telefono: string = '';
  direccion: string = '';
  sitio_web: string = '';
  constructor(private constService: ConstantesService,private storage: Storage,private ptf:Platform,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }
  async agregadoExitosa() {
    const alert = await this.alertController.create({
      header: 'Perfi',
      message: 'Modificado exitosamente.',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async error() {
    const alert = await this.alertController.create({
      header: 'Perfil',
      message: 'Error.',
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() { 
    
  }

  ionViewDidEnter() {
    this.storage.get(TOKEN_KEY).then((val) => {
      this.httpClient.get(this.constService.getApi() + '/empresa/obtenerDatosEmpresa?id=80808541-7f22-11e9-a055-204747e63348').subscribe(data => {
        console.log(data);
        this.nombre_empresa = data['nombre'];
        this.tipo = data['giro'];
        this.email = data['correo'];
        this.descripcion = data['descripcion'];
        this.telefono = data['telefono'];
        this.direccion = data['direccion'];
        this.sitio_web = data['sitio_web'];
      }, err => {
        console.log(err);
      });
    });
  }
  modificar(){
    this.storage.get(EMPRESA_KEY).then((val) => {
      this.httpClient.get(this.constService.getApi() + '/empresa/dao-perfil-empresa?direccion='+
      this.direccion+'&telefono='+this.telefono+'&sitio_web='+this.sitio_web+'&descripcion='+this.descripcion+'&id='+val).subscribe(data => {
        if(data["status"]=="1"){
          this.agregadoExitosa();
        }else{
          this.error();
        }
      }, err => {
        console.log(err);
      });
    });
  }
}
