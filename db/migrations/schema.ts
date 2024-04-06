import { sql } from "drizzle-orm";
import {
  AnySQLiteColumn,
  foreignKey,
  integer,
  numeric,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const animations = sqliteTable("animations", {
  animationId: integer("animationId").primaryKey().notNull(),
  prompt: text("prompt"),
  status: text("status"),
  username: text("username"),
  audio: text("audio"),
  video: text("video"),
  animationCode: text("animation_code"),
  animationInstructions: text("animation_instructions"),
  createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey().notNull(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  phone: numeric("phone"),
  createdAt: text("createdAt").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
  userName: text("userName"),
  email: text("email"),
});

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
  id: numeric("id").primaryKey(),
  hash: text("hash").notNull(),
  createdAt: numeric("created_at"),
});

export const conversations = sqliteTable("conversations", {
  conversationsId: integer("conversationsId")
    .primaryKey({ autoIncrement: true })
    .notNull(),
  startedByUserId: integer("startedByUserID")
    .notNull()
    .references(() => users.id),
  startedWithUserId: integer("startedWithUserID")
    .notNull()
    .references(() => users.id),
  createdAt: text("createdAt").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
  conversationsName: text("conversationsName"),
});

export const messages = sqliteTable("messages", {
  messageId: integer("messageId").primaryKey({ autoIncrement: true }).notNull(),
  messageText: text("messageText"),
  conversationId: integer("conversationId")
    .notNull()
    .references(() => conversations.conversationsId),
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
  createdAt: text("createdAt").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
});
