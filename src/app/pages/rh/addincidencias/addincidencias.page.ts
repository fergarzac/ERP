import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { HttpClient } from  '@angular/common/http';

const TOKEN_KEY = 'ACCESS_TOKEN';
const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Component({
  selector: 'app-addincidencias',
  templateUrl: './addincidencias.page.html',
  styleUrls: ['./addincidencias.page.scss'],
})
export class AddincidenciasPage implements OnInit {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  incidencias: string ="";
  tipo: string ="";
  fecha: string="";
  descripcion:string="";
  id: string ="";
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router, public alertController: AlertController) { }

  ngOnInit() {
    this.id = this.ptf.getQueryParam("id");
  }
  agregar(){
    var d = new Date(this.fecha);
    var month = ((d.getMonth() + 1 )+"").length < 2 ? "0"+(d.getMonth() + 1 ) : (d.getMonth() + 1 );
    var day = ((d.getDate())+"").length < 2 ? "0"+(d.getDate()) : (d.getDate());
    var year = d.getFullYear();
    var fecha = year+"/"+month+"/"+day;
    
    this.storage.get(TOKEN_KEY).then((val) => {
      console.log(this.AUTH_SERVER_ADDRESS + '/usuarios/agregar-incidencia?usuario='+this.id+"&incidencia="+this.incidencias+"&tipo="+this.tipo+"&fecha="+fecha);
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/agregar-incidencia?usuario='+this.id+"&incidencia="+this.incidencias+"&tipo="+this.tipo+"&fecha="+fecha).subscribe(data => {
        if(data['status'] == 1){
          this.exitosoAlert();
        }else{
          this.errorAlert();
        }
      }, err => {
        console.log(err);
      });
    });
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Login',
      message: '¡Ups! Error al agregarlo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async exitosoAlert() {
    const alert = await this.alertController.create({
      header: 'Login',
      message: 'Agregado exitosamente.',
      buttons: [{
        text: 'Ok',
        role: 'ok',
        cssClass: 'primary',
        handler: (blah) => {
          this.router.navigateByUrl('menu/menu/rh/incidencias?id='+this.id);
        }
      }]
    });

    await alert.present();
  }

  atras(){
    this.router.navigateByUrl('menu/menu/rh/perfil?id='+this.id);
  }
}
