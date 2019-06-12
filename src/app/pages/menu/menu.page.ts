import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Storage } from '@ionic/storage';
const ID_KEY = 'ID_TOKEN';
const TOKEN_KEY = 'ACCESS_TOKEN';
const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      'icon': 'people',
      'title': 'RH',
      'url': '/menu/menu/rh'
    },
    {
      'icon': 'build',
      'title': 'Activos',
      'url': '/menu/menu/activos'
    },
    {
      'icon': 'clipboard',
      'title': 'Viaticos',
      'url': '/menu/menu/viaticos'
    }
  ];

  selectedPath = '';
  tipo: string = '';
  constructor(private storage: Storage,private router: Router, private authService: AuthService) { 
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
    this.storage.get(TIPO_KEY).then((val) => {
      this.tipo = val;
    });

    console.log(this.tipo);
  }
  perfil() {
    this.storage.get(TIPO_KEY).then((val) => {
      console.log("val: "+val);
      if(val == 1){
        this.router.navigateByUrl('/menu/menu/perfil');
      }else{
        this.storage.get(ID_KEY).then((val) => {
          this.router.navigateByUrl('menu/menu/rh/perfil?id='+val);
        });
      }
    });
  }

  salir() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
