import { Document, Model } from 'mongoose';

import Post, { PostDocument } from './post';
import User, { UserDocument } from './user';
import Notification, { NotificationDocument } from './notification';

export type Models = {
  User: Model<UserDocument, {}, {}, {}, any, any>;
  Post: Model<PostDocument, {}, {}, {}, any, any>;
  Notification: Model<NotificationDocument, {}, {}, {}, any, any>;
};

const models: Models = {
  User,
  Post,
  Notification,
};

export default models;
