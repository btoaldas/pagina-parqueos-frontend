export interface UserType {
  id: number;
  email: string;
  name: string;
  lastname: string;
  role: 'cliente' | 'empleado' | 'admin';
  state: number;
}

export interface UserCreateType extends Omit<UserType, 'id'> {
  password: string;
}
