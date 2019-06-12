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
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  concepto = '';
  cantidad = '';
  trabajador = '';
  buttonColor:string ="#fff";
  listaTrabajadores = [];
  selected_id: string = '';
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }


  ngOnInit() {
  }

  buscar(){
    this.listaTrabajadores = [];
    this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/obtener-usuario?id='+this.trabajador).subscribe(data => {
      console.log(data);
      for(var clave in data) {
        if(data.hasOwnProperty(clave)){
          this.listaTrabajadores.push(data[clave]);
        }
      }
    }, err => {
      console.log(err);
    });
  }

  seleccionar(id){
    this.buttonColor = "#cecece";
    this.selected_id = id;
  }

  agregar(){
    this.storage.get(EMPRESA_KEY).then((val) => {
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/empresa/agregar-viaticos?empresa='+val+'&concepto='+this.concepto+'&cantidad='+this.cantidad+"&id="+this.selected_id).subscribe(data => {
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
    this.router.navigateByUrl('menu/menu/viaticos');
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
          this.router.navigateByUrl('menu/menu/viaticos');
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
