import { MongoClient } from 'mongodb';

export interface RequestContext {
  db: MongoClient;
  user: { id: string; roles: string[] } | null;
}
