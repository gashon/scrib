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

  public async paginate({
    params,
    first,
    after,
    orderBy,
  }: {
    params: mongoose.FilterQuery<IPost>;
    first: number | undefined;
    after: number | undefined;
    orderBy: [keyof IPost, 'asc' | 'desc'][] | undefined;
  }): Promise<PostDocument[]> {
    const query = this.postModel.find(params);
    if (first) {
      query.limit(first);
    }
    if (after) {
      query.skip(after);
    }
    if (orderBy) {
      orderBy.forEach(([field, order]) => {
        query.sort({ [field]: order });
      });
    }
    return query.exec();
  }

  public async count(params: mongoose.FilterQuery<IPost>): Promise<number> {
    return this.postModel.countDocuments(params);
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
