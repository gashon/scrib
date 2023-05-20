import mongoose from '@scrib/db/mongo';
import { Resource } from '@scrib/db/util';
import { IUser } from '@scrib/db/models/user';

export type NotificationType = 'login';

export interface INotification extends Resource {
  user: IUser;
  type: NotificationType;
  data: { [key: string]: any };
  emails: string[];
}

export type NotificationDocument = mongoose.Document<
  string,
  object,
  INotification
>;
