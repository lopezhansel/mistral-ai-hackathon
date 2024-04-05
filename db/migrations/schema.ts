import { sql } from "drizzle-orm";
import {
  AnySQLiteColumn,
  integer,
  numeric,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const animations = sqliteTable("animations", {
  animationId: integer("animation_id").primaryKey().notNull(),
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
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: numeric("phone"),
  createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`").notNull(),
  intModifiers: integer("int_modifiers").default(false).notNull(),
});
