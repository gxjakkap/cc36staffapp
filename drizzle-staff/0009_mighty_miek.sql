CREATE TABLE "remarks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"remarks" text,
	"updated_at" timestamp NOT NULL,
	"added_by" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "remarks_userId_idx" ON "remarks" USING btree ("userId" text_ops);