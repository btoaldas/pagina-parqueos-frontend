import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@/environments/environment.prod';

import { ApiResponse } from '../models/api-response.model';
import { VehicleModel, VehicleRequest } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/vehicle`;

  constructor(private http: HttpClient) {}

  getVehicles() {
    return this.http.get<ApiResponse<VehicleModel[]>>(this.apiUrl);
  }

  createVehicle(vehicle: VehicleRequest) {
    return this.http.post<ApiResponse<number>>(this.apiUrl, vehicle);
  }

  getVehiclesWithoutUser() {
    return this.http.get<ApiResponse<VehicleModel[]>>(
      `${this.apiUrl}/without-user`
    );
  }

  getVehiclesByUser(id: number) {
    return this.http.get<ApiResponse<VehicleModel[]>>(
      `${this.apiUrl}/user/${id}`
    );
  }

  updateVehicleUser(idVehicle: number, idUser: number) {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/update`, {
      id_vehicle: idVehicle,
      id_user: idUser,
    });
  }
}
