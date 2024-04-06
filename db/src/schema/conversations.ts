import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const conversations = sqliteTable("conversations", {
  conversationsId: integer("conversationsId").primaryKey({
    autoIncrement: true,
  }),
  conversationsName: text("conversationsName"),
  startedByUserID: integer("startedByUserID")
    .notNull()
    .references(() => users.userId),
  startedWithUserID: integer("startedWithUserID")
    .notNull()
    .references(() => users.userId),
  createdAt: text("createdAt").notNull().default(sql`CURRENT_TIMESTAMP`),
});
