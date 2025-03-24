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

  get(id: number): Observable<ApiResponse<TicketModel>> {
    return this.http.get<ApiResponse<TicketModel>>(this.apiUrl + '/' + id).pipe(
      tap((response) => {
        if (!response.data) return;
        const ticket = response.data;

        ticket.entry_date = new Date(ticket.entry_date + 'Z');

        if (ticket.exit_date == null) return;
        ticket.exit_date = new Date(ticket.exit_date + 'Z');
      })
    );
  }

  getByPlate(plate: string): Observable<ApiResponse<Array<TicketModel>>> {
    return this.http
      .get<ApiResponse<Array<TicketModel>>>(this.apiUrl + '/plate/' + plate)
      .pipe(
        tap((response) => {
          if (!response.data) return;

          const tickets = response.data;
          for (let i = 0; i < tickets.length; i++) {
            const ticket = tickets[i];

            ticket.entry_date = new Date(ticket.entry_date + 'Z');

            if (ticket.exit_date == null) continue;
            ticket.exit_date = new Date(ticket.exit_date + 'Z');
          }
        })
      );
  }

  create(id_space: number, id_vehicle: number) {
    return this.http.post<ApiResponse<number>>(this.apiUrl, {
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
