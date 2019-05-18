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
      'url': 'home'
    },
    {
      'title': 'Perfil',
      'url': 'perfil'
    },
    {
      'title': 'Usuarios',
      'url': 'usuarios'
    },
    {
      'title': 'RH',
      'url': 'rh'
    },
    {
      'title': 'Activos',
      'url': 'activos'
    },
    {
      'title': 'Viaticos',
      'url': 'viaticos'
    },
    {
      'title': 'Flotilla',
      'url': 'flotilla'
    },
    {
      'title': 'Salir',
      'url': 'salir'
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
