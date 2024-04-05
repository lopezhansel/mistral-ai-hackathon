import { QueryBuilder } from "drizzle-orm/sqlite-core";
import { users } from "../schema";

const queries = new QueryBuilder();
const output = queries
  .select({
    user: users.id,
  })
  .from(users)
  .toSQL().sql;
console.log("---");
console.log("---");
console.log("---");
console.log("---");
console.log(output);
console.log("---");
console.log("---");
console.log("---");
