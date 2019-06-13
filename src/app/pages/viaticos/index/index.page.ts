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
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  busqueda: boolean = false;
  activos = '';
  departamento = '';
  listaViaticos = [];
  id: string = '';
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }
 
  ngOnInit() {
    this.storage.get(EMPRESA_KEY).then((val) => {
      this.id = this.ptf.getQueryParam("id");
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/empresa/obtener-viaticos?id='+val).subscribe(data => {
        console.log(data);
        for(var clave in data) {
          if(data.hasOwnProperty(clave)){
            this.listaViaticos.push(data[clave]);
          }
        }
      }, err => {
        console.log(err);
      });
    });
  }
  showBusqueda(){
    this.busqueda = !this.busqueda;
  }
  verViaticos(id){
    this.router.navigateByUrl('menu/menu/viaticos/gastos?id='+id);
  }

  agregarViaticos(id){
    this.router.navigateByUrl('menu/menu/viaticos/add');
  }

  eliminar(id){

  }

  atras(){
    this.router.navigateByUrl('menu/menu/viaticos');
  }
}
