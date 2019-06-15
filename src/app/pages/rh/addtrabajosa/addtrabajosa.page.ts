import { Component, OnInit } from '@angular/core';
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
  selector: 'app-addtrabajosa',
  templateUrl: './addtrabajosa.page.html',
  styleUrls: ['./addtrabajosa.page.scss'],
})
export class AddtrabajosaPage implements OnInit {
  id: string = "";
  empresa: string ="";
  telefono: string ="";
  puesto: string="";
  fechai:string="";
  fechat:string="";
  constructor(private constService: ConstantesService,private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }
  async agregadoExitosa() {
    const alert = await this.alertController.create({
      header: 'Trabajos Anteriores',
      message: 'Agregado exitosamente.',
      buttons: [{
        text: 'Ok',
        role: 'ok',
        cssClass: 'primary',
        handler: (blah) => {
          this.router.navigateByUrl('menu/menu/rh/trabajosa?id='+this.id);
        }
      }]
    });

    await alert.present();
  }

  async error() {
    const alert = await this.alertController.create({
      header: 'Trabajos Anteriores',
      message: 'Error.',
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
    
  }
  ionViewDidEnter() {
    this.id = this.ptf.getQueryParam("id");
  }
  agregar(){
    this.storage.get(TOKEN_KEY).then((val) => {
      this.fechai = this.formatDates(this.fechai);
      this.fechat = this.formatDates(this.fechat);
      this.httpClient.get(this.constService.getApi() + '/usuarios/agregar-trabajo-anterior?trabajo='+
      this.empresa+'&telefono='+this.telefono+'&puesto='+this.puesto+'&fechaTermino='+this.fechat
      +'&fechaIngreso='+this.fechai+'&usuario='+this.id).subscribe(data => {
        if(data["status"]=="1"){
          this.agregadoExitosa();
        }else{
          this.error();
        }
      }, err => {
        console.log(err);
      });
    });
  }
  atras(){
    this.router.navigateByUrl('menu/menu/rh/trabajosa?id='+this.id);
  }

  formatDates(fecha){
    var di = new Date(fecha);
    var month = ((di.getMonth() + 1 )+"").length < 2 ? "0"+(di.getMonth() + 1 ) : (di.getMonth() + 1 );
    var day = ((di.getDate())+"").length < 2 ? "0"+(di.getDate()) : (di.getDate());
    var year = di.getFullYear();
    return year+"/"+month+"/"+day;
  } 
}
