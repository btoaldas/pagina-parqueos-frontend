import { type ApiResponse } from './api-response.model';
import { type UserType } from './user.model';

export type LoginResponseType = ApiResponse<{
  token: string;
  user: UserType;
}>;
