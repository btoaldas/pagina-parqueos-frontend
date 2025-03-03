import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, of, throwError, delay } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ApiResponse } from '../models/api-response.model';
import { ZoneType } from '../models/zone.model';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  private apiUrl = `${environment.apiUrl}/zone`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Array<ZoneType>>> {
    return of({
      message: 'Success',
      statusCode: 200,
      data: zones,
    }).pipe(delay(250));
  }
}

const zones: Array<ZoneType> = [
  {
    id: 1,
    name: 'Blue Zone',
    fee: '2.3',
    max_time: 3600,
  },
  {
    id: 2,
    name: 'Red Zone',
    fee: '3.1',
    max_time: 5000,
  },
  {
    id: 3,
    name: 'Yellow Zone',
    fee: '2.5',
    max_time: 2000,
  },
  {
    id: 4,
    name: 'Purple Zone',
    fee: '1.2',
    max_time: 1000,
  },
];
