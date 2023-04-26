import { Document, Model } from 'mongoose';

import User, { IUser } from './user';

export type Models = {
  User: Model<Document<string, object, IUser>, {}, {}, {}, any, any>;
};

const models: Models = {
  User,
};

export * from './user';
export default models;
