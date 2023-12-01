import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class PositionService {

  private static readonly API = `${environment.apiURLBase}/cargo`;

  constructor(private http: HttpClient) { }

  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(PositionService.API);
  }

  findPositionByCode(code: number): Observable<Position> {
    return this.http.get<Position>(`${PositionService.API}/${code}`);
  }

}
