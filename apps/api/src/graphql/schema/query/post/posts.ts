import { Context } from '@scrib/api/graphql/context';
import { postConnection } from '@scrib/api/graphql/schema/types';
import { cursorToInt, nodesToConnection } from '@scrib/api/graphql/util';
import { IPost } from '@scrib/db/models/post';
import { GraphQLInt, GraphQLList, GraphQLString } from 'graphql';

type PostsQueryArgs = {
  first?: number;
  after?: string;
  orderBy?: [keyof IPost, 'asc' | 'desc'][];
  createdBy: string;
};

export const posts = {
  type: postConnection,
  args: {
    first: {
      type: GraphQLInt,
      description: 'Returns the first n elements from the list.',
    },
    after: {
      type: GraphQLString,
      description:
        'Returns the elements in the list that come after the specified cursor.',
    },
    orderBy: {
      type: new GraphQLList(GraphQLString),
      description:
        'Sorts the elements of this list according to the given order.',
    },
    createdBy: {
      type: GraphQLString!,
      description: 'Filter by the user who created the post.',
    },
  },
  resolve: async (_: any, args: PostsQueryArgs, context: Context) => {
    const { first, after, orderBy, createdBy } = args;
    const afterInt = cursorToInt(after);

    const [posts, postsCount] = await Promise.all([
      context.db.postRepository.paginate({
        params: {
          created_by: createdBy,
        },
        first,
        after: afterInt,
        orderBy,
      }),
      context.db.postRepository.count({
        params: {
          created_by: createdBy,
        },
      }),
    ]);

    const connection = nodesToConnection(posts, postsCount, afterInt);
    return connection;
  },
};
