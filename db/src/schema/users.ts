import { relations, sql } from "drizzle-orm";
import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { conversations } from "./conversations";

export const users = sqliteTable("users", {
  userId: integer("id", { mode: "number" }).primaryKey(),
  userName: text("userName"),
  email: text("email"),
  firstName: text("firstName"),
  lastName: text("lastName"),
  phone: numeric("phone"),
  createdAt: text("createdAt").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
  conversations: many(conversations),
}));
