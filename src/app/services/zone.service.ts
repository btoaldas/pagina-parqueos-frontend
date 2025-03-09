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
    return this.http.get<ApiResponse<Array<ZoneType>>>(this.apiUrl);
  }

  updateZone(
    id: number,
    name: string,
    fee: string,
    max_time: number
  ): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(this.apiUrl + '/' + id, {
      name,
      fee,
      max_time,
    });
  }

  createZone(
    name: string,
    fee: string,
    max_time: number
  ): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(this.apiUrl, {
      name,
      fee,
      max_time,
    });
  }
}
