export interface SpaceCreateType {
  state: 'disponible' | 'ocupado';
  type: 'vehiculo' | 'moto' | 'discapacitado';
  id_zone: number;
}

export interface SpaceType extends SpaceCreateType {
  id: number;
}
