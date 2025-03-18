import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';

import { environment } from '@/environments/environment.prod';

import { ApiResponse } from '../models/api-response.model';
import { SpaceResponse, SpaceType } from '../models/space.model';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  private apiUrl = `${environment.apiUrl}/space`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Array<SpaceResponse>>> {
    return this.http
      .get<ApiResponse<Array<SpaceResponse>>>(
        this.apiUrl + `?_=${new Date().getTime()}`
      )
      .pipe(
        tap({
          next: (response) => {
            if (!response.data) return;

            const spaces = response.data;

            for (let i = 0; i < spaces.length; i++) {
              spaces[i].latitude = parseFloat(
                spaces[i].latitude as unknown as string
              );
              spaces[i].longitude = parseFloat(
                spaces[i].longitude as unknown as string
              );
            }
          },
        })
      );
  }

  getAllByZone(id: number): Observable<ApiResponse<Array<SpaceResponse>>> {
    return this.http.get<ApiResponse<Array<SpaceResponse>>>(
      this.apiUrl + '/zone/' + id
    );
  }

  updateSpace(
    id: number,
    type: string,
    state: string,
    id_zone: number
  ): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(this.apiUrl + '/' + id, {
      type,
      state,
      id_zone,
    });
  }

  createSpace(
    type: string,
    state: string,
    id_zone: number
  ): Observable<ApiResponse<boolean>> {
    console.log({ id_zone });
    return this.http.post<ApiResponse<boolean>>(this.apiUrl, {
      type,
      state,
      id_zone,
    });
  }
}
