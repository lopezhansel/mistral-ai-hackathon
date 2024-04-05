CREATE TABLE `conversations` (
	`conversationsId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`startedByUserID` integer NOT NULL,
	`startedWithUserID` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`startedByUserID`) REFERENCES `users`(`userId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`startedWithUserID`) REFERENCES `users`(`userId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `id` TO `userId`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `first_name` TO `firstName`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `last_name` TO `lastName`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
/*
 SQLite does not support "Set default to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
/*
 SQLite does not support "Changing existing column type" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE users ADD `userName` text;--> statement-breakpoint
ALTER TABLE users ADD `email` text;--> statement-breakpoint
CREATE UNIQUE INDEX `conversations_conversationsId_unique` ON `conversations` (`conversationsId`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_userName_unique` ON `users` (`userName`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `int_modifiers`;