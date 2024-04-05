-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `animations` (
	`animation_id` integer PRIMARY KEY NOT NULL,
	`prompt` text,
	`status` text,
	`username` text,
	`audio` text,
	`video` text,
	`animation_code` text,
	`animation_instructions` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`phone` numeric,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`int_modifiers` integer DEFAULT false NOT NULL
);

*/