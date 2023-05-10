import { PostRepository, UserRepository } from '@scrib/api/repository';
import { JwtPayload } from '@scrib/api/utils/jwt';
import models, { Models } from '@scrib/db/models';
import { IncomingHttpHeaders } from 'http';

export type RequestContext = {
  user: JwtPayload | null;
  headers: IncomingHttpHeaders;
  cookies: Record<string, string>;
};

export type AuthenticatedRequestContext = RequestContext & {
  user: NonNullable<RequestContext['user']>;
};
export type RepositoriesContext = {
  postRepository: PostRepository;
  userRepository: UserRepository;
};

export type AuthenticatedContext = Context & {
  req: RequestContext & AuthenticatedRequestContext;
};

export type Context = {
  db: RepositoriesContext;
  req: RequestContext | AuthenticatedRequestContext;
};

export const context: Context = {
  db: {
    postRepository: new PostRepository(models as Models),
    userRepository: new UserRepository(models as Models),
  },
  req: {
    user: null,
    headers: {},
    cookies: {},
  },
};
