CREATE TABLE `topClothes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uri` text NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `uri_index` ON `topClothes` (`uri`);