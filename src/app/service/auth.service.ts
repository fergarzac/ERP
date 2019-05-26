import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { User } from '../auth/user';
import { AuthResponse } from '../auth/auth-response';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Storage } from '@ionic/storage';
const TOKEN_KEY = 'ACCESS_TOKEN';
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
    return this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/login/?username='+user.nombre+"&contras="+user.password).pipe(
      tap(async (res: AuthResponse) => {
        console.log(this.AUTH_SERVER_ADDRESS + '/usuarios/login/?username='+user.nombre+"&contras="+user.password);
        if (res.status == '1') {
          await this.storage.set(TOKEN_KEY, res.token);
          this.authstate.next(true);
        }else{
          this.authstate.next(false);
        }
      })
    );
  }

  registrar(user: User): Observable<AuthResponse> {
    return this.httpClient.get(this.AUTH_SERVER_ADDRESS + '/usuarios/agregar/?username='+user.nombre+"&pass="+user.password).pipe(
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
