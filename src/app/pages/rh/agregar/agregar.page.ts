import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from  '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { ConstantesService } from 'src/app/constantes.service';

const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  tipo = "3";
  admin: boolean = true;
  constructor(private constService: ConstantesService,private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private authService: AuthService,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
    
  }
  ionViewDidEnter() {
    this.storage.get(TIPO_KEY).then((val) => {
      if(val == "1"){
        this.admin = true;
      }else{
        this.admin = false;
      }
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Registrarse',
      message: '¡Ups! Parece que algo ha salido mal.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Registrarse',
      message: 'Registrado exitosamente, ve e inicia sesión.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Registrarse',
      message: 'Las contraseñas no coinciden.',
      buttons: ['OK']
    });

    await alert.present();
  }
  registrar(form){
    if(form.value.password == form.value.password2){
        this.storage.get(EMPRESA_KEY).then((val) => {
          this.httpClient.get(this.constService.getApi() + '/usuarios/agregar/?username='+form.value.usuario+"&contras="+form.value.password+"&nombre="+form.value.nombre+"&apellido_p="+form.value.apellido_p+"&apellido_m="+form.value.apellido_m+"&tipo="+this.tipo+"&id_empresa="+val).subscribe(data => {
            if(data["status"]=="1"){
              this.presentAlert1();
            }else{
              this.presentAlert();
            }
          }, err => {
            console.log(err);
          });
        });
    }else{
      this.presentAlert2();
    }
    
  }

  atras(){
    this.router.navigateByUrl('menu/menu/rh');
  }
}
