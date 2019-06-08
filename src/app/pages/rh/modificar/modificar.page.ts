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
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  id: string = "";
  nombre: string = "";
  apellido_p: string = "";
  apellido_m: string = "";
  fechai: string = "";
  fechan: string = "";
  sexo: string = "";
  curp: string = "";
  rfc: string = "";
  dir_casa: string = "";
  dir_oficina: string = "";
  estudios: string = "";
  puesto: string = "";
  tel: string = "";
  nss: string = "";
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,public alertController: AlertController) { }
  async modificacionExitosa() {
    const alert = await this.alertController.create({
      header: 'Modificaciones',
      message: 'Modificado exitosamente.',
      buttons: [{
        text: 'Ok',
        role: 'ok',
        cssClass: 'primary',
        handler: (blah) => {
          this.router.navigateByUrl('menu/menu/rh/perfil?id='+this.id);
        }
      }]
    });

    await alert.present();
  }

  async errorModificacion() {
    const alert = await this.alertController.create({
      header: 'Modificaciones',
      message: 'Error.',
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
    this.id = this.ptf.getQueryParam("id");
    this.storage.get(TOKEN_KEY).then((val) => {
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/perfil-usuario?id='+this.id).subscribe(data => {
        this.nombre = data['nombre'];
        this.apellido_p = data['apellido_paterno'];
        this.apellido_m = data['apellido_materno'];
        this.fechai = data['fecha_ingreso'];
        this.fechan = data['fecha_nacimiento'];
        this.sexo = data['sexo'];
        this.curp = data['curp'];
        this.rfc = data['rfc'];
        this.nss = data['num_seguro'];
        this.tel = data['telefono'];
        this.dir_casa = data['direccion_casa'];
        this.dir_oficina = data['direccion_oficina'];
        this.estudios = data['grado_estudios'];
        this.puesto = data['puesto'];
      }, err => {
        console.log(err);
      });
    });
  }

  modificar() {
    this.storage.get(TOKEN_KEY).then((val) => {
      this.fechai = this.formatDates(this.fechai);
      this.fechan = this.formatDates(this.fechan);
      this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/actualizar-info-usuario?nombre='+
      this.nombre+'&apellidoPaterno='+this.apellido_p+'&apellidoMaterno='+this.apellido_m+'&fechaNacimiento='+this.fechan
      +'&fechaIngreso='+this.fechai+'&sexo='+this.sexo+'&curp='+this.curp+'&rfc='+this.rfc+'&direccionCasa='+this.dir_casa
      +'&direccionOficina='+this.dir_oficina+'&gradoEstudios='+this.estudios+'&numSeguro='+this.nss+'&usuario='+this.id
      +'&puesto='+this.puesto+'&telefono='+this.tel).subscribe(data => {
        if(data["status"]=="1"){
          this.modificacionExitosa();
        }else{
          this.errorModificacion();
        }
      }, err => {
        console.log(err);
      });
    });
  }

  atras(){
    this.router.navigateByUrl('menu/menu/rh/perfil?id='+this.id);
  }

  formatDates(fecha){
    var di = new Date(fecha);
    var month = ((di.getMonth() + 1 )+"").length < 2 ? "0"+(di.getMonth() + 1 ) : (di.getMonth() + 1 );
    var day = ((di.getDate())+"").length < 2 ? "0"+(di.getDate()) : (di.getDate());
    var year = di.getFullYear();
    return year+"/"+month+"/"+day;
  }
}
