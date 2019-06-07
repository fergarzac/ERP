import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  constructor(private authService: AuthService,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
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
      this.authService.registrar(form.value).subscribe((res) => {
        
        if (res.status == '1') {
          form.reset();
          this.presentAlert1();
          this.router.navigateByUrl('login');
        }else{
          this.presentAlert();
        }
      });
    }else{
      this.presentAlert2();
    }
    
  }

  atras(){
    this.router.navigateByUrl('menu/menu/rh');
  }
}
