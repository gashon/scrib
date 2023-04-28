import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

const DirectionEnum = new GraphQLEnumType({
  name: 'Direction',
  values: {
    ASC: { value: 'asc' },
    DESC: { value: 'desc' },
  },
});

export const OrderByInput = new GraphQLInputObjectType({
  name: 'OrderByInput',
  fields: {
    field: { type: new GraphQLNonNull(GraphQLString) },
    direction: { type: new GraphQLNonNull(DirectionEnum) },
  },
});
