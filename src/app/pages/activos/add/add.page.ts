import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'ACCESS_TOKEN';
const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  constructor(private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }
  nombre: string="";
  departamento: string="";
  serie:string="";
  cantidad:string;
  ngOnInit() {
  }
  async agregadoExitosa() {
    const alert = await this.alertController.create({
      header: 'Activos',
      message: 'Activo exitosamente.',
      buttons: [{
        text: 'Ok',
        role: 'ok',
        cssClass: 'primary',
        handler: (blah) => {
          this.router.navigateByUrl('menu/menu/activos');
        }
      }]
    });

    await alert.present();
  }

  async error() {
    const alert = await this.alertController.create({
      header: 'Activos',
      message: 'Error.',
      buttons: ['OK']
    });

    await alert.present();
  }
  agregar(){
    this.storage.get(EMPRESA_KEY).then((val) => {
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/empresa/agregar-activo?id='+val+"&nombre="+this.nombre+"&serie="+this.serie+"&cantidad="+this.cantidad+"&departamento="+this.departamento).subscribe(data => {
        if(data['status'] == "1"){
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
    this.router.navigateByUrl('menu/menu/activos');
  }
}
