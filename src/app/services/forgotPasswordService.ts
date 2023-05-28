import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private path = '/v1/auth';
  private token_byCrypt = 'Local_TokenInfo';
  private apiUrl: string = '';
  emails: any[] = [];

  constructor(private http: HttpClient) {}

  recuperarSenha(email: String): Observable<FormData> {
    return this.http.post<FormData>(
      `${environment.api}${this.path}/recoveryPassword`,
      email
    );
  }

  signup(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  changePassword(password: User): Observable<FormData> {
    return this.http.post<FormData>(
      `${environment.api}${this.path}/changePassword`,
      password
    );
  }
}
