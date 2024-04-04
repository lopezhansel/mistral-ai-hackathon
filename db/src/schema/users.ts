import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone", { length: 256 }),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  intModifiers: integer("int_modifiers", { mode: "boolean" })
    .notNull()
    .default(false),
});
