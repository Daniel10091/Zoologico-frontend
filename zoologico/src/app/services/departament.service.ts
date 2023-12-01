import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Departament } from '../models/departament';
import { Observable } from 'rxjs';

@Injectable()
export class DepartamentService {

  private static readonly API = `${environment.apiURLBase}/departamento`;

  constructor(private http: HttpClient) { }

  getAllDepartaments(): Observable<Departament[]> {
    return this.http.get<Departament[]>(DepartamentService.API);
  }

  findDepartamentByCode(code: number): Observable<Departament> {
    return this.http.get<Departament>(`${DepartamentService.API}/${code}`);
  }
  
}
