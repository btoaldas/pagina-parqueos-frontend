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
