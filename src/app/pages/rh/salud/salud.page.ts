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
  selector: 'app-salud',
  templateUrl: './salud.page.html',
  styleUrls: ['./salud.page.scss'],
})
export class SaludPage implements OnInit {
  listaSalud = [];
  constructor(private ptf:Platform,private storage: Storage,private httpClient: HttpClient,private  router:  Router,) { }
  id: string = "";
  ngOnInit() {
    this.id = this.ptf.getQueryParam("id");
    this.listaSalud = [
      {
        enfermedad: 'Alegia',
        condicion: 'Controlada',
        tipo: 'Benigna',
        observaciones: 'algo'
      },
      {
        enfermedad: 'Enfermedad 1',
        condicion: 'Controlada',
        tipo: 'Benigna',
        observaciones: ''
      },
      {
        enfermedad: 'Enfermedad 1',
        condicion: 'Controlada',
        tipo: 'Benigna',
        observaciones: ''
      }
    ]
  }

  add(){
    this.router.navigateByUrl('menu/menu/rh/addsalud?id='+this.id);
  }

}
