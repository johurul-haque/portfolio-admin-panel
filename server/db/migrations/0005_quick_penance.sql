CREATE TABLE IF NOT EXISTS "about_info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"designation" text NOT NULL,
	"about" text NOT NULL,
	"photo" text NOT NULL,
	"skills" text[] NOT NULL,
	"contact" text[] NOT NULL
);
