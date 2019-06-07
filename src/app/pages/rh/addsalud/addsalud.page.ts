import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { HttpClient } from  '@angular/common/http';

@Component({
  selector: 'app-addsalud',
  templateUrl: './addsalud.page.html',
  styleUrls: ['./addsalud.page.scss'],
})
export class AddsaludPage implements OnInit {
  nombre: string ="";
  tipo: string ="";
  condicion: string="";
  observacion:string="";
  id: string ="";
  constructor(private ptf:Platform,private storage: Storage,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
    this.id = this.ptf.getQueryParam("id");
  }

  agregar(){
    
  }

  atras(){
    this.router.navigateByUrl('menu/menu/rh/salud?id='+this.id);
  }
}
