import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, of, throwError, delay } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ApiResponse } from '../models/api-response.model';
import { ZoneType } from '../models/zone.model';
import { SpaceType } from '../models/space.model';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  private apiUrl = `${environment.apiUrl}/zone`;

  constructor(private http: HttpClient) {}

  create() {}

  getAll(id: number): Observable<ApiResponse<Array<SpaceType>>> {
    return of({
      ok: true,
      message: 'Success',
      statusCode: 200,
      data: spaces.filter((s) => s.id_zone === id),
    }).pipe(delay(250));
  }
}

const spaces: Array<SpaceType> = [
  {
    id: 1,
    id_zone: 1,
    state: 'disponible',
    type: 'discapacitado',
  },
  {
    id: 2,
    id_zone: 1,
    state: 'disponible',
    type: 'moto',
  },
  {
    id: 3,
    id_zone: 1,
    state: 'disponible',
    type: 'vehiculo',
  },
  {
    id: 4,
    id_zone: 2,
    state: 'ocupado',
    type: 'moto',
  },
  {
    id: 5,
    id_zone: 3,
    state: 'disponible',
    type: 'moto',
  },
  {
    id: 6,
    id_zone: 3,
    state: 'ocupado',
    type: 'vehiculo',
  },
];
