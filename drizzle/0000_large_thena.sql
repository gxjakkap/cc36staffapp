-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "File" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"face_photo_filepath" text,
	"thai_nationalid_copy_filepath" text,
	"parent_permission_filepath" text,
	"p1_filepath" text,
	"p7_filepath" text
);
--> statement-breakpoint
CREATE TABLE "AnswerRegis" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"answer1" text,
	"answer2" text,
	"answer3" text,
	"answer4" text,
	"answer5" text,
	"answer6_1" text,
	"answer6_2" text
);
--> statement-breakpoint
CREATE TABLE "AnswerAcademic" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"algo_answer" text,
	"chess_notation" text,
	"chess_score" integer
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"google_id" text NOT NULL,
	"fullname" text,
	"age" integer,
	"birth" timestamp(3),
	"gender" text,
	"religion" text,
	"blood_group" text,
	"graduation" text,
	"school" text,
	"course" text,
	"telephone" text,
	"email" text NOT NULL,
	"medical_coverage" text,
	"chronic_disease" text,
	"self_medicine" text,
	"drug_allergic" text,
	"food_allergic" text,
	"address" text,
	"home_phone_tel" text,
	"comcamp_attendance" boolean,
	"shirt_size" text,
	"has_laptop" boolean,
	"travel" text,
	"parent_fullname" text,
	"parent_relation" text,
	"parent_phone" text,
	"academic_done" boolean DEFAULT false NOT NULL,
	"files_done" boolean DEFAULT false NOT NULL,
	"info_done" boolean DEFAULT false NOT NULL,
	"regis_done" boolean DEFAULT false NOT NULL,
	"title" text,
	"prefer_food" text,
	"everyday_attendance" boolean,
	"has_submit_answer" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Session" (
	"sid" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expire" timestamp(6) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "AnswerRegis" ADD CONSTRAINT "AnswerRegis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "AnswerAcademic" ADD CONSTRAINT "AnswerAcademic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "File_userId_idx" ON "File" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "File_userId_key" ON "File" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE INDEX "AnswerRegis_userId_idx" ON "AnswerRegis" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "AnswerRegis_userId_key" ON "AnswerRegis" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE INDEX "AnswerAcademic_userId_idx" ON "AnswerAcademic" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "AnswerAcademic_userId_key" ON "AnswerAcademic" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "User_email_key" ON "User" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "User_google_id_key" ON "User" USING btree ("google_id" text_ops);
*/