import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import {Role} from "../models/role";

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private path = '/v1/roles';

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(
      `${environment.api}${this.path}`
    );
  }
}
