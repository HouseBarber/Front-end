import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import User from '../models/User';
import Estabelecimento from '../models/estabelecimento';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private path = '/v1/establish';
  private token_byCrypt = 'Local_TokenInfo';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post(`${environment.api}${this.path}/login`, user);
  }

  getUserTokenInfo() {
    return localStorage.getItem(this.token_byCrypt);
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

  signUp(establishment: Estabelecimento): Observable<any> {
    console.log(`${environment.api}${this.path}/creatEstablishment`);
    return this.http.post(`${environment.api}${this.path}/creatEstablishment`, establishment);
  }
}
