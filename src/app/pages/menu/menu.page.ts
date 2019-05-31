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
      'icon': 'person',
      'title': 'Usuarios',
      'url': '/menu/menu/usuarios'
    },
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
    },
    {
      'icon': 'car',
      'title': 'Flotilla',
      'url': '/menu/menu/flotilla'
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
  perfil() {
    this.router.navigateByUrl('/menu/menu/perfil');
  }
}
