import mongoose from '@scrib/db/mongoose';
import { Resource } from '@scrib/db/util';

export interface IUser extends Resource {
  name: string;
  email: string;
  avatar: string;
  last_login?: Date | number;
}

export type UserCreateRequest = Partial<Pick<IUser, 'email'>>;

export type UserDocument = mongoose.Document<string, object, IUser>;
