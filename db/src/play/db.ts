import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../schema";

const dbUrl = fileURLToPath(new URL("./play-db.sqlite", import.meta.url));

const sqliteClient = new Database(dbUrl, { fileMustExist: true });
export const db = drizzle(sqliteClient, {
  schema,
  logger: true,
});
