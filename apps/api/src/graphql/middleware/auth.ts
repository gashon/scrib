import { CustomError } from '@scrib/api/exceptions';
import { Context } from '@scrib/api/graphql';
import { GraphQLFieldConfig, GraphQLFieldResolver } from 'graphql';
import status from 'http-status';

export function authMiddleware<TSource, TContext, TArgs = any>(
  resolver: GraphQLFieldResolver<TSource, TContext, TArgs>
): GraphQLFieldResolver<TSource, TContext, TArgs> {
  return async (parent, args, context, info) => {
    const ctx = context as unknown as Context;

    if (!ctx.req.user) {
      throw new CustomError('Unauthorized', status.UNAUTHORIZED);
    }

    return resolver(parent, args, context, info);
  };
}

export function authGuard<TSource, TContext, TArgs = any>(
  fieldConfig: GraphQLFieldConfig<TSource, TContext, TArgs>
) {
  if (!fieldConfig.resolve) {
    throw new Error('authGuard requires a resolve function');
  }

  const configWithMiddleware = {
    ...fieldConfig,
    resolve: authMiddleware(fieldConfig.resolve),
  };

  return configWithMiddleware;
}
