import { Models } from '@scrib/db/models';
import { IPost, PostDocument } from '@scrib/db/models/post';
import mongoose from 'mongoose';

export class PostRepository {
  private postModel: Models['Post'];

  constructor(models: Models) {
    this.postModel = models.Post;
  }

  public async create(params: IPost): Promise<PostDocument> {
    return this.postModel.create(params);
  }

  public async findById(id: string): Promise<PostDocument | null> {
    return this.postModel.findById(id);
  }

  public async find(
    params: mongoose.FilterQuery<IPost>,
  ): Promise<PostDocument[]> {
    return this.postModel.find(params);
  }

  public async findOne(
    params: mongoose.FilterQuery<IPost>,
  ): Promise<PostDocument | null> {
    return this.postModel.findOne(params);
  }

  public async updateById(
    id: string,
    params: IPost,
  ): Promise<PostDocument | null> {
    return this.postModel.findByIdAndUpdate(id, params, { new: true });
  }

  public async deleteById(id: string): Promise<PostDocument | null> {
    return this.postModel.findByIdAndUpdate(
      id,
      {
        deleted_at: new Date(),
      },
      { new: true },
    );
  }
}
