import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private apiUrl: string = '';
  emails: any[] = [];

  constructor(private http: HttpClient) { }

  recuperarSenha(email: String): void {
    this.emails.push(email);
    console.log(this.emails);
  }

  signup(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}
