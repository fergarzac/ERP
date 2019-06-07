import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'ACCESS_TOKEN';
const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Component({
  selector: 'app-trabajosa',
  templateUrl: './trabajosa.page.html',
  styleUrls: ['./trabajosa.page.scss'],
})
export class TrabajosaPage implements OnInit {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  listaTrabajos = [];
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,) { }
  id: string = "";
  ngOnInit() {
    this.id = this.ptf.getQueryParam("id");
    this.id = this.ptf.getQueryParam("id");
    this.storage.get(TOKEN_KEY).then((val) => {
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/obtener-trabajos-anteriores?usuario='+this.id).subscribe(data => {
        for (var clave in data) {
          if (data.hasOwnProperty(clave)) {
            this.listaTrabajos.push(data[clave]);
          }
        }
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  add(){
    this.router.navigateByUrl('menu/menu/rh/addtrabajosa?id='+this.id);
  }
  atras(){
    this.router.navigateByUrl('menu/menu/rh/perfil?id='+this.id);
  }
}