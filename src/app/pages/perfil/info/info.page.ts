import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'ACCESS_TOKEN';
const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  nombre_empresa: string = '';
  tipo: string = '';
  email: string = '';
  descripcion: string = '';
  telefono: string = '';
  direccion: string = '';
  sitio_web: string = '';
  constructor(private storage: Storage,private ptf:Platform,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() { 
    this.storage.get(EMPRESA_KEY).then((val) => {
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/empresa/obtenerDatosEmpresa?id='+val).subscribe(data => {
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

}
