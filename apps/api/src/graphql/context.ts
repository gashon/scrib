import { PostRepository } from '@scrib/api/repository';
import { JwtPayload } from '@scrib/api/utils/jwt';
import models, { Models } from '@scrib/db/models';

export type RequestContext = {
  user: JwtPayload | null;
};

export type AuthenticatedRequestContext = RequestContext & {
  user: NonNullable<RequestContext['user']>;
};
export type RepositoriesContext = {
  postRepository: PostRepository;
};

export type Context = {
  db: RepositoriesContext;
  req: RequestContext | AuthenticatedRequestContext;
};

export const context: Context = {
  db: {
    postRepository: new PostRepository(models as Models),
  },
  req: {
    user: null,
  },
};
