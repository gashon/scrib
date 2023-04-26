import { JwtPayload } from '@scrib/api/utils/jwt';

export interface RequestContext {
  user: JwtPayload | null;
}

export type AuthenticatedContext = RequestContext & { user: NonNullable<RequestContext['user']> };
