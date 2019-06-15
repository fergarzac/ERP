import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ConstantesService } from 'src/app/constantes.service';

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
  nombre_empresa: string = '';
  tipo: string = '';
  email: string = '';
  constructor(private constService: ConstantesService,private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
   
  }

  ionViewDidEnter() {
    this.search();
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

  search(){
    this.storage.get(EMPRESA_KEY).then((val) => {
      this.httpClient.get(this.constService.getApi() + '/usuarios/obtenerUsuariosTodos?id='+val).subscribe(data => {
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

  buscar(){
    this.listaTrabajadores = [];
    console.log(this.trabajador);
    if(this.trabajador.length>0){
      this.storage.get(EMPRESA_KEY).then((val) => {
        this.httpClient.get(this.constService.getApi() + '/usuarios/obtenerUsuarios?id='+val+"&usuario="+this.trabajador).subscribe(data => {
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
    }else{
      this.search();
    }
  }
}
