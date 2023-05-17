import { IPost } from '@scrib/db/models/post';
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context } from '@scrib/api/graphql/context';

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: (): any => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Globally unique ID of the post',
      resolve: (obj: IPost) => obj._id.toString(),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Title of the post',
      resolve: (obj: IPost) => obj.title,
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Status of the post',
      resolve: (obj: IPost) => obj.status,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Content of the post',
      resolve: (obj: IPost) => obj.content,
    },
    views: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Number of views of the post',
      resolve: (obj: IPost) => obj.views,
    },
    likes: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Number of likes of the post',
      resolve: (obj: IPost) => obj.likes,
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Date when the post was created',
      resolve: (obj: IPost) => obj.created_at.toISOString(),
    },
    createdBy: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'User who created the post',
      resolve: (obj: IPost) => {
        return obj.created_by._id.toString();
      },
    },
    isDeleted: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether the post is deleted',
      resolve: (obj: IPost) => !!obj?.deleted_at,
    },
    isAuthor: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether the current user is the author of the post',
      resolve: (obj: IPost, __: any, context: Context) => {
        return (
          !!context.req.user?.id &&
          obj.created_by._id.toString() === context.req.user?.id
        );
      },
    },
  }),
});
