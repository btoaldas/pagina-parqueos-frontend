export interface MainReportType {
  active_users: {
    current_month: number;
    last_month: number;
  };
  income_today: {
    total: number;
  };
  spaces_taken: {
    total: number;
    taken: number;
    percent: number;
  };
  fees: {
    total: number;
    amount: number | null;
  };
}

export interface StatsReportType {
  income_month: Array<{
    year: number;
    month: number;
    total: number;
  }>;
  each_space_taken: Array<{
    id: number;
    total: number;
    taken: number;
  }>;
  users_rol: {
    admin: number;
    employ: number;
    client: number;
  };
}
