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
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  busqueda: boolean = false;
  activos = '';
  departamento = '';
  listaViaticos = [];
  id: string = '';
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }
 
  ngOnInit() {
    this.storage.get(TOKEN_KEY).then((val) => {
      console.log(this.AUTH_SERVER_ADDRESS + '/usuarios/obtener-viaticos?id='+val);
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/obtener-viaticos?id='+val).subscribe(data => {
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
