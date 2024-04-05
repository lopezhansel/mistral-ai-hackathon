import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const conversations = sqliteTable("conversations", {
  conversationsId: integer("conversationsId").primaryKey({
    autoIncrement: true,
  }),
  startedByUserID: integer("startedByUserID")
    .notNull()
    .references(() => users.id),
  startedWithUserID: integer("startedWithUserID")
    .notNull()
    .references(() => users.id),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
