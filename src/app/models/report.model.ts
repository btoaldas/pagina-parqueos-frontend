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
