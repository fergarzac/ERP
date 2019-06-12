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
  selector: 'app-listam',
  templateUrl: './listam.page.html',
  styleUrls: ['./listam.page.scss'],
})
export class ListamPage implements OnInit {
  busqueda: boolean = false;
  activos = '';
  departamento = '';
  listaMantenimientos = [];
  id: string = '';
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
    this.id = this.ptf.getQueryParam("id");
    this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/empresa/obtener-mantenimientos?id='+this.id).subscribe(data => {
      console.log(data);
      for(var clave in data) {
        if(data.hasOwnProperty(clave)){
          this.listaMantenimientos.push(data[clave]);
        }
      }
    }, err => {
      console.log(err);
    });

  }
  showBusqueda(){
    this.busqueda = !this.busqueda;
  }
  agregarMantenimiento(){
    this.router.navigateByUrl('menu/menu/activos/mantenimiento?id='+this.id);
  }

  eliminar(id){

  }

  atras(){
    this.router.navigateByUrl('menu/menu/activos');
  }
}
