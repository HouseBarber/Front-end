import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService{
  private apiUrl: string = 'http://localhost:8080/api/clienteBarbearia/';
  dadosCadastro: any[] = [];

  constructor(private http: HttpClient) { }

  adicionarDadosCadastro(dados: any): void {
    this.dadosCadastro.push(dados);
    console.log(this.dadosCadastro);
  }

  signup(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

}
