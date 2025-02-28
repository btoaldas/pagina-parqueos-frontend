import { type ApiResponse } from './apiresponse';
import { type UserType } from './userresponse';

export type LoginResponseType = ApiResponse<{
  token: string;
  user: UserType;
}>;
