CREATE TABLE `conversations` (
	`conversationsId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`startedByUserID` integer NOT NULL,
	`startedWithUserID` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`startedByUserID`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`startedWithUserID`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
