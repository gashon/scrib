import mongoose from '@scrib/db/mongo';
import md5 from 'md5';
import { Model } from 'mongoose';

import { IUser, UserDocument } from './types';

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      default(this: IUser) {
        return this.email;
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      default(this: IUser) {
        return (
          this.email &&
          `https://www.gravatar.com/avatar/${md5(this.email)}?d=retro`
        );
      },
      trim: true,
    },
    last_login: {
      type: Date,
      default: null,
      get: (v?: Date) => v?.getTime() || null,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } },
);

userSchema.index({ email: 1 }, { unique: true });

export * from './types';
export default (mongoose.models.User as Model<UserDocument>) ||
  mongoose.model<UserDocument>('User', userSchema);
