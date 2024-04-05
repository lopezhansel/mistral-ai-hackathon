import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const animations = sqliteTable("animations", {
  animationId: integer("animationId", { mode: "number" }).primaryKey(),
  prompt: text("prompt"),
  status: text("status"),
  username: text("username"),
  audio: text("audio"),
  video: text("video"),
  animation_code: text("animation_code"),
  animationInstructions: text("animation_instructions"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
