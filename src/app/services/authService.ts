import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import User from '../models/User';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private path = '/v1/auth';
  private token_byCrypt = 'Local_TokenInfo';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post(`${environment.api}${this.path}/login`, user);
  }

  getUserTokenInfo() {
    return localStorage.getItem(this.token_byCrypt);
  }

  getUserByToken(): User | null {
    const user: User = new User();
    const infoUserLocalStorage = this.getUserTokenInfo();

    if (infoUserLocalStorage) {
      const decoded: any = jwt_decode(infoUserLocalStorage);

      user.id = decoded.id;
      user.username = decoded.username;
      user.email = decoded.email;
      user.name = decoded.name;
      user.roles = decoded.roles; 

      return user;
    }

    return null;
  }

  setInfoUserLocalStorage(infoUser: string) {
    localStorage.setItem(this.token_byCrypt, infoUser);
  }

  checkIsAuthenticated() {
    return this.getUserTokenInfo() !== null;
  }

  logout() {
    localStorage.removeItem(this.token_byCrypt);
    window.location.href = '/login';
  }

  signUp(user: any): Observable<any> {
    return this.http.post(`${environment.api}${this.path}/register`, user);
  }
}
