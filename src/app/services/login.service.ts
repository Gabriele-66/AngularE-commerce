import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  getLoginAdmin():Observable<Auth> {
    return this.http.get<Auth>("/assets/loginAdmin.json");
  }

  getLoginUser():Observable<Auth> {
    return this.http.get<Auth>("/assets/loginUser.json");
  }

  getLoginFailed():Observable<Auth> {
    return this.http.get<Auth>("/assets/loginFailed.json");
  }

}
