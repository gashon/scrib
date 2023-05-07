import { Context } from '@scrib/api/graphql';
import { sign, verify } from '@scrib/api/utils/jwt';
import { GraphQLFieldConfig, GraphQLFieldResolver } from 'graphql';

export function authMiddleware<TSource, TContext, TArgs = any>(
  resolver: GraphQLFieldResolver<TSource, TContext, TArgs>,
): GraphQLFieldResolver<TSource, TContext, TArgs> {
  return async (parent, args, context, info) => {
    const ctx = context as Context;

    const token = ctx.req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Unauthorized'); // todo make this a custom error
    }

    const decoded = verify(token);
    if (!decoded) {
      // todo check if token is expired and throw a different error / refresh
      throw new Error('Unauthorized'); // todo make this a custom error
    }

    ctx.req.user = decoded;
    return resolver(parent, args, context, info);
  };
}

export function authGuard<TSource, TContext, TArgs = any>(
  fieldConfig: GraphQLFieldConfig<TSource, TContext, TArgs>,
) {
  if (!fieldConfig.resolve) {
    throw new Error('Cannot apply authGuard to field without a resolver');
  }

  const configWithMiddleware = {
    ...fieldConfig,
    resolve: authMiddleware(fieldConfig.resolve),
  };

  return configWithMiddleware;
}
