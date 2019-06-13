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
  selector: 'app-addgastos',
  templateUrl: './addgastos.page.html',
  styleUrls: ['./addgastos.page.scss'],
})
export class AddgastosPage implements OnInit {
  busqueda: boolean = false;
  nota = '';
  cantidad: '';
  id: string = '';
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
    this.id = this.ptf.getQueryParam("id");
  }

  agregar(){
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/agregar-gastos?nota='+this.nota+'&cantidad='+this.cantidad+"&id="+this.id).subscribe(data => {
        if(data["status"]=="1"){
          this.agregadoExitosa();
        }else{
          this.error();
        }
      }, err => {
        console.log(err);
      });
  }
  atras(){
    this.router.navigateByUrl('menu/menu/viaticos/gastos?id='+this.id);
  }

  async agregadoExitosa() {
    const alert = await this.alertController.create({
      header: 'Viaticos',
      message: 'Agregado exitosamente.',
      buttons: [{
        text: 'Ok',
        role: 'ok',
        cssClass: 'primary',
        handler: (blah) => {
          this.router.navigateByUrl('menu/menu/viaticos/gastos?id'+this.id);
        }
      }]
    });

    await alert.present();
  }

  async error() {
    const alert = await this.alertController.create({
      header: 'Viaticos',
      message: 'Error.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
