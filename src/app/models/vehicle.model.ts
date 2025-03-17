export interface VehicleModel {
  id: number;
  plate: string;
}

export interface VehicleRequest {
  id_user: number | null;
  plate: string;
  brand: string;
  model: string;
  year: number;
  taxable_base: number;
}
