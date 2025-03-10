export interface TicketModel {
  id: number;
  plate: string;
  entry_date: Date;
  exit_date: Date;
  amount: number;
  state: string;
  user: {
    id: number;
    name: string;
    lastname: string;
    email: string;
    state: number;
  };
}

export interface TicketCreateModel {
  id_space: number;
  plate: string;
}

export interface TicketProfile {
  id: number;
  entry_date: Date;
  max_date: Date;
  max_time: number;
  plate: string;
  state: string;
  zone_name: string;
}
