import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import User from '../models/User';
import { TokenRecovery } from '../models/tokenRecovery';
import { InfoDTO } from '../models/infoDTO';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private path = '/v1/auth';
  private token_byCrypt = 'Local_TokenInfo';
  private apiUrl: string = '';
  emails: any[] = [];

  constructor(private http: HttpClient) {}

  recuperarSenha(user: User): Observable<FormData> {
    return this.http.post<FormData>(
      `${environment.api}${this.path}/recoveryPassword`, user);
  }

  signup(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  changePassword(password: String, token: String): Observable<FormData> {
    return this.http.post<FormData>(
      `${environment.api}${this.path}/changePassword`,
      { password: password, token: token }
    );
  }

  validToken(tokenRecovery: String): Observable<InfoDTO<TokenRecovery>> {
    return this.http.get<InfoDTO<TokenRecovery>>(
      `${environment.api}${this.path}/changePassword/${tokenRecovery}`
    );
  }
}
