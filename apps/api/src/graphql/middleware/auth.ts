import { Context } from '@scrib/api/graphql';
import { GraphQLFieldConfig, GraphQLFieldResolver } from 'graphql';

export function authMiddleware<TSource, TContext, TArgs = any>(
  resolver: GraphQLFieldResolver<TSource, TContext, TArgs>,
): GraphQLFieldResolver<TSource, TContext, TArgs> {
  return async (parent, args, context, info) => {
    const ctx = context as Context;
    if (!ctx.req.user?.id) {
      throw new Error('Unauthorized'); // todo make this a custom error
    }
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
