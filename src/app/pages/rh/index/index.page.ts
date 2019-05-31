import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  busqueda: boolean = false;
  trabajador = '';
  departamento = '';
  listaTrabajadores = [
    {id: 1, nombre: 'Katherine Lumaad', email: 'klumaad@sisna.mx'},
    {id: 2, nombre: 'Gorgonia Magalpok', email: 'you@sisna.mx'},
    {id: 3, nombre: 'Marilyn Tarter', email: 'marilyn@sisna.mx'},
    {id: 4, nombre: 'Daniel Ivan', email: 'daniel@sisna.mx'},
  ];
  constructor(private roter:Router) { }

  ngOnInit() {
  }

  showBusqueda(){
    this.busqueda = !this.busqueda;
  }

  buscarTrabajador(){
    console.log(this.trabajador);
  }
  buscarDepartamento(){
    console.log(this.trabajador);
  }

  agregarContacto(){
    this.roter.navigateByUrl('menu/menu/rh/agregar');
  }

  agregarDepartamento(){
    this.roter.navigateByUrl('menu/menu/rh/departamento');
  }

  perfilUsuario(id){
    this.roter.navigateByUrl('menu/menu/rh/perfil?id='+id);
  }
}
