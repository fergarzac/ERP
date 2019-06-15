import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient } from  '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { ConstantesService } from 'src/app/constantes.service';

const TOKEN_KEY = 'ACCESS_TOKEN';
const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = 'Daniel Ivan';
  puesto: string = 'Gerente';
  descripcion: string = 'Descripcion breve';
  celular: string = '6131110000';
  direccion_p: string = '1352 Science Center Drive Terreton, ID 83450';
  direccion_o: string = '';
  grado: string = '';
  email: string = '';
  id: string = '';
  habilidades = [];
  atrasBtn: boolean =true;
  constructor(private constService: ConstantesService,public actionSheetController: ActionSheetController, private ptf:Platform,private storage: Storage, private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.id = this.ptf.getQueryParam("id");
    this.storage.get(TOKEN_KEY).then((val) => {
      this.httpClient.get(this.constService.getApi() + '/usuarios/perfil-usuario?id='+this.id).subscribe(data => {
        this.nombre = data['nombre'] + ' '+ data['apellido_paterno']+ ' '+ data['apellido_materno'];
        this.puesto = data['puesto'];
        this.descripcion = data['descripcion'];
        this.celular = data['telefono'];
        this.direccion_p = data['direccion_casa'];
        this.direccion_o = data['direccion_oficina'];
        this.grado = data['grado_estudios'];
        this.email = data['email'];
      }, err => {
        console.log(err);
      });
      this.httpClient.get(this.constService.getApi() + '/usuarios/obtener-habilidades?usuario='+this.id).subscribe(data => {
        for (var clave in data) {
          if (data.hasOwnProperty(clave)) {
            this.habilidades.push(data[clave].habilidad);
          }
        }
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
    this.storage.get(TIPO_KEY).then((val) => {
      if(val == "3"){
        this.atrasBtn = false;
      }
    });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      buttons: [{
        text: 'Modificar',
        icon: 'create',
        handler: () => {
          this.router.navigateByUrl('menu/menu/rh/modificar?id='+this.id);
        }
      },{
        text: 'Documentos',
        icon: 'document',
        handler: () => {
          this.router.navigateByUrl('menu/menu/rh/documentos?id='+this.id);
        }
      }, {
        text: 'Trabajos Anteriores',
        icon: 'rewind',
        handler: () => {
          this.router.navigateByUrl('menu/menu/rh/trabajosa?id='+this.id);
        }
      }, {
        text: 'Salud',
        icon: 'heart',
        handler: () => {
          this.router.navigateByUrl('menu/menu/rh/salud?id='+this.id);
        }
      }, {
        text: 'Incidencias',
        icon: 'close',
        handler: () => {
          this.router.navigateByUrl('menu/menu/rh/incidencias?id='+this.id);
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
  atras(){
    this.router.navigateByUrl('menu/menu/rh');
  }
}
