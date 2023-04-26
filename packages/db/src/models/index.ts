import { Document, Model } from 'mongoose';

import Post, { PostDocument } from './post';
import User, { UserDocument } from './user';

export type Models = {
  User: Model<UserDocument, {}, {}, {}, any, any>;
  Post: Model<PostDocument, {}, {}, {}, any, any>;
};

const models: Models = {
  User,
  Post,
};

export default models;
