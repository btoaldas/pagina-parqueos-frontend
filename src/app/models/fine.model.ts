export interface FineResponse {
  id: number;
  amount: number;
  description: string;
  filename: string;
  state: string;
  pay_date: Date | null;
  vehicle: {
    id: number;
    year: number;
    model: string;
    plate: string;
    id_user: number;
  };
  employ: {
    id: number;
    lastname: string;
    name: string;
    role: string;
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
