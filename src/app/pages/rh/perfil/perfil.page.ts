import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'ACCESS_TOKEN';
const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  nombre: string = 'Daniel Ivan';
  puesto: string = 'Gerente';
  descripcion: string = 'Descripcion breve';
  celular: string = '6131110000';
  direccion_p: string = '1352 Science Center Drive Terreton, ID 83450';
  direccion_o: string = '';
  grado: string = '';
  habilidades = ['HTML', 'PHP'];
  constructor(public actionSheetController: ActionSheetController, private ptf:Platform,private storage: Storage, private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
    let id = this.ptf.getQueryParam("id");
    this.storage.get(TOKEN_KEY).then((val) => {
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/perfil-usuario?id='+id).subscribe(data => {
        console.log(data);
        this.nombre = data['nombre'] + ' '+ data['apellido_paterno']+ ' '+ data['apellido_materno'];
        this.puesto = data['puesto'];
        this.descripcion = data['descripcion'];
        this.celular = data['telefono'];
        this.direccion_p = data['direccion_casa'];
        this.direccion_o = data['direccion_oficina'];
        this.grado = data['grado_estudios'];
      }, err => {
        console.log(err);
      });
    });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      buttons: [{
        text: 'Documentos',
        icon: 'document',
        handler: () => {
          this.router.navigateByUrl('menu/menu/rh/documents');
        }
      }, {
        text: 'Trabajos Anteriores',
        icon: 'rewind',
        handler: () => {
          console.log('Trabajos clicked');
        }
      }, {
        text: 'Salud',
        icon: 'heart',
        handler: () => {
          console.log('Salud clicked');
        }
      }, {
        text: 'Incidencias',
        icon: 'close',
        handler: () => {
          console.log('Incidencias clicked');
        }
      },{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Eliminar clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
