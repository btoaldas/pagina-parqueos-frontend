export type UserType = {
  id: number;
  email: string;
  name: string;
  lastname: string;
  role: 'cliente' | 'empleado' | 'admin';
  state: number;
};
