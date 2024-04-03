import { drizzle } from "drizzle-orm/better-sqlite3";
import * as Database from "better-sqlite3";
import * as schema from "./schema";
import { fileURLToPath } from "url";

const dbUrl = fileURLToPath(new URL("../local-db.sqlite", import.meta.url));

const sqliteClient = new Database(dbUrl, { fileMustExist: true });
export const db = drizzle(sqliteClient, {
  schema,
  logger: true,
});
