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
  trabajador = '';
  departamento = '';
  listaTrabajadores = [];
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  nombre_empresa: string = '';
  tipo: string = '';
  email: string = '';
  constructor(private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
    this.storage.get(TOKEN_KEY).then((val) => {
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/obtenerUsuariosTodos?id=80808541-7f22-11e9-a055-204747e63348').subscribe(data => {
        console.log(data);
        for(var clave in data) {
          if(data.hasOwnProperty(clave)){
            this.listaTrabajadores.push(data[clave]);
          }
        }
        //this.listaTrabajadores = data;
      }, err => {
        console.log(err);
      });
  });
  }

  showBusqueda(){
    this.busqueda = !this.busqueda;
  }

  buscarTrabajador(){
    console.log(this.trabajador);
  }
  buscarDepartamento(){
    console.log(this.trabajador);
  }

  agregarContacto(){
    this.router.navigateByUrl('menu/menu/rh/agregar');
  }

  agregarDepartamento(){
    this.router.navigateByUrl('menu/menu/rh/departamentos');
  }

  perfilUsuario(id){
    this.router.navigateByUrl('menu/menu/rh/perfil?id='+id);
  }
}
