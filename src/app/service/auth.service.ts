import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { User } from '../auth/user';
import { AuthResponse } from '../auth/auth-response';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Storage } from '@ionic/storage';
const TOKEN_KEY = 'ACCESS_TOKEN';
const ID_KEY = 'ID_TOKEN';
const TIPO_KEY = 'TIPO_ACCESS';
const EMPRESA_KEY = 'EMPRESA_KEY';
@Injectable({
  providedIn: 'root'
})




export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:8080';
  authstate = new BehaviorSubject(false);
  constructor(private storage: Storage,private plt: Platform, private httpClient: HttpClient) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/login/?correo='+user.nombre+"&contras="+user.password).pipe(
      tap(async (res: AuthResponse) => {
        if (res.status == '1') {
          await this.storage.set(TOKEN_KEY, res.token);
          await this.storage.set(ID_KEY, res.id_usuario);
          await this.storage.set(TIPO_KEY, res.rol);
          await this.storage.set(EMPRESA_KEY, res.id_empresa);
          this.authstate.next(true);
        }else{
          this.authstate.next(false);
        }
      })
    );
  }

  registrar(user: User): Observable<AuthResponse> {
    return this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/agregar/?username='+user.usuario+"&contras="+user.password+"&nombre="+user.nombre+"&apellido_p="+user.apellido_p+"&apellido_m="+user.apellido_m+"&tipo=1&id_empresa=80808541-7f22-11e9-a055-204747e63348").pipe(
      tap(async (res: AuthResponse) => {
        if (res.status == '1') {
          this.authstate.next(true);
        }else{
          this.authstate.next(false);
        }
      })
    );
  }
  logout(){
    return this.storage.remove(TOKEN_KEY).then(res => {
      this.authstate.next(false);
    });
  }

  isAuthenticated(){
    return this.authstate.value;
  }

  checkToken(){
    return this.storage.get(TOKEN_KEY).then(res=> {
      if(res){
        this.authstate.next(true);
      }
    });
  }
}
