import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import Estabelecimento from '../models/estabelecimento';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private path = '/v1/establishment';

  constructor(private http: HttpClient) {}

  getAllEstablishment(): Observable<Estabelecimento[]> {
    return this.http.get<Estabelecimento[]>(
      `${environment.api}${this.path}`
    );
  }
}
