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
  selector: 'app-salud',
  templateUrl: './salud.page.html',
  styleUrls: ['./salud.page.scss'],
})
export class SaludPage implements OnInit {
  listaSalud = [];
  constructor(private constService: ConstantesService,private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,) { }
  id: string = "";
  ngOnInit() {
    
  }
  ionViewDidEnter() {
    this.listaSalud = [];
    this.id = this.ptf.getQueryParam("id");
    this.storage.get(TOKEN_KEY).then((val) => {
      this.httpClient.get(this.constService.getApi() + '/usuarios/obtener-salud-usuario?usuario='+this.id).subscribe(data => {
        for (var clave in data) {
          if (data.hasOwnProperty(clave)) {
            this.listaSalud.push(data[clave]);
          }
        }
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }
  add(){
    this.router.navigateByUrl('menu/menu/rh/addsalud?id='+this.id);
  }
  atras(){
    this.router.navigateByUrl('menu/menu/rh/perfil?id='+this.id);
  }
}
