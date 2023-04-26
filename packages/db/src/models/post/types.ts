import mongoose from '@scrib/db/mongo';
import { Resource } from '@scrib/db/util';

export interface IPost extends Resource {
  created_by: mongoose.Types.ObjectId;
  title: string;
  content: string;
  views: number;
  likes: number;
  published: boolean;
}

export type PostDocument = mongoose.Document<string, object, IPost> & IPost;
