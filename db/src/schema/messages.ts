import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { conversations } from "./conversations";
import { users } from "./users";

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

export const messagesRelations = relations(messages, ({ one }) => ({
  conversationchat: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.conversationsId],
  }),
}));
