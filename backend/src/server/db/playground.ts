import * as schema from "./schema";
import { db } from "./db";

(async () => {
  try {
    console.log("all users", await db.select().from(schema.users));
  } catch (e) {
    console.log(e);
  }
})();
