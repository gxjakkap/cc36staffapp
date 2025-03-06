CREATE TABLE "Tabian" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"info" boolean,
	"score1" integer,
	"score2" integer,
	"score3" integer,
	"score4" integer,
	"score5" integer,
	"score6_1" integer,
	"score6_2" integer,
	"status" text DEFAULT 'unlock' NOT NULL,
	"staffUsername" text NOT NULL,
	"updated_at" timestamp DEFAULT NOW() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Wichakarn" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"scoreAcademic" integer,
	"scoreChess" integer,
	"status" text DEFAULT 'unlock' NOT NULL,
	"staffUsername" text NOT NULL,
	"updated_at" timestamp DEFAULT NOW() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "Tabian_userId_idx" ON "Tabian" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Wichakarn_userId_idx" ON "Wichakarn" USING btree ("userId" text_ops);