import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { conversations } from "./conversations";

export const messages = sqliteTable("messages", {
  messageId: integer("messageId").primaryKey({
    autoIncrement: true,
  }),
  messageText: text("messageText"),
  conversationId: integer("conversationId")
    .notNull()
    .references(() => conversations.conversationsId),
  userId: integer("userId")
    .notNull()
    .references(() => users.userId),
  createdAt: text("createdAt").notNull().default(sql`CURRENT_TIMESTAMP`),
});
