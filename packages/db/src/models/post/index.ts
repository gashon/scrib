import mongoose from '@scrib/db/mongo';
import md5 from 'md5';
import { Model } from 'mongoose';

import { IPost, PostDocument } from './types';

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    created_by: {
      ref: 'User',
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } },
);

postSchema.index({ email: 1 }, { unique: true });

export * from './types';
export default (mongoose.models.Post as Model<PostDocument>) ||
  mongoose.model<PostDocument>('Post', postSchema);
