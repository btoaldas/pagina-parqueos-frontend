export interface SpaceBase {
  id: number;
  state: 'disponible' | 'ocupado' | 'mantenimiento';
  type: 'automovil' | 'moto' | 'discapacitado';
}

export interface SpaceResponse extends SpaceBase {
  latitude: number;
  longitude: number;
  zone: {
    id: number;
  };
}

export interface SpaceCreateType extends SpaceBase {
  id_zone: number;
}

export interface SpaceType extends SpaceCreateType {
  id: number;
}
