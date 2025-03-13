export interface ZoneCreateType {
  name: string;
  fee: string;
  max_time: number;
  address: string;
  description: string;
}

export interface ZoneType extends ZoneCreateType {
  id: number;
}
