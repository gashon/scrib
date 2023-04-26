import { RequestContext } from '@scrib/api/graphql';
import { ForbiddenError } from 'apollo-server-express';

type ResolverFn<TArgs, TResult> = (
  parent: any,
  args: TArgs,
  context: RequestContext,
) => TResult;

export function authMiddleware<TArgs, TResult>(
  resolver: ResolverFn<TArgs, TResult>,
): ResolverFn<TArgs, TResult> {
  return (parent, args, context) => {
    if (!context.user) {
      throw new ForbiddenError('Not authenticated as user.');
    }
    return resolver(parent, args, context);
  };
}
