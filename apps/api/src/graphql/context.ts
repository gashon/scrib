import { JwtPayload } from '@scrib/api/utils/jwt';

export interface RequestContext {
  user: JwtPayload | null;
}
