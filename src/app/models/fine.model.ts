export interface FineResponse {
  id: number;
  amount: number;
  description: string;
  mime: string;
  state: string;
  pay_date: Date;
  ticket: {
    id: number;
    plate: string;
    state: string;
    amount: number;
    id_user: 1;
    exit_date: Date;
    entry_date: Date;
  };
}

export interface FineProfile {
  id: number;
  amount: string;
  mime: string;
  plate: string;
  state: string;
  id_ticket: number;
}
