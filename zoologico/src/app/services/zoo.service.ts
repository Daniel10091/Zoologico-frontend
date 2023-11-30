import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Zoo } from '../models/zoo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ZooService {

  private static readonly API = `${environment.apiURLBase}/animal`;

  constructor(private http: HttpClient) { }

  getAllZoos(): Observable<Zoo[]> {
    return this.http.get<Zoo[]>(ZooService.API);
  }

  registerZoo(zoo: Zoo): Observable<Zoo> {
    return this.http.post<Zoo>(ZooService.API, zoo);
  }

  updateZoo(zoo: Zoo): Observable<Zoo> {
    return this.http.put<Zoo>(`${ZooService.API}/${zoo.zoologicoCode}`, zoo);
  }

  deleteZoo(zoo: Zoo): Observable<any> {
    return this.http.delete<any>(`${ZooService.API}/${zoo.zoologicoCode}`);
  }

}
