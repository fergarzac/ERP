import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantesService {

  constructor() { }

  getApi () {
    return 'http://localhost:8080';
  }
}
