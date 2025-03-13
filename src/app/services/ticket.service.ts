import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';

import { environment } from '@/environments/environment.prod';

import { ApiResponse } from '../models/api-response.model';
import { TicketCreateModel, TicketModel } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = `${environment.apiUrl}/ticket`;

  constructor(private http: HttpClient) {}

  getByPlate(plate: string): Observable<ApiResponse<Array<TicketModel>>> {
    return this.http
      .get<ApiResponse<Array<TicketModel>>>(this.apiUrl + '/plate/' + plate)
      .pipe(
        tap((response) => {
          if (!response.data) return;

          const tickets = response.data;
          for (let i = 0; i < tickets.length; i++) {
            tickets[i].entry_date = new Date(tickets[i].entry_date);
            tickets[i].exit_date = new Date(tickets[i].exit_date);
          }
        })
      );
  }

  create(id_space: number, id_vehicle: number) {
    return this.http.post<ApiResponse<TicketCreateModel>>(this.apiUrl, {
      id_space,
      id_vehicle,
    });
  }

  complete(id: number): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      this.apiUrl + '/completed/' + id,
      {}
    );
  }
}
