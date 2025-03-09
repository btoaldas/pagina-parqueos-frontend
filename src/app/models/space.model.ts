export interface SpaceBase {
  id: number;
  state: 'disponible' | 'ocupado' | 'mantenimiento';
  type: 'automovil' | 'moto' | 'discapacitado';
}

export interface SpaceResponse extends SpaceBase {
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
