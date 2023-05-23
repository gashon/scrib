import mongoose from '@scrib/db/mongo';
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
      required: false,
      trim: true,
      maxlength: 1000,
      default: '',
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
      autopopulate: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    reading_time: {
      type: Number,
      default: 0,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } }
);

postSchema.index({ created_by: 1 }, { unique: false });
postSchema.index({ title: 1 }, { unique: false });

export * from './types';
export default (mongoose.models.Post as Model<PostDocument>) ||
  mongoose.model<PostDocument>('Post', postSchema);
