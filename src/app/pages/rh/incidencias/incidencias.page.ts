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
  selector: 'app-incidencias',
  templateUrl: './incidencias.page.html',
  styleUrls: ['./incidencias.page.scss'],
})
export class IncidenciasPage implements OnInit {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  listaIncidencias = [];
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,) { }
  id: string = "";
  ngOnInit() {
    this.id = this.ptf.getQueryParam("id");
    this.listaIncidencias = [
      {
        incidencia: 'Riña',
        fecha: '11/03/2019',
        tipo: 'Grave',
        observaciones: 'algo'
      },
      {
        incidencia: 'Gritos',
        fecha: '11/03/2019',
        tipo: 'Moderado',
        observaciones: ''
      },
      {
        incidencia: 'Rompio algo',
        fecha: '',
        tipo: 'Grave',
        observaciones: ''
      }
    ]
  }

  add(){
    this.router.navigateByUrl('menu/menu/rh/addincidencias?id='+this.id);
  }
}
