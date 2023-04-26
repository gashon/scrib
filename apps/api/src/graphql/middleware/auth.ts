import { AuthenticatedContext, RequestContext } from '@scrib/api/graphql';
import { ForbiddenError } from 'apollo-server-express';
import { IFieldResolver, combineResolvers, skip } from 'graphql-resolvers';

type ResolverFn<TArgs, TResult> = (
  parent: any,
  args: TArgs,
  context: AuthenticatedContext,
) => TResult;

export const isAuthenticated = (_: any, __: any, { user }: RequestContext) =>
  user ? skip : new ForbiddenError('Not authenticated as user.');

export function authMiddleware<TArgs, TResult>(
  resolver: ResolverFn<TArgs, TResult>,
): IFieldResolver<any, AuthenticatedContext, TArgs, any> {
  return combineResolvers(isAuthenticated, resolver);
}
