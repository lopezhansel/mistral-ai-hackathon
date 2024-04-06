CREATE TABLE `messages` (
	`messageId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`messageText` text,
	`conversationId` integer NOT NULL,
	`userId` integer NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`conversationId`) REFERENCES `conversations`(`conversationsId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `conversations` RENAME COLUMN `created_at` TO `createdAt`;--> statement-breakpoint
ALTER TABLE conversations ADD `conversationsName` text;