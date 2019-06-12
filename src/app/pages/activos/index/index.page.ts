import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
  listaActivos = [];
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  constructor(private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
    this.storage.get(EMPRESA_KEY).then((val) => {
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/empresa/obtener-activos?id='+val).subscribe(data => {
        console.log(data);
        for(var clave in data) {
          if(data.hasOwnProperty(clave)){
            this.listaActivos.push(data[clave]);
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
  agregarActivo(){
    this.router.navigateByUrl('menu/menu/activos/add');
  }
  mantenimiento(id){
    this.router.navigateByUrl('menu/menu/activos/listam?id='+id);
  }
  eliminar(id){

  }
}
