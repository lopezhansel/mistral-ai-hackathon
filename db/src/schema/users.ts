import { sql } from "drizzle-orm";
import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey(),
  userName: text("userName"),
  email: text("email"),
  firstName: text("firstName"),
  lastName: text("lastName"),
  phone: numeric("phone"),
  createdAt: text("createdAt").notNull().default(sql`CURRENT_TIMESTAMP`),
});
