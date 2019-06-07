import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { HttpClient } from  '@angular/common/http';

@Component({
  selector: 'app-addtrabajosa',
  templateUrl: './addtrabajosa.page.html',
  styleUrls: ['./addtrabajosa.page.scss'],
})
export class AddtrabajosaPage implements OnInit {
  empresa: string ="";
  telefono: string ="";
  puesto: string="";
  fechai:string="";
  fechat:string="";
  id: string ="";
  constructor(private ptf:Platform,private storage: Storage,private  router:  Router,public alertController: AlertController) { }

  ngOnInit() {
    this.id = this.ptf.getQueryParam("id");
  }
  agregar(){
    var di = new Date(this.fechai);
    var dt = new Date(this.fechat);
    var month = ((di.getMonth() + 1 )+"").length < 2 ? "0"+(di.getMonth() + 1 ) : (di.getMonth() + 1 );
    var day = ((di.getDate())+"").length < 2 ? "0"+(di.getDate()) : (di.getDate());
    var year = di.getFullYear();
    var fechai = year+"/"+month+"/"+day;
    
    var month = ((dt.getMonth() + 1 )+"").length < 2 ? "0"+(dt.getMonth() + 1 ) : (dt.getMonth() + 1 );
    var day = ((dt.getDate())+"").length < 2 ? "0"+(dt.getDate()) : (dt.getDate());
    var year = dt.getFullYear();
    var fechat = year+"/"+month+"/"+day;
  }
  atras(){
    this.router.navigateByUrl('menu/menu/rh/trabajosa?id='+this.id);
  }
}
