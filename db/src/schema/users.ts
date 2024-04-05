import { sql } from "drizzle-orm";
import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey(),
  userName: text("userName"),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: numeric("phone"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
