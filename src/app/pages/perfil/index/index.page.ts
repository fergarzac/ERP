import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(private roter:Router) { }
  
  ngOnInit() {
  }
  agregarContacto(){
    this.roter.navigateByUrl('menu/menu/rh/agregar');
  }
}
