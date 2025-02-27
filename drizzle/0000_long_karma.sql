CREATE TABLE `Clothing` (
	`clo_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clo_uri` text NOT NULL,
	`clo_name` text NOT NULL,
	`clo_type` text NOT NULL,
	`clo_style` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Outfit` (
	`out_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`out_name` text NOT NULL,
	`out_top_id` integer NOT NULL,
	`out_btn_id` integer NOT NULL,
	`out_sho_id` integer NOT NULL,
	FOREIGN KEY (`out_top_id`) REFERENCES `Clothing`(`clo_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`out_btn_id`) REFERENCES `Clothing`(`clo_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`out_sho_id`) REFERENCES `Clothing`(`clo_id`) ON UPDATE no action ON DELETE cascade
);
