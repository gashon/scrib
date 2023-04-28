import { Context } from '@scrib/api/graphql/context';
import { postConnection } from '@scrib/api/graphql/schema/types/connections';
import { OrderByInput } from '@scrib/api/graphql/schema/types/inputs';
import { nodesToConnection } from '@scrib/api/graphql/util';
import { IUser } from '@scrib/db/models/user';
import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: (): any => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Globally unique ID of the post',
      resolve: (obj: IUser) => obj._id.toString(),
    },
    name: {
      type: GraphQLString,
      description: 'The name of the post.',
      resolve: (obj: IUser) => obj.name,
    },
    email: {
      type: GraphQLString,
      description: 'The email of the post.',
      resolve: (obj: IUser) => obj.email,
    },
    avatar: {
      type: GraphQLString,
      description: 'The avatar of the post.',
      resolve: (obj: IUser) => obj.avatar,
    },
    posts: {
      type: postConnection,
      args: {
        first: {
          defaultValue: 10,
          description:
            'Limits the number of results returned in the page. Defaults to 10.',
          type: GraphQLInt,
        },
        after: {
          defaultValue: 'Y3Vyc29yMA==', // base64encode('cursor0')
          description:
            'The cursor value of an item returned in previous page. An alternative to in integer offset.',
          type: GraphQLString,
        },
        orderBy: {
          defaultValue: [{ field: 'createdAt', order: 'desc' }],
          type: new GraphQLList(OrderByInput),
          description: 'Ordering of the results.',
        },
      },
      resolve: async (
        obj: IUser,
        { first, after, query, orderBy }: any,
        context: Context,
      ) => {
        const authorId = obj._id.toString();

        const [posts, totalCount] = await Promise.all([
          context.db.postRepository.paginate({
            params: {
              created_by: authorId,
            },
            first,
            after,
            orderBy,
          }),
          context.db.postRepository.count({
            created_by: authorId,
          }),
        ]);

        const connection = nodesToConnection(posts, totalCount, after);
        return connection;
      },
    },
  }),
});
