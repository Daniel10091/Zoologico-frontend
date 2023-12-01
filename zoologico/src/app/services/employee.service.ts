import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable()
export class EmployeeService {

  private static readonly API = `${environment.apiURLBase}/funcionario`;

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(EmployeeService.API);
  }

  registerEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(EmployeeService.API, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${EmployeeService.API}/${employee.code}`, employee);
  }

  deleteEmployee(employee: Employee): Observable<any> {
    return this.http.delete<any>(`${EmployeeService.API}/${employee.code}`);
  }

}
