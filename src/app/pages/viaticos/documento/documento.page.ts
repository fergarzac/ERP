import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { AUTH_SERVER_ADDRESS } from 'src/app/contants';

const TOKEN_KEY = 'ACCESS_TOKEN';
const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Component({
  selector: 'app-documento',
  templateUrl: './documento.page.html',
  styleUrls: ['./documento.page.scss'],
})
export class DocumentoPage implements OnInit {
  busqueda: boolean = false;
  activos = '';
  departamento = '';
  listaMantenimientos = [];
  id: string = '';
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
  }

}
