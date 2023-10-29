import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import Estabelecimento from '../models/estabelecimento';
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private path = '/v1/establishment';

  constructor(private http: HttpClient) {}

  getAllEstablishments(userId: number, page: number = 0, size: number = 10): Observable<Page<Estabelecimento>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Estabelecimento>>(`${environment.api}/${this.path}/${userId}`, { params });
  }
}
