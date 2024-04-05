import { db } from "./db";
import * as schema from "../schema";

(async () => {
  try {
    console.log("all users", await db.select().from(schema.users));
  } catch (e) {
    console.log(e);
  }
})();
