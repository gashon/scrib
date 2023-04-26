import { JwtPayload } from '@scrib/api/utils/jwt';
import { Models } from '@scrib/db/models';

export interface RequestContext {
  db: Models;
  user: JwtPayload | null;
}
