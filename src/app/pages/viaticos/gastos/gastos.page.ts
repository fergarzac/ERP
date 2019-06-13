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
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {
  busqueda: boolean = false;
  admin: boolean = false;
  activos = '';
  departamento = '';
  listaGastos = [];
  id: string = '';
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
    this.storage.get(TIPO_KEY).then((val) => {
      if(val == "3") {
        this.admin = false;
      }else{
        this.admin = true;
      }
    });
    this.id = this.ptf.getQueryParam("id");
    console.log(this.AUTH_SERVER_ADDRESS + '/usuarios/obtener-gastos?id='+this.id);
    this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/obtener-gastos?id='+this.id).subscribe(data => {
      for(var clave in data) {
        if(data.hasOwnProperty(clave)){
          this.listaGastos.push(data[clave]);
        }
      }
    }, err => {
      console.log(err);
    });
  }

  agregarGastos(){
    this.router.navigateByUrl('menu/menu/viaticos/addgastos?id='+this.id);
  }

  atras(){
    this.router.navigateByUrl('menu/menu/viaticos');
  }

  verGasto(id){
    
  }
}
