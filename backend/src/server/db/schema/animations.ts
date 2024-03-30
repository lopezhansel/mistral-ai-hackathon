import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const animations = sqliteTable('animations', {
  animationId: integer('animation_id', { mode: 'number' }).primaryKey(),
  prompt: text('prompt'),
  status: text('status'),
  username: text('username'),
  audio: text('audio'),
  video: text('video'),
  animation_code: text('animation_code'),
  animationInstructions: text('animation_instructions'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});
