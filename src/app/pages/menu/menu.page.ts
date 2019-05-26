import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      'title': 'Dashboard',
      'url': '/menu/menu/home'
    },
    {
      'title': 'Perfil',
      'url': '/menu/menu/perfil'
    },
    {
      'title': 'Usuarios',
      'url': '/menu/menu/usuarios'
    },
    {
      'title': 'RH',
      'url': '/menu/menu/rh'
    },
    {
      'title': 'Activos',
      'url': '/menu/menu/activos'
    },
    {
      'title': 'Viaticos',
      'url': '/menu/menu/viaticos'
    },
    {
      'title': 'Flotilla',
      'url': '/menu/menu/flotilla'
    },
    {
      'title': 'Salir',
      'url': '/menu/menu/salir'
    }
  ];

  selectedPath = '';
  constructor(private router: Router) { 
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

}
