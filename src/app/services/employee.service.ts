import { Employee } from './../models/Employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly API = '/assets/persons/employee.json';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient
      .get<Employee[]>(this.API)
      .pipe(tap((employee) => console.log(employee)));
  }
}
