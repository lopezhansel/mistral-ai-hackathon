CREATE TABLE IF NOT EXISTS `animations` (
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
CREATE TABLE IF NOT EXISTS `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`phone` numeric,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`int_modifiers` integer DEFAULT false NOT NULL
);
