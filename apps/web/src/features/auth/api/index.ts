import { IUser } from '@scrib/db/models/user';
import { axios } from '@scrib/web/lib/axios';
import { AxiosResponse } from 'axios';
import { ParsedUrlQuery } from 'querystring';
import { JwtPayload } from '@scrib/api/utils/jwt';
import { LoginFormData } from '../types';

export const getUser = async (headers?: {
  [key: string]: string;
}): Promise<
  AxiosResponse<{
    data: JwtPayload;
  }>
> => {
  return axios.get('/ajax/auth/user', {
    headers,
  });
};

export const emailLogin = async (
  payload: LoginFormData,
  params: ParsedUrlQuery,
  enabled?: boolean
) => {
  return axios.post('/ajax/auth/login/email', payload, { params });
};

export const signOut = async () => {
  return axios.get('/ajax/auth/logout');
};
