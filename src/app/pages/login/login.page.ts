import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private authService: AuthService,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login',
      message: '¡Ups! Parece que algo ha salido mal con tus credenciales por favor vuélvelo a intentar.',
      buttons: ['OK']
    });

    await alert.present();
  }
  login(form){
    this.authService.login(form.value).subscribe((res) => {
      console.log(res);
      if (res.status == '1') {
        form.reset();
        this.router.navigateByUrl('menu');
      }else{
        this.presentAlert();
      }
    });
  }
}
