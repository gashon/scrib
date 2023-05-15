import { Context } from '@scrib/api/graphql/context';
import { postConnection } from '@scrib/api/graphql/schema/types/connections';
import { OrderByInput } from '@scrib/api/graphql/schema/types/inputs';
import { cursorToInt, nodesToConnection } from '@scrib/api/graphql/util';
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
      description: 'Globally unique ID of the user',
      resolve: (obj: IUser) => obj._id.toString(),
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the user.',
      resolve: (obj: IUser) => obj.first_name,
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the user.',
      resolve: (obj: IUser) => obj.last_name,
    },
    fullName: {
      type: GraphQLString,
      description: 'The full name of the user.',
      resolve: (obj: IUser) => `${obj.first_name} ${obj.last_name}`,
    },
    email: {
      type: GraphQLString,
      description: 'The email of the user.',
      resolve: (obj: IUser) => obj.email,
    },
    avatar: {
      type: GraphQLString,
      description: 'The avatar of the user.',
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
          defaultValue: [{ field: 'created_at', direction: 'desc' }],
          type: new GraphQLList(OrderByInput),
          description: 'Ordering of the results.',
        },
      },
      resolve: async (
        user: IUser,
        { first, after, query, orderBy }: any,
        context: Context
      ) => {
        const authorId = user._id.toString();
        const afterInt = cursorToInt(after);
        const isAuthor = context.req.user?.id === authorId;

        const [posts, totalCount] = await Promise.all([
          context.db.postRepository.paginate({
            params: {
              created_by: authorId,
              status: isAuthor ? { $in: ['draft', 'published'] } : 'published',
              deleted_at: {
                $ne: null,
              },
            },
            after: afterInt,
            first,
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
