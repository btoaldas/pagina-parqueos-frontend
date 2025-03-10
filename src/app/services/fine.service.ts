import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';

import { environment } from '@/environments/environment.prod';

import { ApiResponse } from '../models/api-response.model';
import { SpaceResponse, SpaceType } from '../models/space.model';
import { TicketCreateModel, TicketModel } from '../models/ticket.model';
import { FineResponse } from '../models/fine.model';

@Injectable({
  providedIn: 'root',
})
export class FineService {
  private apiUrl = `${environment.apiUrl}/fine`;

  constructor(private http: HttpClient) {}

  getFines(): Observable<ApiResponse<FineResponse[]>> {
    return this.http.get<ApiResponse<FineResponse[]>>(this.apiUrl);
  }

  pay(id: number): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(this.apiUrl + '/pay/' + id, {});
  }
}
