import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';

import { environment } from '@/environments/environment.prod';

import { ApiResponse } from '../models/api-response.model';
import { SpaceResponse, SpaceType } from '../models/space.model';
import { TicketModel } from '../models/ticket.model';
import { VehicleModel } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/vehicle`;

  constructor(private http: HttpClient) {}

  getVehicles() {
    return this.http.get<ApiResponse<VehicleModel[]>>(this.apiUrl);
  }
}
