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
  selector: 'app-addsalud',
  templateUrl: './addsalud.page.html',
  styleUrls: ['./addsalud.page.scss'],
})
export class AddsaludPage implements OnInit {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  nombre: string ="";
  tipo: string ="";
  condicion: string="";
  observacion:string="";
  id: string ="";
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }
  async agregadoExitosa() {
    const alert = await this.alertController.create({
      header: 'Trabajos Anteriores',
      message: 'Agregado exitosamente.',
      buttons: [{
        text: 'Ok',
        role: 'ok',
        cssClass: 'primary',
        handler: (blah) => {
          this.router.navigateByUrl('menu/menu/rh/salud?id='+this.id);
        }
      }]
    });

    await alert.present();
  }

  async error() {
    const alert = await this.alertController.create({
      header: 'Trabajos Anteriores',
      message: 'Error.',
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
    this.id = this.ptf.getQueryParam("id");
  }

  agregar(){
    this.storage.get(TOKEN_KEY).then((val) => {
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/agregar-expediente-salud?enfermedad='+
      this.nombre+'&tipo='+this.tipo+'&condicion='+this.condicion+'&observaciones='+this.observacion
      +'&usuario='+this.id).subscribe(data => {
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

  atras(){
    this.router.navigateByUrl('menu/menu/rh/salud?id='+this.id);
  }

  formatDates(fecha){
    var di = new Date(fecha);
    var month = ((di.getMonth() + 1 )+"").length < 2 ? "0"+(di.getMonth() + 1 ) : (di.getMonth() + 1 );
    var day = ((di.getDate())+"").length < 2 ? "0"+(di.getDate()) : (di.getDate());
    var year = di.getFullYear();
    return year+"/"+month+"/"+day;
  }
}
