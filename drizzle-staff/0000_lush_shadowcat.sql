CREATE TABLE "Tabian" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"info" text DEFAULT 'ยังไม่ได้ตรวจสอบ' NOT NULL,
	"scoreRegis" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'unlock' NOT NULL,
	"staffUsername" text NOT NULL,
	"updated_at" timestamp DEFAULT NOW() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Wichakarn" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"scoreAcademic" integer DEFAULT 0 NOT NULL,
	"scoreChess" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'unlock' NOT NULL,
	"staffUsername" text NOT NULL,
	"updated_at" timestamp DEFAULT NOW() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "Tabian_userId_idx" ON "Tabian" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Tabian_staffUsername_idx" ON "Tabian" USING btree ("staffUsername" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Wichakarn_userId_idx" ON "Wichakarn" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Wichakarn_staffUsername_idx" ON "Wichakarn" USING btree ("staffUsername" text_ops);