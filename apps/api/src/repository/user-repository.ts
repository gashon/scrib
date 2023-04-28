import { Models } from '@scrib/db/models';
import { IUser, UserDocument } from '@scrib/db/models/user';
import mongoose from 'mongoose';

export class UserRepository {
  private userModel: Models['User'];

  constructor(models: Models) {
    this.userModel = models.User;
  }

  public async create(params: IUser): Promise<UserDocument> {
    return this.userModel.create(params);
  }

  public async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id);
  }

  public async find(
    params: mongoose.FilterQuery<IUser>,
  ): Promise<UserDocument[]> {
    return this.userModel.find(params);
  }

  public async paginate({
    params,
    first,
    after,
    orderBy,
  }: {
    params: mongoose.FilterQuery<IUser>;
    first: number | undefined;
    after: number | undefined;
    orderBy: [keyof IUser, 'asc' | 'desc'][] | undefined;
  }): Promise<UserDocument[]> {
    const query = this.userModel.find(params);
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

  public async count(params: mongoose.FilterQuery<IUser>): Promise<number> {
    return this.userModel.countDocuments(params);
  }

  public async findOne(
    params: mongoose.FilterQuery<IUser>,
  ): Promise<UserDocument | null> {
    return this.userModel.findOne(params);
  }

  public async updateById(
    id: string,
    params: Partial<IUser>,
  ): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, params, { new: true });
  }

  public async deleteById(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        deleted_at: new Date(),
      },
      { new: true },
    );
  }
}
