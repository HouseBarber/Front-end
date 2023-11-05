import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import Estabelecimento from '../models/estabelecimento';
import {Page} from "../models/Page";
import {InfoDTO} from "../models/infoDTO";
import {EstablishmentListComponent} from "../pages/establishment/establishment-list/establishment-list.component";

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private path = 'v1/establishment';

  constructor(private http: HttpClient) {}

  getAllEstablishments(userId: number, page: number = 0, size: number = 10): Observable<InfoDTO<Page<Estabelecimento>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    console.log(`${environment.api}/${this.path}/${userId}`);
    return this.http.get<InfoDTO<Page<Estabelecimento>>>(`${environment.api}/${this.path}/user/${userId}`, { params });
  }

  findEstablishmentById(establishmentId: number): Observable<InfoDTO<Estabelecimento>>{
    return this.http.get<InfoDTO<Estabelecimento>>(`${environment.api}/${this.path}/${establishmentId}`);
  }
}
