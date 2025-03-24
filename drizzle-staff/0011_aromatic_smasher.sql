ALTER TABLE "confirmationStaff" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
CREATE UNIQUE INDEX "confirmationStaff_userId_idx" ON "confirmationStaff" USING btree ("userId" text_ops);