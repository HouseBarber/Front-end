import { Observable } from 'rxjs';
import { EmployeeService } from './../../services/employee.service';
import { Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent {

  employees: Observable<Employee[]>;

  displayedColumns: string[] = ['id', 'name', 'office', 'situation'];

  @ViewChild(MatTable) table!: MatTable<Employee>;

  constructor(private employeeService: EmployeeService) {
    this.employees = this.employeeService.list();
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addData() {
  }

}

