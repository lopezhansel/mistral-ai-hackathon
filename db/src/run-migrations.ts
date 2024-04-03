import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import { db } from "./db";

// This will run migrations on the database, skipping the ones already applied
(async () => {
  try {
    console.log("Migration started");
    await migrate(db, {
      migrationsFolder: "./migrations",
    });
    console.log("Migration success");
  } catch (e) {
    console.log("Migration failed");
    console.log(e);
  }
})();

// Don't forget to close the connection, otherwise the script will hang
