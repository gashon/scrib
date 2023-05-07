interface PostRepository {
  create(params: IPost): Promise<PostDocument>;
  findById(id: string): Promise<PostDocument | null>;
  find(params: mongoose.FilterQuery<IPost>): Promise<PostDocument[]>;
  findOne(params: mongoose.FilterQuery<IPost>): Promise<PostDocument | null>;
  updateById(id: string, params: IPost): Promise<PostDocument | null>;
  deleteById(id: string): Promise<PostDocument | null>;
}

type OrderBy<T> = {
  field: keyof T;
  order: 'asc' | 'desc';
};
