export interface ZoneCreateType {
  name: string;
  fee: string;
  max_time: number;
}

export interface ZoneType extends ZoneCreateType {
  id: number;
}
