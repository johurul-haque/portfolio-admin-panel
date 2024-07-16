CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"cover_img" text NOT NULL,
	"intro" text NOT NULL,
	"short_description" text NOT NULL,
	"technologies" text NOT NULL,
	"source_code" text NOT NULL,
	"live_site" text NOT NULL,
	"desktop_view" text NOT NULL,
	"mobile_view" text NOT NULL
);
