import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3'

import * as schema from './schema'
import { dbCredentials } from '../../../drizzle.config.json'

const sqliteClient = new Database(dbCredentials.url, { fileMustExist: true });
export const db = drizzle(sqliteClient, {
  schema
});
