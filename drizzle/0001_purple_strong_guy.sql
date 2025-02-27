CREATE TABLE `Clothing` (
	`clo_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clo_uri` text NOT NULL,
	`clo_name` text NOT NULL,
	`clo_type` text NOT NULL,
	`clo_style` text NOT NULL
);
--> statement-breakpoint
DROP TABLE `topClothes`;