import { Context } from '@scrib/api/graphql/context';
import { IPost } from '@scrib/db/models/post';
import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

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
  }),
});
